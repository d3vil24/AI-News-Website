
# AI News Website — Final Stage Pack

This is the consolidated final-stage pack.

## Included capabilities
- premium homepage + editorial layout
- rich article page with schema and intelligence blocks
- topic/company SEO pages
- weekly/alerts/editorial upgrades
- newsletter signup UI + API
- source registry + ingestion helpers
- duplicate detection + auto-tagging scaffolds
- RSS parser + provider adapter scaffolds
- admin review queue
- research page scaffold
- author page scaffold
- analytics dashboard scaffold
- sponsor + premium CTA blocks

## Main files included
- app/page.tsx
- app/article/[slug]/page.tsx
- app/topics/[slug]/page.tsx
- app/companies/[slug]/page.tsx
- app/weekly/page.tsx
- app/alerts/page.tsx
- app/editorial/page.tsx
- app/research/page.tsx
- app/authors/[slug]/page.tsx
- app/admin/analytics/page.tsx
- app/admin-review/page.tsx
- app/api/newsletter/route.ts
- app/api/ingest/route.ts
- app/api/fetch-sources/route.ts
- app/api/poll-feeds/route.ts
- app/api/run-ingestion/route.ts
- components/article-card.tsx
- components/article-intelligence.tsx
- components/newsletter-card.tsx
- components/newsletter-form.tsx
- components/premium-cta.tsx
- components/section-title.tsx
- components/site-header.tsx
- components/site-footer.tsx
- components/sponsor-block.tsx
- lib/utils.ts
- lib/types.ts
- lib/articles.ts
- lib/newsroom.ts
- lib/source-registry.ts
- lib/ingestion.ts
- lib/feed-parser.ts
- lib/provider-adapters.ts
- lib/featured-images.ts

## Apply
Copy these files into your repo, then run:

```bash
pnpm build
pnpm dev
```
