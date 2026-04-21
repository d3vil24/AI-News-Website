
import { getApprovedArticles } from "@/lib/storage";
import { ArticleCard } from "@/components/article-card";
import { SectionTitle } from "@/components/section-title";

export default async function WeeklyPage() {
  const issues = (await getApprovedArticles()).filter((item) => item.contentType === "weekly_issue");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <SectionTitle
        eyebrow="Digest"
        title="Weekly Issues"
        subtitle="Curated weekly intelligence, editorial roundups, and signal-packed summaries of the AI market."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {issues.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}
