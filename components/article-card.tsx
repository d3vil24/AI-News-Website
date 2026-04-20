import Link from 'next/link';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10">
      <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
        <span>{article.contentType.replace('_', ' ')}</span>
        <span>•</span>
        <span>{formatDate(article.publishedAt)}</span>
      </div>
      <Link href={`/article/${article.slug}`} className="block">
        <h3 className="text-xl font-semibold text-white hover:text-violet-300">{article.title}</h3>
      </Link>
      <p className="mt-3 text-sm leading-6 text-slate-300">{article.summary}</p>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>{article.sourceName}</span>
        <Link href={`/article/${article.slug}`} className="text-violet-300 hover:text-violet-200">
          Read more
        </Link>
      </div>
    </article>
  );
}
