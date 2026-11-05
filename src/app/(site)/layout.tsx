import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/plus-jakarta-sans';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteModals } from '@/components/modals/SiteModals';
import { ThemeScript } from '@/components/ui/ThemeScript';
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
const CHROME_FONT =
  "font-['Manrope_Variable',system-ui,sans-serif] [&_h2]:font-['Plus_Jakarta_Sans_Variable']";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const dict = await getDict(lang);
  return (
    <html
      lang={lang}
      dir={langInfo(lang).dir}
      suppressHydrationWarning
      className={`${fontVariables} min-[1280px]:text-[112.5%] min-[1600px]:text-[125%]`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="text-slate-900 antialiased">
        <I18nProvider lang={lang} dict={dict}>
          <div className={`bg-background ${CHROME_FONT}`}>
            <SiteHeader />
          </div>
          <main>{children}</main>
          <div className={`bg-background ${CHROME_FONT}`}>
            <SiteFooter />
          </div>
          <SiteModals />
        </I18nProvider>
      </body>
    </html>
  );
}
