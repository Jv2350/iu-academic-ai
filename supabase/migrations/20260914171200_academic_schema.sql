create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  student_id text not null unique,
  name text not null,
  email text not null,
  program text not null,
  semester integer not null,
  division text,
  created_at timestamptz not null default now()
);
create table if not exists public.subjects (id uuid primary key default gen_random_uuid(), name text not null, code text, semester integer not null);
create table if not exists public.exams (id uuid primary key default gen_random_uuid(), subject_id uuid references public.subjects(id), date date not null, start_time time not null, end_time time, venue text, semester integer not null);
create table if not exists public.timetable (id uuid primary key default gen_random_uuid(), subject_id uuid references public.subjects(id), day_of_week integer not null, start_time time not null, end_time time, faculty text, room text);
create table if not exists public.attendance (id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete cascade, subject_id uuid references public.subjects(id), classes_held integer not null default 0, classes_attended integer not null default 0, percentage numeric generated always as (case when classes_held = 0 then 0 else round(classes_attended::numeric * 100 / classes_held, 2) end) stored);
create table if not exists public.assignments (id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete cascade, subject_id uuid references public.subjects(id), title text not null, description text, deadline timestamptz, status text not null default 'pending', priority text not null default 'medium');
create table if not exists public.notices (id uuid primary key default gen_random_uuid(), title text not null, description text not null, category text, published_at timestamptz not null default now());
create table if not exists public.events (id uuid primary key default gen_random_uuid(), title text not null, description text not null, event_date date not null, event_time time, location text);
create table if not exists public.library_items (id uuid primary key default gen_random_uuid(), title text not null, author text, isbn text, available_copies integer not null default 0, due_date date);
create table if not exists public.knowledge_documents (id uuid primary key default gen_random_uuid(), title text not null, source_path text not null unique, created_at timestamptz not null default now());
create table if not exists public.knowledge_chunks (id uuid primary key default gen_random_uuid(), document_id uuid not null references public.knowledge_documents(id) on delete cascade, content text not null, embedding extensions.vector(1536), metadata jsonb not null default '{}'::jsonb);
create table if not exists public.chat_sessions (id uuid primary key default gen_random_uuid(), student_id uuid not null references public.students(id) on delete cascade, title text, created_at timestamptz not null default now());
create table if not exists public.chat_messages (id uuid primary key default gen_random_uuid(), session_id uuid not null references public.chat_sessions(id) on delete cascade, role text not null check (role in ('system','user','assistant')), content text not null, created_at timestamptz not null default now());

alter table public.students enable row level security;
alter table public.attendance enable row level security;
alter table public.assignments enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.subjects enable row level security;
alter table public.exams enable row level security;
alter table public.timetable enable row level security;
alter table public.notices enable row level security;
alter table public.events enable row level security;
alter table public.library_items enable row level security;
alter table public.knowledge_documents enable row level security;
alter table public.knowledge_chunks enable row level security;

create policy "students own profile" on public.students for select using (auth_user_id = auth.uid());
create policy "students own attendance" on public.attendance for select using (student_id in (select id from public.students where auth_user_id = auth.uid()));
create policy "students own assignments" on public.assignments for select using (student_id in (select id from public.students where auth_user_id = auth.uid()));
create policy "students own chat sessions" on public.chat_sessions for all using (student_id in (select id from public.students where auth_user_id = auth.uid())) with check (student_id in (select id from public.students where auth_user_id = auth.uid()));
create policy "students own chat messages" on public.chat_messages for all using (session_id in (select id from public.chat_sessions where student_id in (select id from public.students where auth_user_id = auth.uid()))) with check (session_id in (select id from public.chat_sessions where student_id in (select id from public.students where auth_user_id = auth.uid())));
create policy "authenticated academic read" on public.subjects for select to authenticated using (true);
create policy "authenticated exam read" on public.exams for select to authenticated using (true);
create policy "authenticated timetable read" on public.timetable for select to authenticated using (true);
create policy "authenticated notice read" on public.notices for select to authenticated using (true);
create policy "authenticated event read" on public.events for select to authenticated using (true);
create policy "authenticated library read" on public.library_items for select to authenticated using (true);
create policy "authenticated knowledge read" on public.knowledge_documents for select to authenticated using (true);
create policy "authenticated chunk read" on public.knowledge_chunks for select to authenticated using (true);
