'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowLeft, Mail, Pencil } from 'lucide-react';
import { DocumentMark } from '@/components/illustrations/DocumentMark';
import { Button } from '@/components/ui/Button';
import { VERIFY_COPY } from '@/constants/verify';
import { useT } from '@/hooks/useT';
import { useVerifyCodeForm } from '@/hooks/useVerifyCodeForm';
import { useSignIn } from '@/store/signIn';
import { CodeInput } from './CodeInput';
import { ResendRow } from './ResendRow';

/** The verify-code card: the code, a way to ask for a new one, and the button. It only checks the code for now. */
export function VerifyCard() {
  const t = useT();
  useEffect(() => {
    void useSignIn.persist.rehydrate(); // the email is kept in session storage, which only the browser can read
  }, []);
  const { email, code, setCode, codeLength, error, formError, busy, verify, resend, timer } =
    useVerifyCodeForm();

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-gold/50 px-4 py-1.5 text-base text-gold">
        <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
        {t(VERIFY_COPY.badge)}
      </p>

      <form
        noValidate
        onSubmit={verify}
        className="rounded-2xl border border-slate-200 border-t-2 border-t-gold bg-white p-6 shadow-lg md:p-8"
      >
        <DocumentMark size={48} className="mx-auto" />
        <h1 className="mt-3 text-center text-3xl font-semibold text-slate-900">
          {t(VERIFY_COPY.title)}
        </h1>
        <p className="mt-2 text-center text-base text-slate-700">
          {t(VERIFY_COPY.sub, { n: codeLength })}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-base">
          <span className="flex min-w-0 items-center gap-2 text-slate-900">
            <Mail className="size-5 shrink-0 text-gold" aria-hidden="true" />
            <span className="truncate font-semibold">{email ?? t(VERIFY_COPY.noEmail)}</span>
          </span>
          <Link
            href="/login"
            className="flex shrink-0 items-center gap-1 font-semibold text-blue-700 underline underline-offset-2"
          >
            {t(VERIFY_COPY.change)}
            <Pencil className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <p id="code-label" className="mt-6 text-center text-base font-semibold text-slate-900">
          {t(VERIFY_COPY.codeLabel, { n: codeLength })}
        </p>
        <div className="mt-3">
          <CodeInput
            length={codeLength}
            value={code}
            onChange={setCode}
            invalid={!!error}
            describedBy={error ? 'code-error' : undefined}
          />
        </div>
        {error && (
          <p id="code-error" role="alert" className="mt-3 text-center text-base text-rose-700">
            {error}
          </p>
        )}
        <p className="mt-3 text-center text-base text-slate-700">{t(VERIFY_COPY.once)}</p>

        <ResendRow left={timer.left} ready={timer.ready} onResend={resend} />

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
          {busy ? t(VERIFY_COPY.verifying) : t(VERIFY_COPY.submit)}
        </Button>
        <Link
          href="/login"
          className="mt-4 flex items-center justify-center gap-2 text-base font-semibold text-slate-800 hover:text-slate-900"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          {t(VERIFY_COPY.back)}
        </Link>
      </form>
    </div>
  );
}
