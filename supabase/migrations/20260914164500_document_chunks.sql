create extension if not exists vector with schema extensions;

create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id text not null,
  content text not null,
  embedding extensions.vector(1536),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists document_chunks_embedding_idx
  on public.document_chunks
  using ivfflat (embedding extensions.vector_cosine_ops)
  with (lists = 100);

create or replace function public.match_document_chunks(
  query_embedding extensions.vector(1536),
  match_count integer default 5
)
returns table (
  id uuid,
  document_id text,
  content text,
  similarity real,
  metadata jsonb
)
language sql
stable
as $$
  select id, document_id, content,
    1 - (embedding <=> query_embedding) as similarity,
    metadata
  from public.document_chunks
  where embedding is not null
  order by embedding <=> query_embedding
  limit match_count;
$$;
