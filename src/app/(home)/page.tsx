import Link from 'next/link';
import { getT } from '@/i18n/server';
import { orderedMarkets } from '@/utils/markets';
import { PublicRecordCta } from './components/cta/PublicRecordCta';
import { DocketComparison } from './components/docket/DocketComparison';
import { GuideCard } from './components/guide/GuideCard';
import { Hero } from './components/hero/Hero';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { StatusStrip } from './components/layout/StatusStrip';
import { MarketCoverage } from './components/markets/MarketCoverage';
import { HomeModals } from './components/modals/HomeModals';
import { ConsentBanner } from './components/notices/ConsentBanner';
import { DemoBanner } from './components/notices/DemoBanner';
import { PageViewTracker } from './components/notices/PageViewTracker';
import { SearchPanel } from './components/search/SearchPanel';

// Sections in reading order; each one is its own component, fed by constants/home.ts and the hooks beneath it.
export default async function HomePage() {
  const t = await getT();
  return (
    <>
      <PageViewTracker />
      <DemoBanner />
      <Link
        href="#search"
        className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-[70] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-sm"
      >
        {t('Skip to search')}
      </Link>
      <ConsentBanner />
      <noscript>
        <div className="fixed inset-0 z-[80] grid place-items-center bg-white p-6 text-center text-slate-800">
          <div className="max-w-md">
            <p className="text-xl font-bold">ShelterKart</p>
            <p className="mt-3">
              This service needs JavaScript to look up public records. Please enable it in your
              browser settings, then reload this page.
            </p>
            <p className="mt-3">
              If you cannot enable it, write to us and we will send the report by email.
            </p>
          </div>
        </div>
      </noscript>

      <SiteHeader />
      <StatusStrip />
      <main>
        <Hero />
        <MarketCoverage markets={orderedMarkets()} />
        <SearchPanel />
        <GuideCard />
        <DocketComparison />
        <PublicRecordCta />
      </main>
      <SiteFooter />
      <HomeModals />
    </>
  );
}
