import { platformName } from '@/constants/social';
import type { Loose } from '@/types/desk';
import styles from '../../styles/desk.module.scss';

type Props = {
  post: Loose;
  /** Sample posts must be read before the pack can be approved. */
  mustRead: boolean;
  read: boolean;
  removed: boolean;
  onRead: () => void;
  onRemove: () => void;
};

export function PostCard({ post: it, mustRead, read, removed, onRead, onRemove }: Props) {
  const state = removed
    ? ['Left out', 'bad']
    : mustRead
      ? read
        ? ['Read', 'ok']
        : ['Read me', 'warn']
      : ['Passed', 'ok'];
  return (
    <details className={styles.post}>
      <summary>
        <span className="when">
          {it.localDate.slice(5)} {it.localTime}
        </span>
        <span className="what">
          <b>{it.marketName}</b> · {platformName(it.platform)}{' '}
          <span className={styles.chip}>{it.lang}</span>
          {it.fellBackToEnglish && (
            <span className={`${styles.chip} ${styles.warn}`}> English fallback</span>
          )}
        </span>
        <span className={`${styles.chip} ${styles[state[1]]}`}>{state[0]}</span>
      </summary>
      <div className={styles.postBody}>
        {it.title && (
          <div className={styles.meta}>
            <b>Title:</b> <span dir="auto">{it.title}</span>
          </div>
        )}
        <div className={styles.text} dir="auto">
          {it.body}
        </div>
        {it.hashtags?.length > 0 && (
          <div className={styles.meta}>
            <b>Hashtags:</b> <span dir="auto">{it.hashtags.join(' ')}</span>
          </div>
        )}
        {it.claims.map((c: Loose) => (
          <div className={styles.meta} key={c.sourceUrl}>
            <b>{c.type}:</b> source{' '}
            <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer">
              {c.sourceUrl}
            </a>
            , checked {c.checkedOn}
          </div>
        ))}
        {it.backtranslationEn && (
          <>
            <div className={styles.meta}>
              <b>What this says in English:</b>
            </div>
            <div className={styles.text}>{it.backtranslationEn}</div>
          </>
        )}
        {it.media.map((m: Loose, i: number) => (
          <div key={i}>
            <div className={styles.meta}>
              <b>{m.kind} card says:</b>{' '}
              <span dir="auto">{(m.text || '').replace(/\n/g, ' · ')}</span>
            </div>
            <div className={styles.meta}>
              <b>Alt text:</b> <span dir="auto">{m.alt}</span>
            </div>
          </div>
        ))}
        <div className={styles.controls}>
          {mustRead && (
            <label>
              <input
                type="checkbox"
                aria-label="I have read this post"
                checked={read}
                onChange={onRead}
              />
              I have read this
            </label>
          )}
          <label>
            <input
              type="checkbox"
              aria-label="Leave this post out of the approval"
              checked={removed}
              onChange={onRemove}
            />
            Leave this one out
          </label>
        </div>
      </div>
    </details>
  );
}
