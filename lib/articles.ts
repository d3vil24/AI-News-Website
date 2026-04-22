import type { Article, ArticleStatus } from "@/lib/types";
import { slugify } from "@/lib/utils";
import {
  findArticleBySlug,
  getApprovedArticles,
  readArticles,
  writeArticles,
} from "@/lib/storage";

/**
 * PUBLIC LISTING
 */
export async function listPublishedArticles(limit = 20): Promise<Article[]> {
  const items = await getApprovedArticles();
  return items.slice(0, limit);
}

/**
 * ADMIN LISTING
 */
export async function listAdminArticles(status?: ArticleStatus): Promise<Article[]> {
  const items = await readArticles();

  const filtered = status
    ? items.filter((item) => item.status === status)
    : items;

  return [...filtered].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );
}

/**
 * GET SINGLE
 */
export async function getArticleBySlug(
  slug: string
): Promise<Article | null> {
  return findArticleBySlug(slug);
}

/**
 * UPSERT (USED IN INGESTION)
 */
export async function upsertArticle(
  input: Partial<Article> & { title: string }
): Promise<Article> {
  const items = await readArticles();
  const now = new Date().toISOString();

  const existingIndex = items.findIndex(
    (item) =>
      item.slug === input.slug ||
      item.sourceUrl === input.sourceUrl
  );

  const article: Article = {
    id: input.id ?? crypto.randomUUID(),
    slug: input.slug ?? slugify(input.title),
    title: input.title,
    summary: input.summary ?? null,
    content: input.content ?? null,
    contentType: input.contentType ?? "article",
    status: input.status ?? "draft",
    sourceName: input.sourceName ?? null,
    sourceUrl: input.sourceUrl ?? null,
    company: input.company ?? null,
    topic: input.topic ?? null,
    publishedAt: input.publishedAt ?? now,
    createdAt: input.createdAt ?? now,
    updatedAt: now,
    imageUrl: input.imageUrl ?? null,
    authorName: input.authorName ?? "AI Pulse Desk",
  };

  if (existingIndex !== -1) {
    items[existingIndex] = {
      ...items[existingIndex],
      ...article,
      updatedAt: now,
    };
  } else {
    items.push(article);
  }

  await writeArticles(items);

  return article;
}

/**
 * 🔥 FIXED UPDATE (THIS WAS CRASHING BEFORE)
 */
export async function updateArticle(
  id: string,
  patch: Partial<Article>
): Promise<Article> {
  const items = await readArticles();

  const index = items.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error("Article not found");
  }

  const existing = items[index];

  const updated: Article = {
    ...existing,
    ...patch,
    slug:
      patch.slug ??
      (patch.title ? slugify(patch.title) : existing.slug),
    updatedAt: new Date().toISOString(),
  };

  // ✅ direct write (no saveArticle abstraction)
  items[index] = updated;

  await writeArticles(items);

  return updated;
}