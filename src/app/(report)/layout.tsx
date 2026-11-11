import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/plus-jakarta-sans';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteModals } from '@/components/modals/SiteModals';
import { ThemeScript } from '@/components/ui/ThemeScript';
import { BASE_METADATA } from '@/configs/metadata';
import { langInfo } from '@/i18n';
import { I18nProvider } from '@/i18n/I18nProvider';
import { getDict, getLang } from '@/i18n/server';
import '@/styles/tailwind.css';

export const metadata: Metadata = { ...BASE_METADATA, robots: { index: false, follow: false } };

// The report pages are their own root layout, like the site, home and admin groups. The header, footer and dialogs
// are the home page's, so every page shares one frame.
export default async function ReportLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const dict = await getDict(lang);
  return (
    <html
      lang={lang}
      dir={langInfo(lang).dir}
      suppressHydrationWarning
      className="min-[1280px]:text-[112.5%] min-[1600px]:text-[125%]"
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-background font-['Manrope_Variable',system-ui,sans-serif] text-slate-900 antialiased [&_h1]:font-['Plus_Jakarta_Sans_Variable'] [&_h2]:font-['Plus_Jakarta_Sans_Variable'] [&_h3]:font-['Plus_Jakarta_Sans_Variable']">
        <I18nProvider lang={lang} dict={dict}>
          <SiteHeader />
          {children}
          <SiteFooter />
          <SiteModals />
        </I18nProvider>
      </body>
    </html>
  );
}
