import { Placeholder } from '@/components/ui/Placeholder';
import styles from './SiteFooter.module.scss';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Placeholder field="legalName" /> · ShelterKart
    </footer>
  );
}
