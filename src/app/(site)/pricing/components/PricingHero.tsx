import { Clock } from 'lucide-react';
import { Decor } from '@/components/illustrations/Decor';
import { KeyHouseArt } from '@/components/illustrations/KeyHouseArt';
import { PRICE_LIST_VERSION } from '../data/priceBook';
import { PRICING_INTRO } from '@/constants/pricing';

export function PricingHero() {
  return (
    <section className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <Decor className="end-64 -top-2 hidden w-40 lg:block xl:end-80">
        <KeyHouseArt className="w-full text-blue-600/25" />
      </Decor>
      <div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-slate-500">
          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-semibold uppercase tracking-wide">
            Statutory fee schedule &amp; valuation docket
          </span>
          <span>Gazette Code: SK-PRC-2026</span>
          <span>Tariff Version {PRICE_LIST_VERSION}</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Pricing
        </h1>
        <p className="mt-1 max-w-xl text-sm text-slate-600">{PRICING_INTRO}</p>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 pe-5 shadow-sm">
        <span className="grid size-10 place-items-center rounded-md bg-blue-50 text-blue-700">
          <Clock className="size-5" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="text-[0.5625rem] font-semibold uppercase tracking-wider text-slate-500">
            Checkout lock
          </p>
          <p className="mt-0.5 text-sm font-bold text-slate-900">Guaranteed 30-Min Fixed Rate</p>
        </div>
      </div>
    </section>
  );
}
