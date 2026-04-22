
import { NextRequest, NextResponse } from "next/server";
import { upsertArticle } from "@/lib/articles";
import { buildDraftFromSourceEntry, fetchSourceFeed, getFetchableSources } from "@/lib/ingestion";
import { isAdminAuthorized } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // Vercel Cron sends a special header — allow it through automatically
  const isCron = request.headers.get("x-vercel-cron") === "1";
  if (!isCron && !isAdminAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const sourceId = request.nextUrl.searchParams.get("sourceId");
  const allSources = getFetchableSources();
  const sources = sourceId ? allSources.filter((source) => source.id === sourceId) : allSources;

  const results = [];

  for (const source of sources) {
    try {
      const feed = await fetchSourceFeed(source);

      if (!feed.ok) {
        results.push({
          source: source.name,
          sourceId: source.id,
          ok: false,
          reason: feed.error,
          created: 0,
          skipped: 0,
          errors: 0,
        });
        continue;
      }

      let created = 0;
      let skipped = 0;
      let errors = 0;

      for (const item of feed.items.slice(0, 8)) {
        try {
          const draftResult = await buildDraftFromSourceEntry({
            title: item.title,
            url: item.url,
            summary: item.summary ?? null,
            content: item.summary ?? null,
            imageUrl: item.imageUrl ?? null,
            publishedAt: item.publishedAt ?? null,
            sourceId: source.id,
          });

          if (draftResult.ok && draftResult.article) {
            await upsertArticle(draftResult.article);
            created += 1;
          } else {
            skipped += 1;
          }
        } catch (error) {
          errors += 1;
          console.error(`Failed item for source ${source.id}:`, item.url, error);
        }
      }

      results.push({
        source: source.name,
        sourceId: source.id,
        ok: true,
        created,
        skipped,
        errors,
      });
    } catch (error) {
      console.error(`Failed source ${source.id}:`, error);
      results.push({
        source: source.name,
        sourceId: source.id,
        ok: false,
        reason: error instanceof Error ? error.message : "unknown_error",
        created: 0,
        skipped: 0,
        errors: 1,
      });
    }
  }

  return NextResponse.json({
    ok: true,
    message: "RSS ingestion run completed",
    sourceCount: results.length,
    results,
  });
}
