
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findArticleBySlug, getApprovedArticles } from "@/lib/storage";
import { ArticleCard } from "@/components/article-card";
import { ArticleIntelligence } from "@/components/article-intelligence";
import { calculateReadingTime, ensureAbsoluteUrl, excerpt, formatDate } from "@/lib/utils";
import { getImageOrFallback } from "@/lib/featured-images";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await findArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found | AI Pulse" };
  }

  const title = `${article.title} | AI Pulse`;
  const description = excerpt(article.summary || article.content, 160);
  const url = ensureAbsoluteUrl(`/article/${article.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await findArticleBySlug(slug);

  if (!article) notFound();

  const related = (await getApprovedArticles())
    .filter((item) => item.slug !== article.slug)
    .filter((item) => {
      if (article.topic && item.topic && item.topic === article.topic) return true;
      if (article.company && item.company && item.company === article.company) return true;
      return false;
    })
    .slice(0, 3);

  const articleUrl = ensureAbsoluteUrl(`/article/${article.slug}`);
  const shareText = encodeURIComponent(article.title);
  const media = getImageOrFallback(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    description: article.summary || excerpt(article.content, 160),
    mainEntityOfPage: articleUrl,
    publisher: {
      "@type": "Organization",
      name: "AI Pulse",
      url: ensureAbsoluteUrl("/"),
    },
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
            <span>{(article.contentType ?? "article").replace(/_/g, " ")}</span>
            <span className="text-slate-600">•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="text-slate-600">•</span>
            <span>{calculateReadingTime(article.content)}</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {article.title}
          </h1>

          {article.summary ? (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              {article.summary}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {article.topic ? (
              <Link
                href={`/topics/${article.topic.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300"
              >
                {article.topic}
              </Link>
            ) : null}

            {article.company ? (
              <Link
                href={`/companies/${article.company.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300"
              >
                {article.company}
              </Link>
            ) : null}
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10">
            {media.imageUrl ? (
              <img src={media.imageUrl} alt={article.title} className="h-auto w-full object-cover" />
            ) : (
              <div className={`flex aspect-[16/8] items-end bg-gradient-to-br ${media.gradient} p-8`}>
                <div className="max-w-2xl text-3xl font-semibold leading-tight text-white">
                  {article.title}
                </div>
              </div>
            )}
          </div>

          <ArticleIntelligence article={article} />

          <div className="prose prose-invert mt-10 max-w-none">
            {(article.content || "")
              .split("\n")
              .filter(Boolean)
              .map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          {article.sourceUrl ? (
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-medium text-white">Original source</div>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm text-cyan-400 hover:text-cyan-300"
              >
                {article.sourceName || "Open original source"} →
              </a>
            </div>
          ) : null}
        </article>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Share
            </div>
            <div className="mt-4 grid gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-white/20"
              >
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-white/20"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Story details
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div><span className="text-slate-500">Published:</span> {formatDate(article.publishedAt)}</div>
              <div><span className="text-slate-500">Reading time:</span> {calculateReadingTime(article.content)}</div>
              <div><span className="text-slate-500">Author:</span> {article.authorName || "AI Pulse Desk"}</div>
            </div>
          </div>
        </aside>
      </div>

      {related.length ? (
        <section className="mt-16">
          <div className="mb-6 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-semibold text-white">Related stories</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} compact />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
