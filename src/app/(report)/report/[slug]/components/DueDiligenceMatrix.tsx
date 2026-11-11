'use client';
import { useMemo, useState } from 'react';
import type { ChecklistGroup, PropertyReport } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { Chip } from './Chip';
import { KeyHouseArt } from '@/components/illustrations/KeyHouseArt';
import { SectionHeading } from './SectionHeading';

type Filter = 'All' | ChecklistGroup;

export function DueDiligenceMatrix({ checklist }: { checklist: PropertyReport['checklist'] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const total = Object.values(checklist.groupCounts).reduce((a, b) => a + b, 0);
  const tabs: [Filter, number][] = [
    ['All', total],
    ...(Object.entries(checklist.groupCounts) as [ChecklistGroup, number][]),
  ];
  const items = useMemo(
    () => (filter === 'All' ? checklist.items : checklist.items.filter((i) => i.group === filter)),
    [filter, checklist.items],
  );

  return (
    <section
      id="checklist"
      className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12"
    >
      <SectionHeading
        art={<KeyHouseArt className="w-full text-blue-600/20" />}
        eyebrow="Part 4 · Full checklist"
        title="The full checklist of questions"
        sub="Choose a topic to see only the questions for that person, such as the lawyer or the builder’s accounts team."
      />
      <div role="tablist" aria-label="Filter by department" className="mb-4 flex flex-wrap gap-2">
        {tabs.map(([name, count]) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={filter === name}
            onClick={() => setFilter(name)}
            className={cn(
              'h-11 rounded-full border px-4 text-base font-semibold transition-colors',
              filter === name
                ? 'border-slate-900 bg-slate-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-slate-950'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
            )}
          >
            {name} ({count})
          </button>
        ))}
      </div>

      <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {items.map((i) => (
          <li
            key={i.no}
            className="grid grid-cols-[2rem_1fr] items-start gap-x-3 gap-y-2 p-4 md:grid-cols-[2rem_1fr_auto_auto] md:p-5"
          >
            <span className="text-lg font-bold text-slate-700">{i.no}</span>
            <div className="min-w-0">
              <p className="text-lg font-semibold text-slate-900">{i.question}</p>
              <p className="mt-1 text-base text-slate-700">{i.direction}</p>
            </div>
            <div className="col-start-2 flex items-center gap-3 md:contents">
              <Chip tone={i.status === 'Document in Hand' ? 'green' : 'slate'}>{i.status}</Chip>
              <input
                type="checkbox"
                aria-label={`Mark question ${i.no} done`}
                defaultChecked={i.status === 'Document in Hand'}
                className="size-5 shrink-0 accent-blue-700 md:mt-0.5"
              />
            </div>
          </li>
        ))}
        {!items.length && (
          <li className="p-4 text-base text-slate-600">No sample questions here.</li>
        )}
      </ul>
      <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-center text-base text-slate-700">
        {checklist.more} additional detailed questions available in printable PDF report format.
      </p>
    </section>
  );
}
