
export type NewsSource = {
  id: string;
  name: string;
  category: "company" | "media" | "community" | "research";
  url: string;
  rssUrl?: string;
  defaultTopic?: string;
  defaultCompany?: string;
  notes?: string;
};

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "openai-blog",
    name: "OpenAI",
    category: "company",
    url: "https://openai.com",
    defaultCompany: "OpenAI",
    defaultTopic: "AI Models",
    notes: "Product launches, model releases, API updates",
  },
  {
    id: "anthropic-news",
    name: "Anthropic",
    category: "company",
    url: "https://www.anthropic.com",
    defaultCompany: "Anthropic",
    defaultTopic: "AI Safety",
    notes: "Model updates, enterprise AI, safety",
  },
  {
    id: "google-ai",
    name: "Google AI",
    category: "company",
    url: "https://blog.google",
    defaultCompany: "Google",
    defaultTopic: "AI Platform",
    notes: "Gemini, research, Google Cloud AI",
  },
  {
    id: "microsoft-ai",
    name: "Microsoft",
    category: "company",
    url: "https://blogs.microsoft.com",
    defaultCompany: "Microsoft",
    defaultTopic: "Copilot",
    notes: "Copilot, Azure AI, enterprise AI",
  },
  {
    id: "meta-ai",
    name: "Meta AI",
    category: "company",
    url: "https://ai.meta.com",
    defaultCompany: "Meta",
    defaultTopic: "Open Models",
    notes: "Llama, research, open models",
  },
  {
    id: "techcrunch-ai",
    name: "TechCrunch",
    category: "media",
    url: "https://techcrunch.com",
    defaultTopic: "AI Startups",
    notes: "Funding, startups, launches",
  },
  {
    id: "huggingface-blog",
    name: "Hugging Face",
    category: "community",
    url: "https://huggingface.co",
    defaultCompany: "Hugging Face",
    defaultTopic: "Open Source AI",
    notes: "Open-source models and ecosystem news",
  },
];

export function getSourceById(id: string) {
  return NEWS_SOURCES.find((source) => source.id === id) ?? null;
}
