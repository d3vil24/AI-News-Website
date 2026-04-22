create extension if not exists pgcrypto;

create table if not exists public.articles (
  id          text primary key default gen_random_uuid()::text,
  slug        text not null unique,
  title       text not null,
  summary     text,
  content     text,
  contenttype text not null default 'article' check (contenttype in ('article', 'live_alert', 'analysis', 'weekly_issue', 'weekly_roundup', 'editorial', 'company_update', 'topic_update', 'guide')),
  status      text not null default 'draft' check (status in ('draft', 'approved', 'published', 'rejected')),
  sourcename  text,
  sourceurl   text,
  company     text,
  topic       text,
  publishedat timestamptz default now(),
  createdat   timestamptz not null default now(),
  updatedat   timestamptz not null default now(),
  imageurl    text,
  authorname  text default 'AI Pulse Desk'
);

create index if not exists idx_articles_status      on public.articles(status);
create index if not exists idx_articles_contenttype on public.articles(contenttype);
create index if not exists idx_articles_company     on public.articles(company);
create index if not exists idx_articles_topic       on public.articles(topic);
create index if not exists idx_articles_publishedat on public.articles(publishedat desc);

alter table public.articles enable row level security;

-- Public reads: approved + published articles
create policy "Public can read approved articles"
  on public.articles for select
  using (status in ('approved', 'published'));

-- All writes go through the service role key (server-side only)
