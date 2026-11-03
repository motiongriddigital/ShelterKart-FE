import Image from 'next/image';
import Link from 'next/link';
import styles from './Masthead.module.scss';

export function Masthead() {
  return (
    <header className={styles.masthead}>
      <Link href="/" className={styles.brand} aria-label="ShelterKart home">
        {/* SVG lockup for dark surfaces; unoptimized because it is already vector */}
        <Image
          src="/logo/shelterkart-lockup-on-dark.svg"
          alt="ShelterKart"
          width={150}
          height={35}
          priority
          unoptimized
        />
      </Link>
    </header>
  );
}
