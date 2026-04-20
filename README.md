# AI Pulse Starter with Supabase

A Next.js starter for an automated AI news site with:
- homepage
- live alerts page
- weekly issue archive
- single article page
- company and topic hubs
- admin review queue
- n8n-ready ingest and publish APIs
- Supabase-backed storage

## 1) Install

```bash
npm install
cp .env.example .env.local
```

## 2) Create the Supabase table

1. Create a Supabase project.
2. Open the SQL editor.
3. Run the SQL inside `supabase-schema.sql`.
4. Copy your project URL and service role key into `.env.local`.

## 3) Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PUBLISH_API_KEY=change-this-in-production
```

## 4) Run locally

```bash
npm run dev
```

If Supabase env vars are missing, the starter falls back to `data/articles.json` for local testing.

## 5) API routes

### GET `/api/articles`
Returns approved articles.

### POST `/api/ingest`
Creates a draft article.
Required auth header when `PUBLISH_API_KEY` is set:

```bash
x-api-key: your-key
```

Example body:

```json
{
  "title": "OpenAI launches new coding workflow",
  "slug": "openai-launches-new-coding-workflow",
  "summary": "A short summary for the draft.",
  "content": "## What happened
Detailed markdown body",
  "sourceName": "OpenAI",
  "sourceUrl": "https://openai.com/...",
  "contentType": "live_alert",
  "company": "openai",
  "topic": "agents"
}
```

### POST `/api/publish`
Creates or updates an approved article.

### POST `/api/update-story`
Updates any existing article by `id`.

## 6) What still needs to be done before launch

### Must-do
- protect `/admin-review` with auth
- replace mock approve/reject buttons with real actions
- add editor roles
- add Notion sync if you want Notion as approval buffer
- add duplicate cluster checks before publish
- add source-tier and confidence fields
- add sitemap, news sitemap, robots.txt, and JSON-LD
- add version history and corrections log

### Best next step
Wire n8n like this:
- search + fetch source text
- LLM triage
- LLM fact pack
- LLM draft
- save draft through `/api/ingest`
- review in admin or Notion
- publish through `/api/publish`

## 7) Deploy

Recommended stack:
- Vercel for Next.js
- Supabase for database
- n8n on Railway / Render / VPS
- Notion for editorial workflow
- Cloudflare for DNS and caching
