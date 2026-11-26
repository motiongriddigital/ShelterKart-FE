'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useState, type FormEvent } from 'react';
import { LOGIN_ERRORS, VERIFY_PATH } from '@/constants/auth';
import { useT } from '@/hooks/useT';
import { requestSignInCode } from '@/services/auth';
import { useSignIn } from '@/store/signIn';
import type { LoginErrors, LoginValues } from '@/types/login';
import { failureMessage } from '@/utils/apiErrors';
import { isEmail } from '@/utils/validators';

const EMPTY: LoginValues = { email: '', acceptedTerms: false };

function validate(v: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  if (!isEmail(v.email.trim())) errors.email = LOGIN_ERRORS.email;
  if (!v.acceptedTerms) errors.acceptedTerms = LOGIN_ERRORS.acceptedTerms;
  return errors;
}

/**
 * The sign-in form: its values, its checks, and the sign-in itself. `signIn` checks the form, asks the server for a
 * code (service), keeps what the verify step needs (state), then opens the verify page.
 */
export function useLoginForm(next?: string) {
  const t = useT();
  const router = useRouter();
  const startVerification = useSignIn((s) => s.startVerification);
  const [values, setValues] = useState<LoginValues>(EMPTY);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState<string>();
  const [busy, setBusy] = useState(false);

  const set = useCallback(<K extends keyof LoginValues>(key: K, value: LoginValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined })); // a field's message goes away as soon as it is edited
    setFormError(undefined);
  }, []);

  const signIn = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const found = validate(values);
      setErrors(found);
      if (Object.keys(found).length) return;

      const email = values.email.trim();
      setBusy(true);
      setFormError(undefined);
      try {
        const sent = await requestSignInCode({ email, termsAccepted: values.acceptedTerms });
        startVerification({
          email,
          acceptedTerms: values.acceptedTerms,
          next,
          codeLength: sent.codeLength,
          cooldownSeconds: sent.cooldownSeconds,
        });
        router.push(VERIFY_PATH);
      } catch (err) {
        setFormError(failureMessage(err, t));
      } finally {
        setBusy(false);
      }
    },
    [values, next, startVerification, router, t],
  );

  const error = (key: keyof LoginValues) => (errors[key] ? t(errors[key]) : undefined);

  return {
    values,
    set,
    signIn,
    error,
    formError,
    busy,
  };
}
