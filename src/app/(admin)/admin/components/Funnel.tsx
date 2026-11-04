import type { FunnelStep } from '@/types/admin';
import { barWidth } from '@/utils/adminMetrics';
import { fmt } from '@/utils/format';
import { bars } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

export function Funnel({ steps }: { steps: FunnelStep[] }) {
  const top = Math.max(1, steps[0]?.count ?? 1);
  return (
    <ul className={bars.list}>
      {steps.map((s) => (
        <li key={s.label} className={cn(bars.row, bars.funnelRow)}>
          <span className={bars.k}>{s.label}</span>
          <span className={bars.track}>
            <span
              className={cn(bars.fill, bars.funnelFill)}
              style={{ width: `${barWidth(s.count, top)}%` }}
            />
          </span>
          <span className={bars.v}>
            {fmt(s.count)}
            {s.ofPrevious != null && <span className={bars.pct}>{s.ofPrevious}%</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
