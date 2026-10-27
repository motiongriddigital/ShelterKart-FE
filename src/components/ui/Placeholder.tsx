import { BUSINESS_FIELD_LABELS, getBusinessField } from '@/utils/business';
import type { BusinessField } from '@/types/business';
import styles from './Placeholder.module.scss';

/** Renders a registered-business detail, or a visible to-do marker while it is still missing. */
export function Placeholder({ field }: { field: BusinessField }) {
  const value = getBusinessField(field).trim();
  if (value) return <>{value}</>;
  return <mark className={styles.todo}>[{BUSINESS_FIELD_LABELS[field]} — to be filled in]</mark>;
}
