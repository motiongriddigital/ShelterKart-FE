import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/plus-jakarta-sans';
import { BASE_METADATA } from '@/configs/metadata';
import '@/styles/tailwind.css';

export const metadata: Metadata = { ...BASE_METADATA, robots: { index: false, follow: false } };

// The report pages are their own root layout, like the site, home and admin groups.
export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-[1280px]:text-[112.5%] min-[1600px]:text-[125%]">
      <body className="bg-white font-['Manrope_Variable',system-ui,sans-serif] text-slate-900 antialiased [&_h1]:font-['Plus_Jakarta_Sans_Variable'] [&_h2]:font-['Plus_Jakarta_Sans_Variable'] [&_h3]:font-['Plus_Jakarta_Sans_Variable']">
        {children}
      </body>
    </html>
  );
}
