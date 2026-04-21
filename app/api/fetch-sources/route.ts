
import { NextRequest, NextResponse } from "next/server";
import { buildDraftFromSourceEntry, getFetchableSources } from "@/lib/ingestion";
import { upsertArticle } from "@/lib/articles";

export async function GET(request: NextRequest) {
  const sourceId = request.nextUrl.searchParams.get("sourceId");

  return NextResponse.json({
    ok: true,
    message: "Source fetch route scaffold is active",
    sourceId,
    availableSources: getFetchableSources(),
    note: "Connect real RSS/API fetching logic here or call from Vercel Cron / automation tools.",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      entries?: Array<{
        title: string;
        url: string;
        summary?: string | null;
        content?: string | null;
        imageUrl?: string | null;
        publishedAt?: string | null;
        sourceId?: string | null;
      }>;
    };

    const entries = body.entries ?? [];
    const results = [];

    for (const entry of entries) {
      const result = await buildDraftFromSourceEntry(entry);

      if (result.ok && result.article) {
        const saved = await upsertArticle(result.article);
        results.push({
          ok: true,
          articleId: saved.id,
          title: saved.title,
          whyItMatters: result.whyItMatters,
        });
      } else {
        results.push({
          ok: false,
          title: entry.title,
          reason: result.reason,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("POST /api/fetch-sources failed", error);
    return NextResponse.json(
      { ok: false, error: "Failed to process source entries" },
      { status: 500 }
    );
  }
}
