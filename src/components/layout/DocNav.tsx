import Link from 'next/link';
import { DOC_LINKS, type DocSlug } from '@/constants/navigation';
import styles from './DocNav.module.scss';

export function DocNav({ current }: { current: DocSlug }) {
  return (
    <nav className={styles.nav} aria-label="About and policies">
      <ul>
        {DOC_LINKS.map(({ slug, label }) => (
          <li key={slug}>
            {slug === current ? (
              <strong aria-current="page">{label}</strong>
            ) : (
              <Link href={`/${slug}`}>{label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
