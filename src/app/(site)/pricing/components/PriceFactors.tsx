import { SectionHeading } from '@/components/ui/SectionHeading';
import { EVIDENCE_TIERS, FACTOR_FOOTNOTES, PRICE_FACTORS } from '@/constants/pricing';

const CARD = 'flex flex-col rounded-lg border border-slate-200 bg-white p-5';
const CODE = 'text-[0.625rem] font-semibold uppercase tracking-wider text-slate-500';
const BADGE =
  'rounded-full bg-blue-50 px-2 py-0.5 text-[0.625rem] font-semibold text-blue-700 ring-1 ring-blue-200';

export function PriceFactors() {
  const [value, evidence] = PRICE_FACTORS;
  return (
    <section aria-labelledby="factors">
      <SectionHeading id="factors" title="How the price of a report is set">
        Each report has <strong className="text-slate-900">one price</strong>, set by code from two
        things, and it is <strong className="text-slate-900">the same for every buyer</strong>,
        wherever they are.
      </SectionHeading>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <article className={CARD}>
          <div className="flex items-center justify-between gap-2">
            <p className={CODE}>{value.code}</p>
            <span className={BADGE}>{value.badge}</span>
          </div>
          <h3 className="mt-3 text-base font-bold text-slate-900">{value.title}</h3>
          <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500 md:text-sm">
            {value.text}
          </p>
          <p className="mt-5 flex items-center justify-between gap-2 rounded-md bg-slate-50 px-3 py-2 text-[0.6875rem]">
            <span className="text-slate-500">{FACTOR_FOOTNOTES.value.label}</span>
            <strong className="text-slate-900">{FACTOR_FOOTNOTES.value.value}</strong>
          </p>
        </article>

        <article className={CARD}>
          <div className="flex items-center justify-between gap-2">
            <p className={CODE}>{evidence.code}</p>
            <span className={BADGE}>{evidence.badge}</span>
          </div>
          <h3 className="mt-3 text-base font-bold text-slate-900">{evidence.title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 md:text-sm">{evidence.text}</p>
          <ul className="mt-4 space-y-2">
            {EVIDENCE_TIERS.map((t) => (
              <li key={t.label} className="rounded-md bg-slate-50 px-3 py-2 text-xs">
                <div className="flex items-center justify-between gap-3">
                  <span>
                    <strong className="text-slate-900">{t.label}</strong>{' '}
                    <span className="text-slate-500">— {t.note}</span>
                  </span>
                  <strong className="text-blue-700">{t.percent}%</strong>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${t.percent}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.6875rem] italic text-slate-500">{FACTOR_FOOTNOTES.evidence}</p>
        </article>
      </div>
    </section>
  );
}
