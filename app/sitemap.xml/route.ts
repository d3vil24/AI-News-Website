import { NextResponse } from "next/server";
import { getApprovedArticles } from "@/lib/storage";

export const dynamic = "force-dynamic";

function safeDate(value?: string | null): string {
  if (!value) return new Date().toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-news-website-theta.vercel.app";

  let articleEntries = "";

  try {
    const articles = await getApprovedArticles();
    articleEntries = articles
      .map(
        (article) => `
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${safeDate(article.updatedAt || article.publishedAt || article.createdAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join("");
  } catch {
    // DB not reachable — return static-only sitemap
  }

  const staticRoutes = ["", "/about", "/contact", "/editorial", "/weekly", "/alerts"];
  const staticEntries = staticRoutes
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${path === "" ? "1.0" : "0.7"}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}${articleEntries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
