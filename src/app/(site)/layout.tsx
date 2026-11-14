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
import '@/styles/globals.scss';

export const metadata: Metadata = BASE_METADATA;

// The header and footer are the home page's, so every page shares one frame. Each route group (site, home,
// admin) is its own root layout, so a page's global stylesheet only loads on that page.
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const dict = await getDict(lang);
  return (
    <html
      lang={lang}
      dir={langInfo(lang).dir}
      className={`dark ${fontVariables} min-[1280px]:text-[112.5%] min-[1600px]:text-[125%]`}
    >
      <body className="text-slate-900 antialiased">
        <I18nProvider lang={lang} dict={dict}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <SiteModals />
        </I18nProvider>
      </body>
    </html>
  );
}
