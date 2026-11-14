import type { Metadata } from 'next';
import { fontVariables } from '@/configs/fonts';
import { BASE_METADATA } from '@/configs/metadata';
import { langInfo } from '@/i18n';
import { I18nProvider } from '@/i18n/I18nProvider';
import { getDict, getLang } from '@/i18n/server';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: 'ShelterKart — Independent Property & Builder Research',
  description:
    'Independent assessments of properties and the real estate developers behind them, with every claim traced to its public source.',
};

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  const dict = await getDict(lang);
  return (
    <html
      lang={lang}
      dir={langInfo(lang).dir}
      suppressHydrationWarning
      className={`dark ${fontVariables} min-[1280px]:text-[112.5%] min-[1600px]:text-[125%]`}
    >
      <body className="bg-background font-text text-slate-900 antialiased">
        <I18nProvider lang={lang} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
