'use client';
import { useCallback, useEffect, useState } from 'react';
import { submitDeveloperReply, submitDispute } from '@/app/_api/research';
import { IS_DEMO } from '@/configs/env';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';
import { useReportStore } from '@/store/report';
import { failureMessage } from '@/utils/apiErrors';
import { isEmail } from '@/utils/validators';

type Result = { ok: boolean; text: string };

/** Report an inaccuracy against the report on screen. The text is kept on any failure so nothing is lost. */
export function useDisputeForm() {
  const t = useT();
  const ref = useReportStore((s) => s.ref);
  const close = useModalStore((s) => s.close);
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = useCallback(async () => {
    if (!ref)
      return setResult({
        ok: false,
        text: t('Open a report first, then report the specific inaccuracy from that report.'),
      });
    if (!note.trim()) return setResult({ ok: false, text: t('Please describe the issue.') });
    setBusy(true);
    try {
      if (!IS_DEMO) await submitDispute({ contact, note, reportRef: ref });
      setResult({
        ok: true,
        text: t('Thank you — this will be reviewed against the original source.'),
      });
      setNote('');
      setTimeout(close, 1800);
    } catch (e) {
      setResult({
        ok: false,
        text: `${failureMessage(e, t)} ${t('Your report has not been submitted. Your text is still here.')}`,
      });
    } finally {
      setBusy(false);
    }
  }, [ref, note, contact, t, close]);

  return { contact, setContact, note, setNote, result, busy, submit };
}

/** The developer's right of reply: free and unconditional; reviewed, then published beside the finding. */
export function useReplyForm() {
  const t = useT();
  const ref = useReportStore((s) => s.ref);
  const claim = useReportStore((s) => s.replyClaim);
  const isOpen = useModalStore((s) => s.openId === 'replyModal');
  const close = useModalStore((s) => s.close);
  const [finding, setFinding] = useState('');
  const [response, setResponse] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);

  // Each time the window opens, start from the finding that was quoted.
  useEffect(() => {
    if (!isOpen) return;
    setFinding(claim);
    setResponse('');
    setEmail('');
    setResult(null);
  }, [isOpen, claim]);

  const submit = useCallback(async () => {
    const payload = {
      reportRef: ref,
      findingText: finding.trim(),
      responseText: response.trim(),
      contactEmail: email.trim(),
    };
    if (!payload.findingText || !payload.responseText || !payload.contactEmail)
      return setResult({
        ok: false,
        text: t('Please fill in the finding, your response, and a contact email.'),
      });
    if (!isEmail(payload.contactEmail))
      return setResult({ ok: false, text: t('Please enter a valid email address.') });
    setBusy(true);
    try {
      if (!IS_DEMO) await submitDeveloperReply(payload);
      setResult({
        ok: true,
        text: t(
          'Submitted for review. Approved responses are published alongside the finding they respond to within 48 hours.',
        ),
      });
      setTimeout(close, 2200);
    } catch (e) {
      setResult({
        ok: false,
        text: `${failureMessage(e, t)} ${t('Your response has not been submitted. Your text is still here.')}`,
      });
    } finally {
      setBusy(false);
    }
  }, [ref, finding, response, email, t, close]);

  return { ref, finding, setFinding, response, setResponse, email, setEmail, result, busy, submit };
}
