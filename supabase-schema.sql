create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  content text not null default '',
  sourceName text not null default '',
  sourceUrl text not null default '',
  contentType text not null check (contentType in ('live_alert', 'analysis', 'weekly_issue', 'guide')),
  status text not null check (status in ('draft', 'approved', 'rejected')) default 'draft',
  company text not null default '',
  topic text not null default '',
  publishedAt timestamptz not null default now(),
  createdAt timestamptz not null default now()
);

create index if not exists idx_articles_status on public.articles(status);
create index if not exists idx_articles_content_type on public.articles(contentType);
create index if not exists idx_articles_company on public.articles(company);
create index if not exists idx_articles_topic on public.articles(topic);
create index if not exists idx_articles_published_at on public.articles(publishedAt desc);

alter table public.articles enable row level security;

create policy "Public can read approved articles"
on public.articles
for select
using (status = 'approved');

-- Keep writes server-side only using the service role key.
