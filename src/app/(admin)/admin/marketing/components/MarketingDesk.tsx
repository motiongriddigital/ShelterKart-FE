'use client';
import { useMarketingDashboard } from '@/hooks/useMarketingDashboard';
import { callsFor, dataGaps } from '@/utils/marketingView';
import { DeskShell } from '../../components/DeskShell';
import styles from '../../styles/desk.module.scss';
import { AnchorMarkets } from './AnchorMarkets';
import { InputsPanel } from './InputsPanel';
import { Tables } from './Tables';
import { Button } from '@/components/console/ui/button';

const PHASES = ['Phase 0, organic', 'Phase 1, reinvest', 'Phase 2, compound'];

export function MarketingDesk() {
  const m = useMarketingDashboard();
  const d = m.data;
  const gaps = d ? dataGaps(d) : [];
  const pause = d?.decisions.pause;

  return (
    <DeskShell
      title="Marketing dashboard"
      wide
      actions={
        <>
          <span className={styles.pill}>
            {d ? (PHASES[d.phase] ?? `Phase ${d.phase}`) : 'Phase 0'}
          </span>
          <Button
            variant="plain"
            className={styles.btn}
            onClick={m.previous}
            aria-label="Previous week"
          >
            Previous week
          </Button>
          <strong aria-live="polite">{d ? `Week of ${d.week}` : ''}</strong>
          <Button variant="plain" className={styles.btn} onClick={m.next} aria-label="Next week">
            Next week
          </Button>
        </>
      }
    >
      {m.error && (
        <div className={`${styles.banner} ${styles.bad}`} role="alert">
          <b>The dashboard could not load</b> {m.error}
        </div>
      )}
      {d && (
        <>
          {pause.triggered && (
            <div className={`${styles.banner} ${styles.bad}`} role="alert">
              Pause everything: {pause.reasons.join('; ')}. Pause related content and follow the
              crisis plan.
            </div>
          )}
          {gaps.length > 0 && (
            <p className={styles.muted}>
              {gaps.map((g) => (
                <span key={g}>
                  {g}
                  <br />
                </span>
              ))}
            </p>
          )}

          <section aria-labelledby="h-calls">
            <h2 id="h-calls">This week&apos;s calls</h2>
            <p className={styles.muted}>
              What the launch strategy&apos;s rules say to do now. A call says &quot;unknown&quot;
              when the data to decide does not exist yet, and why.
            </p>
            <ul className={styles.calls}>
              {callsFor(d).map((c) => (
                <li key={c.title}>
                  <span className={`${styles.word} ${styles[c.tone] ?? ''}`}>{c.word}</span>
                  <div>
                    <b>{c.title}</b>
                    <span>{c.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <AnchorMarkets data={d} />
          <Tables data={d} />
          <InputsPanel
            data={d}
            saved={m.saved}
            onSpend={m.saveSpend}
            onCitation={m.saveCitation}
            onEffort={m.saveEffort}
            onSettings={m.saveSettings}
          />
        </>
      )}
    </DeskShell>
  );
}
