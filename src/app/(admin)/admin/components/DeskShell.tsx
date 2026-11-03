'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { RequireAdminSession } from '@/guards/RequireAdminSession';
import styles from '../styles/desk.module.scss';
import { LoginScreen } from './LoginScreen';

type Props = {
  title: string;
  wide?: boolean;
  actions?: ReactNode;
  toast?: { text: string; bad: boolean } | null;
  children: ReactNode;
};

/** Frame shared by the marketing and social desks: sign-in guard, top bar with navigation, toast. */
export function DeskShell({ title, wide, actions, toast, children }: Props) {
  return (
    <RequireAdminSession fallback={<LoginScreen />}>
      <div className={styles.desk}>
        <header className={styles.top}>
          <h1>{title}</h1>
          {actions}
          <span className={styles.spacer} />
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/marketing">Marketing numbers</Link>
          <Link href="/admin/social">Marketing desk</Link>
        </header>
        <main className={`${styles.wrap}${wide ? ` ${styles.wide}` : ''}`}>{children}</main>
        {toast && (
          <div
            className={`${styles.toast}${toast.bad ? ` ${styles.bad}` : ''}`}
            role="status"
            aria-live="polite"
          >
            {toast.text}
          </div>
        )}
      </div>
    </RequireAdminSession>
  );
}
