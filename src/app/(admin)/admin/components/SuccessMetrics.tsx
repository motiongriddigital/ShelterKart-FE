import type { Analytics, Stats } from '@/types/admin';
import { showMetric, successRows } from '@/utils/adminMetrics';

export function SuccessMetrics({ a, stats }: { a: Analytics | null; stats: Stats | null }) {
  if (!a) return <div className="empty">Could not load.</div>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
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
                  <span className="pill not_checked">no data</span>
                ) : met ? (
                  <span className="pill healthy">on target</span>
                ) : (
                  <span className="pill degraded">below target</span>
                )}
              </td>
              <td className="rep-sub">{m.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
