import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'AI Pulse',
    template: '%s | AI Pulse',
  },
  description: 'AI Pulse is an AI news site starter with live alerts, weekly issues, review queue, and n8n-ready publish APIs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
