import type { PricingRow } from '@/types/customResearch';
import { SectionHeading } from '../components/SectionHeading';
import { SourceLink } from './SourceLink';

const FIELDS: { label: string; read: (r: PricingRow) => string }[] = [
  { label: 'Size', read: (r) => r.size },
  { label: 'Price quoted', read: (r) => r.quotedPrice },
  { label: 'Market benchmark', read: (r) => r.benchmarkPrice },
];

/** The prices found, home type by home type. */
export function CustomPricing({ rows }: { rows: PricingRow[] }) {
  if (!rows.length) return null;
  return (
    <section
      id="pricing"
      className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12"
    >
      <SectionHeading
        eyebrow="Part 4 · Prices"
        title="What the prices look like"
        sub="The price the seller quotes next to what independent sources show."
      />
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((r) => (
          <li key={r.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-2xl font-bold text-slate-900">{r.label}</h3>
            <dl className="mt-3 divide-y divide-slate-200 text-base">
              {FIELDS.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-slate-700">{f.label}</dt>
                  <dd className="text-end font-semibold text-slate-900">{f.read(r)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-base leading-relaxed text-slate-800">{r.differenceNote}</p>
            <p className="mt-3">
              <SourceLink href={r.sourceUrl} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
