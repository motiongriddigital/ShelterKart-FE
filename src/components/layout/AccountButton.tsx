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
      title={t('Restore a purchase')}
      onClick={() => open('restoreModal')}
      className="hidden h-11 items-center gap-2 rounded-md border border-cream/30 px-3 text-base font-medium text-cream hover:bg-cream/10 sm:flex"
    >
      <User className="size-5" aria-hidden="true" />
      <span className="hidden xl:inline">{t('My purchases')}</span>
      <span className="sr-only xl:hidden">{t('Restore a purchase')}</span>
    </button>
  );
}
