
import Link from "next/link";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  href?: string;
  subtitle?: string;
}

export function SectionTitle({ eyebrow, title, href, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">{eyebrow}</div> : null}
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{subtitle}</p> : null}
      </div>
      {href ? <Link href={href} className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300">View all →</Link> : null}
    </div>
  );
}
