export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NewsletterCard } from '@/components/newsletter-card';
import { getApprovedArticles, findArticleBySlug } from '@/lib/storage';
import { formatDate } from '@/lib/utils';
import { markdownToHtml } from '@/lib/markdown';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await findArticleBySlug(slug);
  if (!article) return notFound();

  const related = (await getApprovedArticles()).filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
        <span>{article.contentType.replace('_', ' ')}</span>
        <span>•</span>
        <span>{formatDate(article.publishedAt)}</span>
        {article.company ? <><span>•</span><span>{article.company}</span></> : null}
      </div>
      <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{article.title}</h1>
      <p className="mt-5 text-xl leading-8 text-slate-300">{article.summary}</p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        <div className="font-medium text-white">Source</div>
        <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-violet-300 hover:text-violet-200">
          {article.sourceName}
        </a>
      </div>
      <article className="prose-custom mt-10" dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }} />
      <div className="mt-10">
        <NewsletterCard />
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-white">Related coverage</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.id} href={`/article/${item.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-violet-400/40">
              <div className="text-sm text-slate-400">{item.contentType.replace('_', ' ')}</div>
              <div className="mt-2 font-medium text-white">{item.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
