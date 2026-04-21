
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="text-xl font-semibold text-white">AI Pulse</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Fast, editorial AI coverage focused on launches, startups, funding, agents, and big-tech moves.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Sections
          </div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/">Home</Link>
            <Link href="/alerts">Alerts</Link>
            <Link href="/weekly">Weekly</Link>
            <Link href="/editorial">Editorial</Link>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Company
          </div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin-review">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
