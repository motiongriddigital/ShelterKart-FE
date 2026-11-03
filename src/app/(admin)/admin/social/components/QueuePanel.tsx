import { platformName } from '@/constants/social';
import type { Loose } from '@/types/desk';
import styles from '../../styles/desk.module.scss';

type Props = { queue: Loose[]; onVeto: (id: string) => void };

export function QueuePanel({ queue, onVeto }: Props) {
  return (
    <section aria-labelledby="h-queue">
      <h2 id="h-queue">Going out in the next 24 hours</h2>
      <p className={styles.muted}>
        Times are the market&apos;s local time. Veto stops a post until the minute it publishes.
      </p>
      <ul className={styles.list}>
        {!queue.length && (
          <li>
            <span className="what">Nothing is scheduled in the next 24 hours.</span>
          </li>
        )}
        {queue.map((p) => {
          const where = `${platformName(p.platform)} post for ${p.marketName}`;
          return (
            <li key={p.id}>
              <span className="when">{p.localTime}</span>
              <span className="what">
                <b>{p.marketName}</b> · {platformName(p.platform)}{' '}
                <span className={styles.chip}>{p.lang}</span>
                <small dir="auto">
                  {(p.body || '').split('\n').filter(Boolean).slice(0, 2).join(' · ').slice(0, 140)}
                </small>
              </span>
              <button
                className={`${styles.btn} ${styles.small}`}
                type="button"
                aria-label={`Veto the ${where}`}
                onClick={() =>
                  confirm(`Veto this ${where}? It will not be published.`) && onVeto(p.id)
                }
              >
                Veto
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
