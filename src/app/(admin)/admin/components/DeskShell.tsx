'use client';
import type { ReactNode } from 'react';
import { PageHeader } from '@/components/console/PageHeader';
import { cn } from '@/utils/cn';
import { dk } from '../styles/ui';
import styles from '../styles/desk.module.scss';

type Props = {
  title: string;
  wide?: boolean;
  actions?: ReactNode;
  toast?: { text: string; bad: boolean } | null;
  children: ReactNode;
};

/** Frame shared by the marketing and social desks: page header, toast. The sign-in guard and navigation are the admin shell's. */
export function DeskShell({ title, wide, actions, toast, children }: Props) {
  return (
    <div className={styles.desk}>
      <PageHeader title={title}>{actions}</PageHeader>
      <main className={cn(dk.wrap, wide && dk.wrapWide)}>{children}</main>
      {toast && (
        <div className={cn(dk.toast, toast.bad && dk.toastBad)} role="status" aria-live="polite">
          {toast.text}
        </div>
      )}
    </div>
  );
}
