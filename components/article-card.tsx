
import Link from "next/link";
import { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { getImageOrFallback } from "@/lib/featured-images";

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
}

export function ArticleCard({ article, compact = false }: ArticleCardProps) {
  const typeLabel = (article.contentType ?? "article").replace(/_/g, " ");
  const media = getImageOrFallback(article);

  return (
    <article className={`group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/10 transition hover:border-white/20 hover:bg-white/[0.05] ${compact ? "h-full" : ""}`}>
      {media.imageUrl ? (
        <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <img
            src={media.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className={`flex aspect-[16/9] items-end bg-gradient-to-br ${media.gradient} p-5`}>
          <div className="max-w-xs text-lg font-semibold leading-tight text-white">
            {article.title}
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
          <span>{typeLabel}</span>
          <span className="text-slate-600">•</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        <h3 className={`font-semibold leading-tight text-white transition group-hover:text-cyan-300 ${compact ? "text-lg" : "text-xl"}`}>
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>

        {article.summary ? (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
            {article.summary}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {article.topic ? (
            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              {article.topic}
            </span>
          ) : null}

          {article.company ? (
            <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              {article.company}
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <Link
            href={`/article/${article.slug}`}
            className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Read story →
          </Link>

          <span className="text-xs text-slate-500">
            {article.authorName || "AI Pulse Desk"}
          </span>
        </div>
      </div>
    </article>
  );
}
