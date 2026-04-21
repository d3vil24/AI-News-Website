
import Link from "next/link";
import { Article } from "@/lib/types";

export function ArticleIntelligence({ article }: { article: Article }) {
  const companySlug = article.company?.toLowerCase().replace(/\s+/g, "-");
  const topicSlug = article.topic?.toLowerCase().replace(/\s+/g, "-");

  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-sm font-medium text-white">Why this matters</div>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          This signals where AI product velocity, platform competition, or startup momentum is moving.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-sm font-medium text-white">Market angle</div>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Stories like this help identify whether the AI market is consolidating around major platforms,
          fragmenting into vertical tools, or accelerating in infrastructure and agent orchestration.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="text-sm font-medium text-white">Explore more</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {article.topic && topicSlug ? <Link href={`/topics/${topicSlug}`} className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">More on {article.topic}</Link> : null}
          {article.company && companySlug ? <Link href={`/companies/${companySlug}`} className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">More on {article.company}</Link> : null}
        </div>
      </div>
    </section>
  );
}
