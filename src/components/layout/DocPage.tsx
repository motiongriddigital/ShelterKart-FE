import type { ReactNode } from 'react';
import type { DocSlug } from '@/constants/navigation';
import { DraftBanner } from './DraftBanner';
import { DocNav } from './DocNav';
import styles from './DocPage.module.scss';

type Props = { slug: DocSlug; title: string; children: ReactNode };

/** Shared shell for the about/policy pages: draft banner, page nav, title, prose. */
export function DocPage({ slug, title, children }: Props) {
  return (
    <article className={`mx-auto max-w-[760px] px-5 pb-10 pt-7 text-ink md:pt-9 ${styles.prose}`}>
      <DraftBanner />
      <DocNav current={slug} />
      <h1>{title}</h1>
      {children}
    </article>
  );
}
