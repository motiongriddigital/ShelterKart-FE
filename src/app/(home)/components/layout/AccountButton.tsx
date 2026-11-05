'use client';
import { User } from 'lucide-react';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';

/** Where a returning buyer gets a report back: reports are tied to the payment, not to an account. */
export function AccountButton() {
  const t = useT();
  const open = useModalStore((s) => s.open);
  return (
    <button
      type="button"
      aria-label={t('Restore a purchase')}
      title={t('Restore a purchase')}
      onClick={() => open('restoreModal')}
      className="hidden size-9 place-items-center rounded-full bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 hover:bg-slate-800 sm:grid"
    >
      <User className="size-4" aria-hidden="true" />
    </button>
  );
}
