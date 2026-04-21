
import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/alerts", label: "Alerts" },
  { href: "/weekly", label: "Weekly" },
  { href: "/editorial", label: "Editorial" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400 font-bold text-slate-950">
            AI
          </span>
          <div>
            <div className="text-lg font-semibold tracking-tight text-white">AI Pulse</div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
              TechCrunch-style AI coverage
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/"
            className="rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Join Newsletter
          </Link>
          <Link
            href="/admin-review"
            className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
          >
            Admin Review
          </Link>
        </div>
      </div>
    </header>
  );
}
