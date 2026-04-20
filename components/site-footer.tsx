import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© 2026 AI Pulse. Automated editorial workflow with review gates.</p>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/editorial" className="hover:text-white">Editorial Policy</Link>
        </div>
      </div>
    </footer>
  );
}
