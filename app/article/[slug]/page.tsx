import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findArticleBySlug, getApprovedArticles } from "@/lib/storage";
import { ArticleCard } from "@/components/article-card";
import { ensureAbsoluteUrl, excerpt, formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await findArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found | AI Pulse",
    };
  }

  const title = `${article.title} | AI Pulse`;
  const description = excerpt(article.summary || article.content, 160);
  const url = ensureAbsoluteUrl(`/article/${article.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
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

  if (!article) {
    notFound();
  }

  const related = (await getApprovedArticles())
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <article>
        <div className="mb-4 text-sm uppercase tracking-wide text-gray-500">
          {article.topic || "AI"}
          {article.company ? ` • ${article.company}` : ""}
        </div>

        <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>

        {article.summary ? (
          <p className="mt-4 text-lg leading-8 text-gray-700">{article.summary}</p>
        ) : null}

        <div className="mt-4 text-sm text-gray-500">
          {formatDate(article.publishedAt)}
          {article.sourceName ? ` • Source: ${article.sourceName}` : ""}
          {article.sourceUrl ? (
            <>
              {" "}
              •{" "}
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700"
              >
                Original link
              </a>
            </>
          ) : null}
        </div>

        <div className="prose prose-slate mt-8 max-w-none">
          {(article.content || "")
            .split("\n")
            .filter(Boolean)
            .map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
        </div>
      </article>

      {related.length ? (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold">Related stories</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}