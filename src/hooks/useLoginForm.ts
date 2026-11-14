'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useState, type FormEvent } from 'react';
import { LOGIN_ERRORS, VERIFY_PATH } from '@/constants/auth';
import { useT } from '@/hooks/useT';
import { useSignIn } from '@/store/signIn';
import type { LoginErrors, LoginValues } from '@/types/login';
import { isEmail } from '@/utils/validators';

const EMPTY: LoginValues = { email: '', password: '', acceptedTerms: false };

function validate(v: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  if (!isEmail(v.email.trim())) errors.email = LOGIN_ERRORS.email;
  if (!v.password) errors.password = LOGIN_ERRORS.password;
  if (!v.acceptedTerms) errors.acceptedTerms = LOGIN_ERRORS.acceptedTerms;
  return errors;
}

/**
 * State and checks of the sign-in form. When the form is valid it keeps the email for the next step and opens the
 * verify page. The call to the sign-in service is added in `submit` (through services/auth) once the API exists.
 */
export function useLoginForm() {
  const t = useT();
  const router = useRouter();
  const setEmail = useSignIn((s) => s.setEmail);
  const [values, setValues] = useState<LoginValues>(EMPTY);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const set = useCallback(<K extends keyof LoginValues>(key: K, value: LoginValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined })); // a field's message goes away as soon as it is edited
  }, []);

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const found = validate(values);
      setErrors(found);
      const ok = Object.keys(found).length === 0;
      if (ok) {
        setEmail(values.email.trim());
        router.push(VERIFY_PATH);
      }
      return ok;
    },
    [values, setEmail, router],
  );

  const error = (key: keyof LoginValues) => (errors[key] ? t(errors[key]) : undefined);

  return {
    values,
    set,
    submit,
    error,
    showPassword,
    toggleShowPassword: () => setShowPassword((s) => !s),
  };
}
