import Link from 'next/link';
import styles from './Masthead.module.scss';

export function Masthead() {
  return (
    <header className={styles.masthead}>
      <Link href="/" className={styles.brand}>ShelterKart</Link>
    </header>
  );
}
