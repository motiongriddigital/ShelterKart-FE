import { getT } from '@/i18n/server';
import { orderedMarkets } from '@/utils/markets';
import { ConsentBanner } from './components/ConsentBanner';
import { DemoBanner } from './components/DemoBanner';
import { PageViewTracker } from './components/PageViewTracker';
import { Hero } from './components/Hero';
import { HomeModals } from './components/HomeModals';

export default async function HomePage() {
  const t = await getT();
  return (
    <>
      <PageViewTracker />
      <DemoBanner />
      <a href="#landing" className="skip-link">
        {t('Skip to search')}
      </a>
      <ConsentBanner />
      <noscript>
        <div className="noscript-wall">
          <div>
            <div>ShelterKart</div>
            <p>
              This service needs JavaScript to look up public records. Please enable it in your
              browser settings, then reload this page.
            </p>
            <p>If you cannot enable it, write to us and we will send the report by email.</p>
          </div>
        </div>
      </noscript>
      <Hero markets={orderedMarkets()} />
      <HomeModals />
    </>
  );
}
