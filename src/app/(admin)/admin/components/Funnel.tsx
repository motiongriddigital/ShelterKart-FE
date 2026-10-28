import type { FunnelStep } from '@/types/admin';
import { barWidth } from '@/utils/adminMetrics';
import { fmt } from '@/utils/format';

export function Funnel({ steps }: { steps: FunnelStep[] }) {
  const top = Math.max(1, steps[0]?.count ?? 1);
  return (
    <ul className="bars funnel">
      {steps.map((s) => (
        <li key={s.label}>
          <span className="k">{s.label}</span>
          <span className="track">
            <span className="fill" style={{ width: `${barWidth(s.count, top)}%` }} />
          </span>
          <span className="v">
            {fmt(s.count)}
            {s.ofPrevious != null && <span className="pct">{s.ofPrevious}%</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
