'use client';
import { ArrowRight, Eye, EyeOff, KeyRound, Mail } from 'lucide-react';
import { DocumentMark } from '@/components/illustrations/DocumentMark';
import { Button } from '@/components/ui/Button';
import { LOGIN_COPY } from '@/constants/auth';
import { useLoginForm } from '@/hooks/useLoginForm';
import { useT } from '@/hooks/useT';
import { AuthField } from './AuthField';
import { TermsCheckbox } from './TermsCheckbox';

/** The sign-in card: email, password, the terms box and the button. It only checks the form for now. */
export function LoginCard() {
  const t = useT();
  const { values, set, signIn, error, formError, busy, showPassword, toggleShowPassword } =
    useLoginForm();
  const ShowIcon = showPassword ? EyeOff : Eye;

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-gold/50 px-4 py-1.5 text-base text-gold">
        <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
        {t(LOGIN_COPY.badge)}
      </p>

      <form
        noValidate
        onSubmit={signIn}
        className="rounded-2xl border border-slate-200 border-t-2 border-t-gold bg-white p-6 shadow-lg md:p-8"
      >
        <DocumentMark size={48} className="mx-auto" />
        <h1 className="mt-3 text-center text-3xl font-semibold text-slate-900">
          {t(LOGIN_COPY.title)}
        </h1>
        <p className="mt-2 text-center text-base text-slate-700">{t(LOGIN_COPY.sub)}</p>

        <div className="mt-6 space-y-4">
          <AuthField
            id="email"
            type="email"
            label={t(LOGIN_COPY.email.label)}
            placeholder={LOGIN_COPY.email.placeholder}
            icon={<Mail className="size-5" aria-hidden="true" />}
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            error={error('email')}
          />
          <AuthField
            id="password"
            type={showPassword ? 'text' : 'password'}
            label={t(LOGIN_COPY.password.label)}
            placeholder={t(LOGIN_COPY.password.placeholder)}
            icon={<KeyRound className="size-5" aria-hidden="true" />}
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => set('password', e.target.value)}
            error={error('password')}
            action={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleShowPassword}
                aria-label={showPassword ? t('Hide password') : t('Show password')}
                aria-pressed={showPassword}
              >
                <ShowIcon aria-hidden="true" />
              </Button>
            }
          />
          <TermsCheckbox
            checked={values.acceptedTerms}
            onChange={(checked) => set('acceptedTerms', checked)}
            error={error('acceptedTerms')}
          />
        </div>

        {formError && (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-rose-600 bg-rose-50 px-4 py-3 text-base text-rose-700"
          >
            {formError}
          </p>
        )}

        <Button
          type="submit"
          variant="gold"
          size="lg"
          disabled={busy}
          className="mt-6 w-full text-base"
        >
          {busy ? t(LOGIN_COPY.submitting) : t(LOGIN_COPY.submit)}
          <ArrowRight aria-hidden="true" />
        </Button>
        <p className="mt-4 text-center text-base text-slate-700">{t(LOGIN_COPY.note)}</p>
      </form>
    </div>
  );
}
