import type { Loose } from '@/types/desk';
import { costCell, money, num, warningRows } from '@/utils/marketingView';
import { dk, tone as tones, type Tone } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

const RCS: Record<string, [string, string]> = {
  repeat: ['ok', 'Repeat'],
  change: ['warn', 'Change'],
  stop: ['bad', 'Stop'],
  too_early: ['plain', 'Too early'],
};
const GATE: Record<string, [string, string]> = {
  met: ['ok', 'Met'],
  unknown: ['plain', 'Unknown'],
};

const Word = ({ tone, children }: { tone: string; children: string }) => (
  <span className={cn(dk.word, tone ? tones[tone as Tone] : '')}>{children}</span>
);
const Section = ({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) => (
  <section aria-labelledby={id}>
    <h2 id={id}>{title}</h2>
    {note && <p className={dk.muted}>{note}</p>}
    <div className={dk.scroll}>{children}</div>
  </section>
);

export function Tables({ data: d }: { data: Loose }) {
  const names: Record<string, string> = Object.fromEntries(
    d.allMarkets.map((m: Loose) => [m.market, m.name]),
  );
  const t = d.total.thisWeek;
  const u = d.unattributed;
  const rank: Loose[] = d.monthlyRanking;

  return (
    <>
      <Section id="h-all" title="All 36 markets, this week">
        <p className={dk.muted}>
          {u.visits
            ? `${u.visits} visit(s) this week carried no market and are counted only in the totals.`
            : 'Every visit this week was tied to a market.'}
        </p>
        <table>
          <thead>
            <tr>
              <th>Market</th>
              <th className={dk.num}>Visits</th>
              <th className={dk.num}>Previews per 100</th>
              <th className={dk.num}>Shares per 100</th>
              <th className={dk.num}>Check requests</th>
              <th className={dk.num}>Paid</th>
              <th>Revenue</th>
              <th>Cost per paid</th>
            </tr>
          </thead>
          <tbody>
            {d.allMarkets.map((m: Loose) => (
              <tr key={m.market}>
                <td>{m.name}</td>
                <td className={dk.num}>{num(m.thisWeek.visits)}</td>
                <td className={dk.num}>{num(m.thisWeek.previewsPer100)}</td>
                <td className={dk.num}>{num(m.thisWeek.sharesPer100)}</td>
                <td className={dk.num}>{num(m.thisWeek.checkRequests)}</td>
                <td className={dk.num}>{num(m.thisWeek.paid)}</td>
                <td>{money(m.thisWeek.revenue)}</td>
                <td>{m.thisWeek.organic ? 'No spend' : money(m.thisWeek.costPerPaid)}</td>
              </tr>
            ))}
            <tr>
              <th>All markets</th>
              <th className={dk.num}>{num(t.visits)}</th>
              <th className={dk.num}>{num(t.previewsPer100)}</th>
              <th className={dk.num}>{num(t.sharesPer100)}</th>
              <th className={dk.num}>{num(t.checkRequests)}</th>
              <th className={dk.num}>{num(t.paid)}</th>
              <th>{money(t.revenue)}</th>
              <th>{costCell(t)}</th>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section id="h-warn" title="Early warnings">
        <table>
          <thead>
            <tr>
              <th>Warning</th>
              <th>This week</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {warningRows(d).map((r) => (
              <tr key={r[0]}>
                <td>{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section id="h-gate" title="Phase 1 gate: all five must hold">
        <table>
          <thead>
            <tr>
              <th>Condition</th>
              <th>Status</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {d.decisions.gate.conditions.map((c: Loose) => {
              const [tone, text] = GATE[c.status] ?? ['warn', 'Not met'];
              return (
                <tr key={c.label}>
                  <td>{c.label}</td>
                  <td>
                    <Word tone={tone}>{text}</Word>
                  </td>
                  <td>{c.detail ?? ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      <Section
        id="h-rcs"
        title="Repeat, change, stop"
        note="Each social topic and platform this week, judged by the previews its visitors opened. A topic needs 30 visits before it is judged. Repeat: at or above the week's preview rate. Change: below it. Stop: no previews at all."
      >
        <table>
          {d.repeatChangeStop.length ? (
            <>
              <thead>
                <tr>
                  <th>Platform and topic</th>
                  <th className={dk.num}>Visits</th>
                  <th className={dk.num}>Previews per 100</th>
                  <th className={dk.num}>Shares</th>
                  <th>Call</th>
                </tr>
              </thead>
              <tbody>
                {d.repeatChangeStop.map((r: Loose) => (
                  <tr key={r.item}>
                    <td>{r.item}</td>
                    <td className={dk.num}>{num(r.visits)}</td>
                    <td className={dk.num}>{num(r.previewsPer100)}</td>
                    <td className={dk.num}>{num(r.shares)}</td>
                    <td>
                      <Word tone={RCS[r.call][0]}>{RCS[r.call][1]}</Word>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td>No visits from tagged social posts this week.</td>
              </tr>
            </tbody>
          )}
        </table>
      </Section>

      <Section
        id="h-rank"
        title="Last month: paid reports per hour of effort"
        note="Enter your hours per market below; a market without hours cannot be ranked."
      >
        <table>
          {rank.length ? (
            <>
              <thead>
                <tr>
                  <th>Market</th>
                  <th className={dk.num}>Paid reports</th>
                  <th className={dk.num}>Hours</th>
                  <th className={dk.num}>Paid per hour</th>
                </tr>
              </thead>
              <tbody>
                {rank.map((r) => (
                  <tr key={r.market}>
                    <td>{names[r.market] ?? r.market}</td>
                    <td className={dk.num}>{num(r.paid)}</td>
                    <td className={dk.num}>{num(r.hours)}</td>
                    <td className={dk.num}>{num(r.perHour)}</td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td>No paid reports or hours recorded for last month.</td>
              </tr>
            </tbody>
          )}
        </table>
      </Section>
    </>
  );
}
