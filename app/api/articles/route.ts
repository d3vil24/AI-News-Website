
import { NextRequest, NextResponse } from "next/server";
import { listPublishedArticles, listAdminArticles } from "@/lib/articles";

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status");

    // Admin mode: return all articles (optionally filtered by status)
    if (status) {
      const articles = await listAdminArticles(
        status === "all" ? undefined : (status as Parameters<typeof listAdminArticles>[0])
      );
      return NextResponse.json({ ok: true, articles });
    }

    // Public mode: return only approved/published articles
    const articles = await listPublishedArticles(50);
    return NextResponse.json({ ok: true, articles });
  } catch (error) {
    console.error("GET /api/articles failed", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch articles" }, { status: 500 });
  }
}
