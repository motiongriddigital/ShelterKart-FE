import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteModals } from '@/components/modals/SiteModals';
import { fontVariables } from '@/configs/fonts';
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
      className={`dark ${fontVariables} min-[1280px]:text-[112.5%] min-[1600px]:text-[125%]`}
    >
      <body className="bg-background font-text text-slate-900 antialiased">
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
