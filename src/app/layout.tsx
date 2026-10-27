import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Masthead } from '@/components/layout/Masthead';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SITE_URL } from '@/configs/env';
import '@/styles/globals.scss';

const fraunces = localFont({
  src: '../../public/fonts/fraunces-latin-600-normal.woff2',
  weight: '600',
  variable: '--font-fraunces',
  display: 'swap',
});
const instrument = localFont({
  src: [
    { path: '../../public/fonts/InstrumentSans-Regular.ttf', weight: '400' },
    { path: '../../public/fonts/InstrumentSans-Bold.ttf', weight: '700' },
  ],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'ShelterKart', template: '%s · ShelterKart' },
  description: 'Peace of mind, on the record.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>
        <Masthead />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
