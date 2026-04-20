import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/alerts', label: 'Live Alerts' },
  { href: '/weekly', label: 'Weekly Issues' },
  { href: '/editorial', label: 'Editorial' },
  { href: '/admin-review', label: 'Admin Review' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          AI Pulse
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-300 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
