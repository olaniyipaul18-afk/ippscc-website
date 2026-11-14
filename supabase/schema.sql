-- ═══════════════════════════════════════════════════════════════════
-- IPPSCC Member Portal + Admin backend schema (Supabase / Postgres)
-- Run once in the Supabase SQL Editor, then create the storage bucket
-- "member-documents" (public) in Storage. See README "Member Portal" section.
-- ═══════════════════════════════════════════════════════════════════

create table if not exists members (
  id text primary key,
  member_id text unique not null,
  email text unique not null,
  name text not null,
  title text not null default 'Chaplain Officer',
  rank text not null default 'Chaplain Officer',
  status text not null default 'pending'
    check (status in ('active', 'suspended', 'pending')),
  region text not null default '',
  joined_at timestamptz not null default now(),
  profile jsonb not null default '{}'::jsonb,
  password_hash text not null,
  must_change_password boolean not null default false
);
create index if not exists members_email_idx on members (email);

create table if not exists applications (
  id text primary key,
  ref text unique not null,
  email text not null,
  name text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'under_review', 'changes_requested', 'approved', 'rejected', 'completed')),
  notes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists applications_status_idx on applications (status);
create index if not exists applications_ref_idx on applications (ref);

create table if not exists notifications (
  id text primary key,
  audience text not null default 'all',
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  read_by jsonb not null default '[]'::jsonb
);
create index if not exists notifications_audience_idx on notifications (audience);

create table if not exists admins (
  id text primary key,
  email text unique not null,
  name text not null,
  password_hash text not null
);

-- ── Initial administrator ──────────────────────────────────────────
-- Generate a password hash locally with:
--   node scripts/hash-password.mjs "Your-Strong-Password"
-- then paste it below and run this insert (once):
--
-- insert into admins (id, email, name, password_hash)
-- values ('adm_1', 'admin@ippscc.org', 'Corps Administrator', 'PASTE_HASH_HERE');
