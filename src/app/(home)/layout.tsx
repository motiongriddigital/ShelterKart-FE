import type { Metadata } from 'next';
import { fontVariables } from '@/configs/fonts';
import { BASE_METADATA } from '@/configs/metadata';
import { langInfo } from '@/i18n';
import { I18nProvider } from '@/i18n/I18nProvider';
import { getDict, getLang } from '@/i18n/server';
import '@/styles/tokens.scss';
import './styles/home.scss';

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
    <html lang={lang} dir={langInfo(lang).dir} className={fontVariables}>
      <body>
        <I18nProvider lang={lang} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
