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
        eyebrow="Section 04 · Complete checklist"
        title="Full Due-Diligence Matrix (30 Inquiries)"
        sub="Filter questions by target department during developer engagement."
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
              'rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
              filter === name
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
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
            <span className="text-xs font-bold text-slate-400">#{i.no}</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">{i.question}</p>
              <p className="mt-0.5 text-[0.6875rem] text-slate-500">{i.direction}</p>
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
        {!items.length && <li className="p-4 text-sm text-slate-500">No sample questions here.</li>}
      </ul>
      <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-center text-[0.6875rem] text-slate-500">
        {checklist.more} additional detailed questions available in printable PDF report format.
      </p>
    </section>
  );
}
