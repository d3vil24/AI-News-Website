import Link from "next/link";
import { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
      <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
        <span>{(article.contentType ?? "article").replace(/_/g, " ")}</span>
        <span>•</span>
        <span>{formatDate(article.publishedAt)}</span>
      </div>

      <h2 className="mb-3 text-xl font-semibold leading-tight text-white">
        <Link
          href={`/article/${article.slug}`}
          className="transition hover:text-cyan-400"
        >
          {article.title}
        </Link>
      </h2>

      {article.summary && (
        <p className="mb-4 text-sm leading-6 text-slate-300">
          {article.summary}
        </p>
      )}

      <div className="flex items-center gap-3 text-sm">
        {article.topic && (
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-300">
            {article.topic}
          </span>
        )}

        {article.company && (
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-violet-300">
            {article.company}
          </span>
        )}
      </div>

      <div className="mt-5">
        <Link
          href={`/article/${article.slug}`}
          className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}