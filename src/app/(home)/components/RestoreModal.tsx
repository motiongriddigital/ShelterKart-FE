'use client';
import { Modal } from '@/components/ui/Modal';
import { useRestore } from '@/hooks/useRestore';
import { useT } from '@/hooks/useT';

export function RestoreModal() {
  const t = useT();
  const r = useRestore();
  return (
    <Modal id="restoreModal" title={t('Restore a report you bought')}>
      <p>
        {t(
          'On a new phone, or after clearing your browser? Enter the payment ID from your Razorpay receipt email. It starts with',
        )}{' '}
        <strong>pay_</strong>.
      </p>
      <input
        placeholder="pay_…"
        aria-label={t('Razorpay payment ID')}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={r.paymentId}
        onChange={(e) => r.setPaymentId(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && r.submit()}
      />
      <p role="status" className="modal-status">
        {r.message}
      </p>
      <button className="modal-submit" disabled={r.busy} onClick={r.submit}>
        {t('Restore access')}
      </button>
    </Modal>
  );
}
