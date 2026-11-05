import type { Metadata } from 'next';
import { DocNav } from '@/components/layout/DocNav';
import { DraftBanner } from '@/components/layout/DraftBanner';
import { EntityNotice } from './components/EntityNotice';
import { NeutralityNote } from './components/NeutralityNote';
import { PriceByCurrencyTable } from './components/PriceByCurrencyTable';
import { PriceByValueTable } from './components/PriceByValueTable';
import { PriceFactors } from './components/PriceFactors';
import { PricingHero } from './components/PricingHero';
import { ScopeSection } from './components/ScopeSection';
import { TaxGovernance } from './components/TaxGovernance';
import { PRICE_BY_CURRENCY, PRICE_BY_VALUE } from './data/priceBook';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Searching is free. Each full report has one price, the same for every buyer.',
};

export default function PricingPage() {
  return (
    <div className="font-['Manrope_Variable',system-ui,sans-serif] [&_:is(h1,h2,h3)]:font-['Plus_Jakarta_Sans_Variable'] mx-auto max-w-[1900px] px-4 pb-14 pt-7 text-ink md:px-8 xl:px-12">
      <DraftBanner />
      <DocNav current="pricing" />
      <div className="space-y-10 md:space-y-12">
        <PricingHero />
        <EntityNotice />
        <ScopeSection />
        <PriceFactors />
        <NeutralityNote />
        <PriceByValueTable rows={PRICE_BY_VALUE} />
        <PriceByCurrencyTable rows={PRICE_BY_CURRENCY} />
        <TaxGovernance />
      </div>
    </div>
  );
}
