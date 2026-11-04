import type { Loose } from '@/types/desk';
import { baselineText, change, measureRows, num } from '@/utils/marketingView';
import { dk, tone, type Tone } from '@/app/(admin)/admin/styles/ui';

export function AnchorMarkets({ data: d }: { data: Loose }) {
  const names: Record<string, string> = Object.fromEntries(
    d.allMarkets.map((m: Loose) => [m.market, m.name]),
  );
  return (
    <section aria-labelledby="h-anchors">
      <h2 id="h-anchors">Anchor markets</h2>
      <p className={dk.muted}>
        The seven weekly numbers for India, the UAE, the UK and Singapore. Targets stay blank until
        two weeks of baseline exist.
      </p>
      <div className={dk.anchors}>
        {d.anchorMarkets.map((a: Loose) => (
          <div key={a.market}>
            <h3>{names[a.market] ?? a.market}</h3>
            <p className={dk.muted}>{baselineText(a.baseline)}</p>
            <div className={dk.scroll}>
              <table>
                <tbody>
                  <tr>
                    <th>Measure</th>
                    <th className={dk.num}>This week</th>
                  </tr>
                  {measureRows(a.thisWeek, a.lastWeek, a.targets).map((r) => {
                    const c = change(r.value, r.prev);
                    return (
                      <tr key={r.label}>
                        <td>{r.label}</td>
                        <td className={dk.num}>
                          {r.text ?? num(r.value)}
                          {c && <span className={tone[c.kind as Tone]}> {c.text}</span>}
                          {r.detail && <div className={dk.sub}>{r.detail}</div>}
                          {r.target != null && <div className={dk.sub}>Target {num(r.target)}</div>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
