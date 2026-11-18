-- Private file attachments for member notifications and admin broadcasts.
-- Run after 20260916_member_usernames_and_optional_email.sql.

alter table public.notifications
  add column if not exists attachments jsonb not null default '[]'::jsonb;

-- Create a dedicated private bucket. If the name already exists as a public
-- bucket, stop rather than silently changing the visibility of existing files.
do $$
begin
  if exists (
    select 1 from storage.buckets
    where id = 'notification-attachments' and public = true
  ) then
    raise exception 'The notification-attachments bucket already exists and is public. Make it private or choose a new bucket name before running this migration.';
  end if;

  if not exists (
    select 1 from storage.buckets where id = 'notification-attachments'
  ) then
    insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    values (
      'notification-attachments',
      'notification-attachments',
      false,
      4194304,
      array[
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'text/csv'
      ]::text[]
    );
  end if;
end;
$$;

comment on column public.notifications.attachments is
  'Private storage metadata for files delivered with this notification.';
