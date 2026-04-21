
import { listPublishedArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";

export default async function HomePage() {
  const articles = await listPublishedArticles(24);
  const [featured, ...rest] = articles;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10">
        <div className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-700">Latest AI News</div>
        <h1 className="text-4xl font-bold tracking-tight">AI Pulse</h1>
        <p className="mt-3 max-w-2xl text-base text-gray-600">
          Curated AI news, company updates, product launches, and editorial summaries powered by a review-first publishing workflow.
        </p>
      </section>

      {featured ? (
        <section className="mb-10 rounded-3xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
          <div className="mb-2 text-sm uppercase tracking-wide text-gray-500">
            {featured.topic || "Featured"}{featured.company ? ` • ${featured.company}` : ""}
          </div>
          <a href={`/article/${featured.slug}`} className="block text-3xl font-bold leading-tight">
            {featured.title}
          </a>
          {featured.summary ? <p className="mt-4 max-w-3xl text-base leading-7 text-gray-700">{featured.summary}</p> : null}
        </section>
      ) : null}

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>

      {!articles.length ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-500">
          No published stories yet. Publish your first article from the admin review page.
        </div>
      ) : null}
    </main>
  );
}
