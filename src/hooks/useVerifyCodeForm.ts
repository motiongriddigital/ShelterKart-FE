'use client';
import { useCallback, useState, type FormEvent } from 'react';
import { CODE_LENGTH, VERIFY_ERRORS } from '@/constants/verify';
import { useT } from '@/hooks/useT';
import { isOneTimeCode } from '@/utils/validators';

/**
 * State and check of the verify-code form. It validates and stops there: the call to the verify service is added in
 * `submit` (through services/auth) once the page is wired to the API.
 */
export function useVerifyCodeForm() {
  const t = useT();
  const [code, setCodeState] = useState('');
  const [error, setError] = useState<string>();

  const setCode = useCallback((next: string) => {
    setCodeState(next.replace(/\D/g, '').slice(0, CODE_LENGTH));
    setError(undefined); // the message goes away as soon as the code is edited
  }, []);

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const ok = isOneTimeCode(code, CODE_LENGTH);
      setError(ok ? undefined : t(VERIFY_ERRORS.code));
      return ok;
    },
    [code, t],
  );

  return { code, setCode, error, submit };
}
