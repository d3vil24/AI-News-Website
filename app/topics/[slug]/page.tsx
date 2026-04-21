
import { listPublishedArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = (await listPublishedArticles(100)).filter(
    (article) => (article.topic || "").toLowerCase().replace(/\s+/g, "-") === slug
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold capitalize">{slug.replace(/-/g, " ")}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
