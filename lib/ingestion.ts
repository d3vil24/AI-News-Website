
import { Article } from "@/lib/types";
import { buildDraftArticle, buildWhyItMatters } from "@/lib/newsroom";
import { getSourceById, NEWS_SOURCES } from "@/lib/source-registry";
import { readArticles } from "@/lib/storage";

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
  "openai",
  "anthropic",
  "google",
  "microsoft",
  "meta",
  "amazon",
  "hugging face",
  "perplexity",
  "mistral",
  "cohere",
];

const TOPIC_RULES: Array<{ keyword: string; topic: string }> = [
  { keyword: "agent", topic: "AI Agents" },
  { keyword: "copilot", topic: "Copilot" },
  { keyword: "funding", topic: "AI Startups" },
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
    if (parsed.pathname.endsWith("/")) {
      parsed.pathname = parsed.pathname.slice(0, -1);
    }
    return parsed.toString();
  } catch {
    return url.trim();
  }
}

export function detectCompany(input: string) {
  const lower = input.toLowerCase();
  const found = COMPANY_KEYWORDS.find((name) => lower.includes(name));
  if (!found) return null;

  return found
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
    const sameUrl =
      normalizedCandidateUrl &&
      article.sourceUrl &&
      normalizeUrl(article.sourceUrl) === normalizedCandidateUrl;

    const sameTitle = article.title.trim().toLowerCase() === candidateTitle;

    return Boolean(sameUrl || sameTitle);
  });
}

export async function buildDraftFromSourceEntry(entry: SourceEntry) {
  const articles = await readArticles();
  const source = entry.sourceId ? getSourceById(entry.sourceId) : null;

  const sourceName = source?.name ?? null;
  const sourceUrl = entry.url;
  const combinedText = [entry.title, entry.summary, entry.content].filter(Boolean).join(" ");

  const company = detectCompany(combinedText) ?? source?.defaultCompany ?? null;
  const topic = detectTopic(combinedText) ?? source?.defaultTopic ?? null;

  const duplicate = isLikelyDuplicate(articles, {
    title: entry.title,
    sourceUrl,
  });

  if (duplicate) {
    return {
      ok: false as const,
      reason: "duplicate",
      article: null,
      whyItMatters: null,
    };
  }

  const article = buildDraftArticle({
    title: entry.title,
    summary: entry.summary ?? null,
    content: entry.content ?? null,
    sourceName,
    sourceUrl,
    company,
    topic,
    imageUrl: entry.imageUrl ?? null,
    authorName: "AI Pulse Desk",
  });

  const whyItMatters = buildWhyItMatters(article);

  return {
    ok: true as const,
    reason: null,
    article,
    whyItMatters,
  };
}

export function getFetchableSources() {
  return NEWS_SOURCES.filter((source) => source.rssUrl || source.url);
}
