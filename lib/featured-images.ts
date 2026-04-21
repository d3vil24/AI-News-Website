
import { Article } from "@/lib/types";

const gradients = [
  "from-cyan-500/20 via-slate-950 to-slate-900",
  "from-violet-500/20 via-slate-950 to-slate-900",
  "from-emerald-500/20 via-slate-950 to-slate-900",
  "from-fuchsia-500/20 via-slate-950 to-slate-900",
];

export function getFallbackGradient(article: Pick<Article, "title">) {
  const index = article.title.length % gradients.length;
  return gradients[index];
}

export function getImageOrFallback(article: Pick<Article, "imageUrl" | "title">) {
  return {
    imageUrl: article.imageUrl ?? null,
    gradient: getFallbackGradient(article),
  };
}
