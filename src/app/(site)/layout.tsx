import type { Metadata } from 'next';
import { Masthead } from '@/components/layout/Masthead';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { fontVariables } from '@/configs/fonts';
import { BASE_METADATA } from '@/configs/metadata';
import '@/styles/tailwind.css';
import '@/styles/globals.scss';

export const metadata: Metadata = BASE_METADATA;

// Each route group (site, home, admin) is its own root layout, so a page's global stylesheet only loads on that page.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Masthead />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
