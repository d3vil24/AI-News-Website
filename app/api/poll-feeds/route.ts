
import { NextRequest, NextResponse } from "next/server";
import { NEWS_SOURCES } from "@/lib/source-registry";

export async function GET(request: NextRequest) {
  const sourceId = request.nextUrl.searchParams.get("sourceId");

  return NextResponse.json({
    ok: true,
    message: "Feed polling scaffold is active",
    sourceId,
    sources: NEWS_SOURCES.map((source) => ({
      id: source.id,
      name: source.name,
      url: source.url,
      rssUrl: source.rssUrl ?? null,
    })),
    note: "Attach actual RSS URLs and fetching logic here.",
  });
}
