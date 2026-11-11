import type { Stat } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { statTone } from './tones';

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <li
          key={s.label}
          className={cn('rounded-lg border px-3 py-3 text-center', statTone[s.tone])}
        >
          <p className="text-2xl font-bold tabular-nums">{s.value}</p>
          <p className="mt-0.5 text-sm font-semibold text-slate-700">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}
