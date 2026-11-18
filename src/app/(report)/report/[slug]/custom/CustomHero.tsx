import { CheckCircle2 } from 'lucide-react';
import { BlueprintArt } from '@/components/illustrations/BlueprintArt';
import { Decor } from '@/components/illustrations/Decor';
import type { CustomResearchResult } from '@/types/customResearch';
import { cn } from '@/utils/cn';

const COUNTS = [
  {
    key: 'sourcesChecked',
    label: 'Sources checked',
    hint: 'Pages we read',
    tone: 'border-slate-200 bg-slate-50',
  },
  {
    key: 'confirmedFacts',
    label: 'Confirmed officially',
    hint: 'Seen in an official record',
    tone: 'border-emerald-200 bg-emerald-50/60',
  },
  {
    key: 'differencesFound',
    label: 'Differences found',
    hint: 'Seller and records disagree',
    tone: 'border-amber-200 bg-amber-50/60',
  },
  {
    key: 'questionsToAsk',
    label: 'Questions to ask',
    hint: 'To put to the seller',
    tone: 'border-blue-200 bg-blue-50/60',
  },
] as const;

/** The top of the report: what was searched, the short answer, and how much was found. */
export function CustomHero({ report }: { report: CustomResearchResult }) {
  return (
    <section
      id="summary"
      className="relative mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-8 md:px-8 xl:px-12"
    >
      <Decor className="end-8 top-6 hidden w-56 2xl:block">
        <BlueprintArt className="w-full text-blue-600/20" />
      </Decor>
      <p className="text-base font-semibold text-blue-700">Property research · free summary</p>
      <h1 className="mt-2 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {report.query}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-800">{report.summary}</p>

      {report.highlights.length > 0 && (
        <ul className="mt-5 max-w-3xl space-y-2">
          {report.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3 text-lg text-slate-900">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {COUNTS.map((c) => (
          <li key={c.key} className={cn('rounded-xl border px-4 py-4', c.tone)}>
            <p className="text-4xl font-bold tabular-nums text-slate-900">{report.counts[c.key]}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{c.label}</p>
            <p className="mt-0.5 text-base text-slate-700">{c.hint}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
