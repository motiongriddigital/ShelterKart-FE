import type { Analytics, Stats } from '@/types/admin';
import { showMetric, successRows } from '@/utils/adminMetrics';
import { bars, legacyTable, pill, tone } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

export function SuccessMetrics({ a, stats }: { a: Analytics | null; stats: Stats | null }) {
  if (!a) return <div className={bars.empty}>Could not load.</div>;
  return (
    <div className="overflow-x-auto">
      <table className={legacyTable}>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Now</th>
            <th>Target</th>
            <th></th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          {successRows(a, stats).map(({ target: m, value, met }) => (
            <tr key={m.key}>
              <td>
                <strong>{m.label}</strong>
              </td>
              <td>{showMetric(value, m.fmt)}</td>
              <td>
                {m.better === 'higher' ? '≥' : '≤'} {showMetric(m.target, m.fmt)}
              </td>
              <td>
                {met == null ? (
                  <span className={cn(pill, 'bg-[var(--mute-bg)] text-ink-3')}>no data</span>
                ) : met ? (
                  <span className={cn(pill, tone.ok)}>on target</span>
                ) : (
                  <span className={cn(pill, tone.warn)}>below target</span>
                )}
              </td>
              <td className="text-[12.5px] text-ink-3">{m.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
