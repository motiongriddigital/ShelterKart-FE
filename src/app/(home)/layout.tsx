import type { Metadata } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/plus-jakarta-sans';
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
      className="min-[1280px]:text-[112.5%] min-[1600px]:text-[125%]"
    >
      <body className="bg-white font-['Manrope_Variable',system-ui,sans-serif] text-slate-900 antialiased [&_h1]:font-['Plus_Jakarta_Sans_Variable'] [&_h2]:font-['Plus_Jakarta_Sans_Variable'] [&_h3]:font-['Plus_Jakarta_Sans_Variable']">
        <I18nProvider lang={lang} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
