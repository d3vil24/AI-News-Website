import { PremiumCta } from "@/components/premium-cta";
import { SponsorBlock } from "@/components/sponsor-block";

export default function ResearchPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Premium</div>
        <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">AI Research & Intelligence</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">This section is designed for premium briefings, startup intelligence, funding trackers, and operator-grade market reports.</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <PremiumCta />
        <SponsorBlock />
      </div>
    </main>
  );
}
