'use client';
import { useMemo, useState } from 'react';
import type { ChecklistGroup, PropertyReport } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { Chip } from './Chip';
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
    <section className="mx-auto max-w-[1900px] px-4 pt-12 md:px-8 xl:px-12">
      <SectionHeading
        eyebrow="Part 4 · Full checklist"
        title="The full checklist of questions"
        sub="Choose a topic to see only the questions for that person, such as the lawyer or the builder’s accounts team."
      />
      <div role="tablist" aria-label="Filter by department" className="mb-3 flex flex-wrap gap-1.5">
        {tabs.map(([name, count]) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={filter === name}
            onClick={() => setFilter(name)}
            className={cn(
              'rounded-full border px-3 py-1 text-sm font-semibold transition-colors',
              filter === name
                ? 'border-slate-900 bg-slate-900 text-white dark:border-amber-400 dark:bg-amber-400 dark:text-slate-950'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
            )}
          >
            {name} ({count})
          </button>
        ))}
      </div>

      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {items.map((i) => (
          <li
            key={i.no}
            className="grid grid-cols-[2rem_1fr] items-start gap-x-3 gap-y-2 p-3 md:grid-cols-[2rem_1fr_auto_auto] md:p-4"
          >
            <span className="text-sm font-bold text-slate-600">#{i.no}</span>
            <div className="min-w-0">
              <p className="text-base font-semibold text-slate-900">{i.question}</p>
              <p className="mt-0.5 text-sm text-slate-600">{i.direction}</p>
            </div>
            <div className="col-start-2 flex items-center gap-3 md:contents">
              <Chip tone={i.status === 'Document in Hand' ? 'green' : 'slate'}>{i.status}</Chip>
              <input
                type="checkbox"
                aria-label={`Mark question ${i.no} done`}
                defaultChecked={i.status === 'Document in Hand'}
                className="size-4 shrink-0 accent-blue-700 md:mt-0.5"
              />
            </div>
          </li>
        ))}
        {!items.length && (
          <li className="p-4 text-base text-slate-600">No sample questions here.</li>
        )}
      </ul>
      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-center text-sm text-slate-600">
        {checklist.more} additional detailed questions available in printable PDF report format.
      </p>
    </section>
  );
}
