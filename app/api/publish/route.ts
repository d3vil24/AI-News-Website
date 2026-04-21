import { NextRequest, NextResponse } from "next/server";
import { findArticleBySlug, readArticles, upsertArticle, updateArticleStatus } from "@/lib/storage";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      id?: string;
      slug?: string;
    };

    if (!body.id && !body.slug) {
      return NextResponse.json(
        { ok: false, error: "Article id or slug is required" },
        { status: 400 }
      );
    }

    let article = null;

    if (body.slug) {
      article = await findArticleBySlug(body.slug);
    } else if (body.id) {
      const items = await readArticles();
      article = items.find((item) => item.id === body.id) ?? null;
    }

    if (!article) {
      return NextResponse.json(
        { ok: false, error: "Article not found" },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();

    const updated = await upsertArticle({
      ...article,
      status: "published",
      publishedAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      ok: true,
      article: updated,
    });
  } catch (error) {
    console.error("POST /api/publish failed", error);

    return NextResponse.json(
      { ok: false, error: "Failed to publish article" },
      { status: 500 }
    );
  }
}