'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useState, type FormEvent } from 'react';
import { AFTER_SIGN_IN_PATH } from '@/constants/auth';
import { VERIFY_ERRORS } from '@/constants/verify';
import { useResendTimer } from '@/hooks/useResendTimer';
import { useT } from '@/hooks/useT';
import { requestSignInCode, verifySignInCode } from '@/services/auth';
import { useSignIn } from '@/store/signIn';
import { failureMessage } from '@/utils/apiErrors';
import { isOneTimeCode } from '@/utils/validators';

/**
 * The verify-code form: the code, its check, and the two calls. `verify` checks the code, sends it with the email kept
 * at sign-in (service), stores the signed-in user (state) and goes on; `resend` asks for a new
 * code and restarts the countdown.
 */
export function useVerifyCodeForm() {
  const t = useT();
  const router = useRouter();
  const { email, acceptedTerms, next, codeLength, cooldownSeconds, signedIn, startVerification } =
    useSignIn();
  const timer = useResendTimer(cooldownSeconds);
  const [code, setCodeState] = useState('');
  const [error, setError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const setCode = useCallback(
    (next: string) => {
      setCodeState(next.replace(/\D/g, '').slice(0, codeLength));
      setError(undefined); // the message goes away as soon as the code is edited
      setFormError(undefined);
    },
    [codeLength],
  );

  const verify = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!isOneTimeCode(code, codeLength))
        return setError(t(VERIFY_ERRORS.code, { n: codeLength }));
      if (!email) return setFormError(t(VERIFY_ERRORS.noEmail));

      setBusy(true);
      setFormError(undefined);
      try {
        const res = await verifySignInCode(email, code, acceptedTerms);
        signedIn(res.user);
        router.push(next ?? AFTER_SIGN_IN_PATH);
      } catch (err) {
        setFormError(failureMessage(err, t));
      } finally {
        setBusy(false);
      }
    },
    [code, codeLength, email, acceptedTerms, next, signedIn, router, t],
  );

  const resend = useCallback(async () => {
    if (!email) return setFormError(t(VERIFY_ERRORS.noEmail));
    setFormError(undefined);
    try {
      const sent = await requestSignInCode({ email, termsAccepted: acceptedTerms });
      startVerification({
        email,
        acceptedTerms,
        next,
        codeLength: sent.codeLength,
        cooldownSeconds: sent.cooldownSeconds,
      });
      timer.restart(sent.cooldownSeconds);
      setCodeState('');
    } catch (err) {
      setFormError(failureMessage(err, t));
    }
  }, [email, acceptedTerms, next, startVerification, timer, t]);

  return { email, code, setCode, codeLength, error, formError, busy, verify, resend, timer };
}
