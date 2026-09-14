create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  category text not null check (category in ('Examination', 'Attendance', 'Assignment', 'Technical Issue', 'General Academic')),
  subject text not null,
  description text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

alter table public.support_requests enable row level security;

create policy "students create own support requests"
  on public.support_requests for insert
  with check (student_id in (select id from public.students where auth_user_id = auth.uid()));

create policy "students read own support requests"
  on public.support_requests for select
  using (student_id in (select id from public.students where auth_user_id = auth.uid()));
