import Link from 'next/link';

const links = [
  { href: '/' as const, label: 'Home' },
  { href: '/alerts' as const, label: 'Live Alerts' },
  { href: '/weekly' as const, label: 'Weekly Issues' },
  { href: '/editorial' as const, label: 'Editorial Policy' },
  { href: '/about' as const, label: 'About' },
  { href: '/contact' as const, label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          AI Pulse
        </Link>

        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
