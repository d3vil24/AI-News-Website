
import { getApprovedArticles } from "@/lib/storage";
import { ArticleCard } from "@/components/article-card";
import { SectionTitle } from "@/components/section-title";

export default async function EditorialPage() {
  const editorials = (await getApprovedArticles()).filter((item) =>
    item.contentType === "editorial" || item.contentType === "article"
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle
        eyebrow="Editorial"
        title="Analysis & Editorial"
        subtitle="Longer-form takes, market interpretation, strategic analysis, and AI industry context."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {editorials.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
