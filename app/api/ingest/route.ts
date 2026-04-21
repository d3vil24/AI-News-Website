
import { NextRequest, NextResponse } from "next/server";
import { upsertArticle } from "@/lib/articles";
import { excerpt, slugify } from "@/lib/utils";
import { Article } from "@/lib/types";
import { buildWhyItMatters } from "@/lib/newsroom";

type IngestBody = {
  title: string;
  summary?: string;
  body?: string;
  content?: string;
  source?: string;
  sourceName?: string;
  source_url?: string;
  sourceUrl?: string;
  company?: string;
  topic?: string;
  contentType?: Article["contentType"];
  imageUrl?: string;
  image_url?: string;
  authorName?: string;
  author_name?: string;
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as IngestBody;

    if (!payload.title?.trim()) {
      return NextResponse.json({ ok: false, error: "Title is required" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const content = payload.content ?? payload.body ?? null;

    const article: Article = {
      id: crypto.randomUUID(),
      slug: slugify(payload.title),
      title: payload.title.trim(),
      summary: payload.summary?.trim() || excerpt(content, 180) || null,
      content,
      contentType: payload.contentType ?? "article",
      status: "draft",
      sourceName: payload.sourceName ?? payload.source ?? null,
      sourceUrl: payload.sourceUrl ?? payload.source_url ?? null,
      company: payload.company ?? null,
      topic: payload.topic ?? null,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
      imageUrl: payload.imageUrl ?? payload.image_url ?? null,
      authorName: payload.authorName ?? payload.author_name ?? "AI Pulse Desk",
    };

    const saved = await upsertArticle(article);

    return NextResponse.json({
      ok: true,
      article: saved,
      whyItMatters: buildWhyItMatters(saved),
    });
  } catch (error) {
    console.error("POST /api/ingest failed", error);

    return NextResponse.json(
      { ok: false, error: "Failed to ingest article" },
      { status: 500 }
    );
  }
}
