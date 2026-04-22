
export type NewsSource = {
  id: string;
  name: string;
  category: "company" | "media" | "community" | "research";
  url: string;
  rssUrl?: string;
  defaultTopic?: string;
  defaultCompany?: string;
  notes?: string;
  isEnabled?: boolean;
};

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "openai-blog",
    name: "OpenAI",
    category: "company",
    url: "https://openai.com/newsroom/",
    rssUrl: "https://openai.com/news/rss.xml",
    defaultCompany: "OpenAI",
    defaultTopic: "AI Models",
    notes: "Product launches, model releases, API updates",
    isEnabled: true,
  },
  {
    id: "google-blog",
    name: "Google AI",
    category: "company",
    url: "https://blog.google/technology/ai/",
    rssUrl: "https://blog.google/rss/",
    defaultCompany: "Google",
    defaultTopic: "AI Platform",
    notes: "Gemini, research, Google Cloud AI",
    isEnabled: true,
  },
  {
    id: "huggingface-blog",
    name: "Hugging Face",
    category: "community",
    url: "https://huggingface.co/blog",
    rssUrl: "https://huggingface.co/blog/feed.xml",
    defaultCompany: "Hugging Face",
    defaultTopic: "Open Source AI",
    notes: "Open-source models and ecosystem news",
    isEnabled: true,
  },
  {
    id: "techcrunch-ai",
    name: "TechCrunch AI",
    category: "media",
    url: "https://techcrunch.com/category/artificial-intelligence/",
    rssUrl: "https://techcrunch.com/category/artificial-intelligence/feed/",
    defaultTopic: "AI Startups",
    notes: "Funding, startups, launches",
    isEnabled: true,
  },
  {
    id: "venturebeat",
    name: "VentureBeat",
    category: "media",
    url: "https://venturebeat.com/ai/",
    rssUrl: "https://feeds.feedburner.com/venturebeat/SZYF",
    defaultTopic: "AI Industry",
    notes: "Enterprise AI, startup and market coverage",
    isEnabled: false
  },
  {
    id: "anthropic-news",
    name: "Anthropic",
    category: "company",
    url: "https://www.anthropic.com/news",
    defaultCompany: "Anthropic",
    defaultTopic: "AI Safety",
    notes: "No confirmed official RSS endpoint wired yet",
    isEnabled: false,
  },
];

export function getSourceById(id: string) {
  return NEWS_SOURCES.find((source) => source.id === id) ?? null;
}

export function getEnabledSources() {
  return NEWS_SOURCES.filter((source) => source.isEnabled !== false && source.rssUrl);
}
