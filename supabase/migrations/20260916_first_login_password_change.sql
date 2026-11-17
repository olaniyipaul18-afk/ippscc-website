-- One-time migration: support mandatory first-login password changes for admins.
-- Members already have must_change_password in the initial schema.

alter table public.admins
  add column if not exists must_change_password boolean not null default true;

-- Ensure future administrator accounts provisioned with a temporary password
-- require a password change on first login.
alter table public.admins
  alter column must_change_password set default true;

-- The initial admin password was generated as a temporary credential.
update public.admins
set must_change_password = true
where email = 'admin@ippscc.org';
