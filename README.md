
# AI News Live Fix Pack

Use this pack to stabilize RSS ingestion and get the site live fast.

## Replace these files
- lib/source-registry.ts
- lib/feed-parser.ts
- lib/ingestion.ts
- lib/articles.ts
- app/api/poll-feeds/route.ts
- app/api/run-ingestion/route.ts
- vercel.json

## After replacing files
Run:
pnpm build
pnpm dev

Then test:
curl http://localhost:3000/api/poll-feeds
curl "http://localhost:3000/api/run-ingestion?sourceId=openai-blog"
curl "http://localhost:3000/api/run-ingestion?sourceId=google-blog"
curl "http://localhost:3000/api/run-ingestion?sourceId=techcrunch-ai"
