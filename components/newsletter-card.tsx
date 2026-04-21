
import { NewsletterForm } from "@/components/newsletter-form";

export function NewsletterCard() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-slate-900 p-8 shadow-2xl shadow-cyan-950/20">
      <div className="max-w-2xl">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">Newsletter</div>
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Get the biggest AI stories before everyone else</h2>
        <p className="mt-4 text-base leading-7 text-slate-300">
          A daily and weekly briefing covering AI agents, startup funding, model launches, and big-tech product moves.
        </p>
        <div className="mt-6"><NewsletterForm /></div>
        <p className="mt-3 text-xs text-slate-500">Daily signal, no spam. Built for founders, marketers, operators, developers, and AI watchers.</p>
      </div>
    </section>
  );
}
