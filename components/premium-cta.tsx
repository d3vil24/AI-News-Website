
import Link from "next/link";

export function PremiumCta() {
  return (
    <section className="rounded-[2rem] border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-900 p-8 shadow-2xl shadow-amber-950/10">
      <div className="max-w-2xl">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Premium Research</div>
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Go beyond headlines with AI market intelligence</h2>
        <p className="mt-4 text-base leading-7 text-slate-300">
          Add premium reports, startup intelligence, funding trackers, and operator-grade market briefings.
        </p>
        <div className="mt-6">
          <Link href="/research" className="inline-flex rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">
            Explore research →
          </Link>
        </div>
      </div>
    </section>
  );
}
