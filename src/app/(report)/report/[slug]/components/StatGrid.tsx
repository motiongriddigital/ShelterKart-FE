import type { Stat } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { statTone } from './tones';

/** The count of each kind of finding, each with a plain one-line meaning so no tile needs explaining. */
export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
      {stats.map((s) => (
        <li key={s.label} className={cn('rounded-xl border px-4 py-4', statTone[s.tone])}>
          <p className="text-4xl font-bold tabular-nums">{s.value}</p>
          <p className="mt-1 text-lg font-bold text-slate-900">{s.label}</p>
          <p className="mt-0.5 text-base text-slate-700">{s.hint}</p>
        </li>
      ))}
    </ul>
  );
}
