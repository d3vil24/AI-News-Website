import { MetadataRoute } from "next";
import { getApprovedArticles } from "@/lib/storage";

export const dynamic = "force-dynamic";

function safeDate(value?: string | null) {
  if (!value) return new Date();

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  let articles: Awaited<ReturnType<typeof getApprovedArticles>> = [];
  try {
    articles = await getApprovedArticles();
  } catch {
    // Supabase may not be reachable at build time — return static routes only
    articles = [];
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/editorial",
    "/weekly",
    "/alerts"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/article/${article.slug}`,
    lastModified: safeDate(article.updatedAt || article.publishedAt || article.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes];
}
