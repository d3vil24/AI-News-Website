
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApprovedArticles } from "@/lib/storage";
import { ArticleCard } from "@/components/article-card";
import { ensureAbsoluteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getApprovedArticles();
  const matching = articles.filter((item) => item.topic && normalize(item.topic) === slug);
  const topicName = matching[0]?.topic || slug;

  return {
    title: `${topicName} News | AI Pulse`,
    description: `Latest AI news, launches, and analysis for ${topicName}.`,
    alternates: {
      canonical: ensureAbsoluteUrl(`/topics/${slug}`),
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const articles = await getApprovedArticles();

  const matching = articles.filter((item) => item.topic && normalize(item.topic) === slug);

  if (!matching.length) notFound();

  const topicName = matching[0].topic || slug;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
          Topic
        </div>
        <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">{topicName}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
          Coverage, launches, market shifts, and analysis related to {topicName}.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {matching.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
