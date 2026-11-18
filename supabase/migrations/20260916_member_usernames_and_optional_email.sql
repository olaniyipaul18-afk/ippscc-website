-- Add username-based sign-in and support members who do not have email addresses.
-- Run after 20260916_first_login_password_change.sql.

alter table public.members
  add column if not exists username text,
  add column if not exists requested_username text,
  add column if not exists username_change_requested_at timestamptz;

alter table public.members alter column email drop not null;
update public.members
set email = nullif(btrim(email), '')
where email is distinct from nullif(btrim(email), '');
-- New accounts default to the forced first-login password change state.
alter table public.members alter column must_change_password set default true;

-- Backfill stable, name-based usernames for existing accounts before making the
-- column mandatory. Add a numeric suffix only when a name-based handle collides.
do $$
declare
  rec record;
  base text;
  candidate text;
  suffix integer;
begin
  for rec in
    select id, name
    from public.members
    where username is null or btrim(username) = ''
    order by joined_at nulls first, id
  loop
    base := lower(regexp_replace(
      regexp_replace(
        coalesce(rec.name, 'member'),
        '\m(h\.?\s*i\.?\s*m\.?|dr|mr|mrs|ms|miss|prof|professor|amb|ambassador|hon|honourable|rev|reverend|dcns|jp|fsm|fcrb)\M\.?',
        ' ',
        'gi'
      ),
      '[^a-zA-Z0-9]+', '.', 'g'
    ));
    base := trim(both '.' from base);
    if base = '' or length(base) < 3 then base := 'member'; end if;
    base := left(base, 30);
    candidate := base;
    suffix := 2;
    while exists (
      select 1 from public.members m
      where m.id <> rec.id and lower(m.username) = lower(candidate)
    ) loop
      candidate := left(base, 30 - length(suffix::text)) || suffix::text;
      suffix := suffix + 1;
    end loop;
    update public.members set username = candidate where id = rec.id;
  end loop;
end;
$$;

alter table public.members alter column username set not null;

-- Uniqueness applies without regard to letter case. Email is optional, but
-- existing email-based member sign-in remains supported.
create unique index if not exists members_username_lower_uidx
  on public.members (lower(username));
create unique index if not exists members_requested_username_lower_uidx
  on public.members (lower(requested_username))
  where requested_username is not null;
create unique index if not exists members_email_lower_uidx
  on public.members (lower(email))
  where email is not null;
create unique index if not exists members_member_id_lower_uidx
  on public.members (lower(member_id));

-- Keep active usernames and pending requests in one private claim table. Its
-- unique index prevents a current username from colliding with anyone else's
-- pending request, including under concurrent updates.
create table if not exists public.member_username_claims (
  member_id text not null references public.members(id) on delete cascade,
  username text not null,
  claim_kind text not null check (claim_kind in ('active', 'pending')),
  primary key (member_id, claim_kind)
);
create unique index if not exists member_username_claims_lower_uidx
  on public.member_username_claims (lower(username));
alter table public.member_username_claims enable row level security;
revoke all on table public.member_username_claims from public, anon, authenticated;
grant select, insert, update, delete on table public.member_username_claims to service_role;

insert into public.member_username_claims (member_id, username, claim_kind)
select id, username, 'active' from public.members
union all
select id, requested_username, 'pending' from public.members where requested_username is not null
on conflict (member_id, claim_kind) do update set username = excluded.username;

-- Validate username formats before writing a member row.
create or replace function public.enforce_member_username_reservations()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  new.username := lower(btrim(new.username));
  new.requested_username := nullif(lower(btrim(new.requested_username)), '');

  if new.username is null or new.username !~ '^[a-z0-9]+([._-][a-z0-9]+)*$' or length(new.username) < 3 or length(new.username) > 32 then
    raise exception 'Invalid username format.' using errcode = '23514';
  end if;
  if new.requested_username is not null and (
    new.requested_username !~ '^[a-z0-9]+([._-][a-z0-9]+)*$'
    or length(new.requested_username) < 3
    or length(new.requested_username) > 32
  ) then
    raise exception 'Invalid requested username format.' using errcode = '23514';
  end if;
  if new.requested_username = new.username then
    raise exception 'Requested username is already the active username.' using errcode = '23505';
  end if;

  return new;
end;
$$;

-- Claims are written after the member row exists. Any collision raises a
-- unique-violation and rolls the complete member update back.
create or replace function public.sync_member_username_claims()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  delete from public.member_username_claims where member_id = new.id;
  insert into public.member_username_claims (member_id, username, claim_kind)
    values (new.id, new.username, 'active');
  if new.requested_username is not null then
    insert into public.member_username_claims (member_id, username, claim_kind)
      values (new.id, new.requested_username, 'pending');
  end if;
  return new;
end;
$$;

revoke all on function public.enforce_member_username_reservations() from public, anon, authenticated;
revoke all on function public.sync_member_username_claims() from public, anon, authenticated;
drop trigger if exists members_username_reservations_before_write on public.members;
create trigger members_username_reservations_before_write
before insert or update of username, requested_username on public.members
for each row execute function public.enforce_member_username_reservations();
drop trigger if exists members_username_claims_after_write on public.members;
create trigger members_username_claims_after_write
after insert or update of username, requested_username on public.members
for each row execute function public.sync_member_username_claims();

-- Allocate IDs atomically so concurrent onboarding/provisioning cannot issue
-- the same IPPSCC member ID. Continue after the highest numeric suffix already
-- present in the membership roll.
create sequence if not exists public.ippscc_member_number_seq;
do $$
declare
  max_suffix bigint;
begin
  select coalesce(max(((regexp_match(member_id, '/([0-9]+)$'))[1])::bigint), 0)
    into max_suffix
    from public.members;
  perform setval('public.ippscc_member_number_seq', greatest(max_suffix, 1), max_suffix > 0);
end;
$$;

create or replace function public.ippscc_next_member_id()
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  next_number bigint;
begin
  next_number := nextval('public.ippscc_member_number_seq');
  return 'IPPSCC/USA/' || extract(year from current_date)::integer::text || '/' || lpad(next_number::text, greatest(4, length(next_number::text)), '0');
end;
$$;

revoke all on function public.ippscc_next_member_id() from public, anon, authenticated;
grant execute on function public.ippscc_next_member_id() to service_role;
revoke all on sequence public.ippscc_member_number_seq from public, anon, authenticated;
grant usage, select on sequence public.ippscc_member_number_seq to service_role;

comment on column public.members.username is 'Unique case-insensitive portal login username.';
comment on column public.members.requested_username is 'Member-requested username held until administrator approval.';
comment on column public.members.username_change_requested_at is 'Timestamp of the current pending username request.';
