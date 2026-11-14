'use client';
import { VERIFY_COPY } from '@/constants/verify';
import { useT } from '@/hooks/useT';
import { formatClock } from '@/utils/format';

type Props = { left: number; ready: boolean; onResend: () => void };

/** "Did not get the code?": a countdown, then a button to ask for a new one. */
export function ResendRow({ left, ready, onResend }: Props) {
  const t = useT();
  return (
    <p className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-lg bg-slate-50 px-4 py-3 text-base text-slate-800">
      <span>{t(VERIFY_COPY.resendQuestion)}</span>
      {ready ? (
        <button
          type="button"
          onClick={onResend}
          className="font-semibold text-blue-700 underline underline-offset-2"
        >
          {t(VERIFY_COPY.resendNow)}
        </button>
      ) : (
        <span aria-live="polite">
          {t(VERIFY_COPY.resendWait)}{' '}
          <strong className="tabular-nums text-slate-900">{formatClock(left)}</strong>
        </span>
      )}
    </p>
  );
}
