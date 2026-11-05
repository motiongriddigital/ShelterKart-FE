import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GOVERNANCE } from '@/constants/pricing';
import { PRICE_LIST_RATES_DATE, PRICE_LIST_VERSION } from '../data/priceBook';

export function TaxGovernance() {
  return (
    <section aria-labelledby="tax">
      <SectionHeading
        id="tax"
        eyebrow="Statutory financial audit"
        title="Tax & Exchange Rate Governance"
      >
        Prices include tax where ShelterKart collects it: in India, GST. Where ShelterKart is not
        registered for a country’s tax, no tax is charged, and the checkout says so.
      </SectionHeading>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {GOVERNANCE.map(({ icon: Icon, item }) => (
          <li key={item.title} className="rounded-lg border border-slate-200 bg-white p-5">
            <Icon className="size-4 text-blue-700" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-bold text-slate-900">{item.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{item.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-[0.6875rem] text-slate-500">
        <span>
          Price list {PRICE_LIST_VERSION}, set from the exchange rates of {PRICE_LIST_RATES_DATE}. A
          new list is published at most once a month, and never changes a price already quoted to
          you.
        </span>
        <Link href="/#search" className="font-semibold text-blue-700 hover:underline">
          Search Public Docket Now →
        </Link>
      </p>
    </section>
  );
}
