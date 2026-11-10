'use client';
import { useCallback, useState } from 'react';
import { recoverAccess } from '@/services/research';
import { IS_DEMO } from '@/configs/env';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';
import { failureMessage } from '@/utils/apiErrors';
import { writeStored } from '@/utils/storage';
import { isPaymentId } from '@/utils/validators';

/** "Restore a purchase": exchange a Razorpay payment ID for access to the report, then open it. */
export function useRestore() {
  const t = useT();
  const close = useModalStore((s) => s.close);
  const [paymentId, setPaymentId] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = useCallback(async () => {
    const id = paymentId.trim();
    if (IS_DEMO) return setMessage(t('This preview is not connected to the live service.'));
    if (!isPaymentId(id))
      return setMessage(
        t(
          'That doesn’t look like a payment ID. It starts with pay_ and is in your Razorpay receipt email.',
        ),
      );
    setBusy(true);
    setMessage(t('Checking…'));
    try {
      const data = await recoverAccess(id);
      if (!data.ok) return setMessage(t('That payment could not be found.'));
      writeStored(`sk_access_${data.ref}`, data.token);
      setPaymentId('');
      setMessage('');
      close();
      window.location.href = `/r/${encodeURIComponent(data.ref)}`; // the live report page
    } catch (e) {
      setMessage(failureMessage(e, t));
    } finally {
      setBusy(false);
    }
  }, [paymentId, t, close]);

  return { paymentId, setPaymentId, message, busy, submit };
}
