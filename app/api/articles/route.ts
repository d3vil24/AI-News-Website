
import { NextResponse } from "next/server";
import { listPublishedArticles } from "@/lib/articles";

export async function GET() {
  try {
    const articles = await listPublishedArticles(50);
    return NextResponse.json({ ok: true, articles });
  } catch (error) {
    console.error("GET /api/articles failed", error);
    return NextResponse.json({ ok: false, error: "Failed to fetch articles" }, { status: 500 });
  }
}
