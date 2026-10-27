import { BUSINESS_FIELD_LABELS, getMissingBusinessFields } from '@/utils/business';
import styles from './DraftBanner.module.scss';

/** Shown on policy pages until every registered business detail has been supplied. */
export function DraftBanner() {
  const missing = getMissingBusinessFields();
  if (missing.length === 0) return null;

  return (
    <div className={styles.banner} role="note">
      <strong>Draft — not ready to publish.</strong> Missing from business details:{' '}
      {missing.map((f) => BUSINESS_FIELD_LABELS[f]).join(', ')}.
    </div>
  );
}
