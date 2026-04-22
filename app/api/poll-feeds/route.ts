
import { NextRequest, NextResponse } from "next/server";
import { fetchSourceFeed, getFetchableSources } from "@/lib/ingestion";

export async function GET(request: NextRequest) {
  const sourceId = request.nextUrl.searchParams.get("sourceId");
  const allSources = getFetchableSources();
  const sources = sourceId ? allSources.filter((source) => source.id === sourceId) : allSources;

  const results = [];
  for (const source of sources) {
    const result = await fetchSourceFeed(source);
    results.push({
      source: source.name,
      sourceId: source.id,
      ok: result.ok,
      error: result.error,
      itemCount: result.items.length,
      items: result.items.slice(0, 10),
    });
  }

  return NextResponse.json({ ok: true, polled: results.length, results });
}
