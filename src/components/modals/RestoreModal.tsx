'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal';
import { useRestore } from '@/hooks/useRestore';
import { useT } from '@/hooks/useT';

export function RestoreModal() {
  const t = useT();
  const r = useRestore();
  return (
    <Modal id="restoreModal" title={t('Restore a report you bought')}>
      <p className="text-sm leading-relaxed text-slate-600">
        {t(
          'On a new phone, or after clearing your browser? Enter the payment ID from your Razorpay receipt email. It starts with',
        )}{' '}
        <strong>pay_</strong>.
      </p>
      <Input
        className="mt-3"
        placeholder="pay_…"
        aria-label={t('Razorpay payment ID')}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={r.paymentId}
        onChange={(e) => r.setPaymentId(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && r.submit()}
      />
      <p role="status" className="mt-2 min-h-5 text-sm text-slate-600">
        {r.message}
      </p>
      <Button className="mt-3 w-full" disabled={r.busy} onClick={r.submit}>
        {t('Restore access')}
      </Button>
    </Modal>
  );
}
