
import type { Article } from "@/lib/types";
import { buildDraftArticle, buildWhyItMatters } from "@/lib/newsroom";
import { readArticles } from "@/lib/storage";
import { getEnabledSources, getSourceById, type NewsSource } from "@/lib/source-registry";
import { parseRssXml, type ParsedFeedItem } from "@/lib/feed-parser";

export type SourceEntry = {
  title: string;
  url: string;
  summary?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  publishedAt?: string | null;
  sourceId?: string | null;
};

const COMPANY_KEYWORDS = [
  "openai", "anthropic", "google", "microsoft", "meta",
  "amazon", "hugging face", "perplexity", "mistral", "cohere", "deepmind",
];

const TOPIC_RULES: Array<{ keyword: string; topic: string }> = [
  { keyword: "agent", topic: "AI Agents" },
  { keyword: "copilot", topic: "Copilot" },
  { keyword: "funding", topic: "AI Startups" },
  { keyword: "raise", topic: "AI Startups" },
  { keyword: "llm", topic: "AI Models" },
  { keyword: "model", topic: "AI Models" },
  { keyword: "open source", topic: "Open Source AI" },
  { keyword: "safety", topic: "AI Safety" },
  { keyword: "infrastructure", topic: "AI Infrastructure" },
  { keyword: "api", topic: "AI Platform" },
];

export function normalizeUrl(url: string) {
  try {
    const parsed = new URL(url);
    parsed.hash = "";
    parsed.searchParams.forEach((_, key) => {
      if (key.startsWith("utm_")) parsed.searchParams.delete(key);
    });
    if (parsed.pathname.endsWith("/")) parsed.pathname = parsed.pathname.slice(0, -1);
    return parsed.toString();
  } catch {
    return url.trim();
  }
}

export function detectCompany(input: string) {
  const lower = input.toLowerCase();
  const found = COMPANY_KEYWORDS.find((name) => lower.includes(name));
  if (!found) return null;
  return found.split(" ").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function detectTopic(input: string) {
  const lower = input.toLowerCase();
  const matched = TOPIC_RULES.find((rule) => lower.includes(rule.keyword));
  return matched?.topic ?? null;
}

export function isLikelyDuplicate(existing: Article[], candidate: { title: string; sourceUrl?: string | null }) {
  const normalizedCandidateUrl = candidate.sourceUrl ? normalizeUrl(candidate.sourceUrl) : null;
  const candidateTitle = candidate.title.trim().toLowerCase();

  return existing.some((article) => {
    const sameUrl = normalizedCandidateUrl && article.sourceUrl && normalizeUrl(article.sourceUrl) === normalizedCandidateUrl;
    const sameTitle = article.title.trim().toLowerCase() === candidateTitle;
    return Boolean(sameUrl || sameTitle);
  });
}

function isLowSignal(title: string) {
  const t = title.toLowerCase();
  return t.includes("academy") || t.includes("learn") || t.includes("prompting") || t.includes("guide");
}

function shouldAutoPublish(title: string) {
  const t = title.toLowerCase();
  return (
    t.includes("launch") ||
    t.includes("introducing") ||
    t.includes("release") ||
    t.includes("funding") ||
    t.includes("raises") ||
    t.includes("acquires") ||
    t.includes("announces")
  );
}

export async function buildDraftFromSourceEntry(entry: SourceEntry) {
  const articles = await readArticles();
  const source = entry.sourceId ? getSourceById(entry.sourceId) : null;

  const sourceName = source?.name ?? null;
  const sourceUrl = normalizeUrl(entry.url);
  const combinedText = [entry.title, entry.summary, entry.content].filter(Boolean).join(" ");
  const company = detectCompany(combinedText) ?? source?.defaultCompany ?? null;
  const topic = detectTopic(combinedText) ?? source?.defaultTopic ?? null;

  if (isLowSignal(entry.title)) {
    return { ok: false as const, reason: "low_signal", article: null, whyItMatters: null };
  }

  const duplicate = isLikelyDuplicate(articles, { title: entry.title, sourceUrl });
  if (duplicate) {
    return { ok: false as const, reason: "duplicate", article: null, whyItMatters: null };
  }

  const article = buildDraftArticle({
    title: entry.title,
    summary: entry.summary ?? null,
    content: entry.content ?? entry.summary ?? null,
    sourceName,
    sourceUrl,
    company,
    topic,
    imageUrl: entry.imageUrl ?? null,
    authorName: "AI Pulse Desk",
  });

  article.status = shouldAutoPublish(entry.title) ? "published" : "draft";

  if (entry.publishedAt) {
    const parsedDate = new Date(entry.publishedAt);
    if (!Number.isNaN(parsedDate.getTime())) {
      article.publishedAt = parsedDate.toISOString();
    }
  }

  const whyItMatters = buildWhyItMatters(article);
  return { ok: true as const, reason: null, article, whyItMatters };
}

export async function fetchSourceFeed(source: NewsSource) {
  if (!source.rssUrl) {
    return { ok: false as const, source, error: "missing_rss_url", items: [] as ParsedFeedItem[] };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(source.rssUrl, {
      headers: {
        "User-Agent": "AI-Pulse-Newsroom/1.0",
        "Accept": "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { ok: false as const, source, error: `http_${response.status}`, items: [] as ParsedFeedItem[] };
    }

    const xml = await response.text();
    const items = parseRssXml(xml);
    return { ok: true as const, source, error: null, items };
  } catch (error) {
    clearTimeout(timeout);
    return {
      ok: false as const,
      source,
      error: error instanceof Error ? error.message : "unknown_error",
      items: [] as ParsedFeedItem[],
    };
  }
}

export function getFetchableSources() {
  return getEnabledSources();
}
