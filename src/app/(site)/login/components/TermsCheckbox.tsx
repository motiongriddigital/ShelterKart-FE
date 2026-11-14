'use client';
import { ActionLink } from '@/components/ui/ActionLink';
import { LOGIN_COPY } from '@/constants/auth';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';

type Props = { checked: boolean; onChange: (checked: boolean) => void; error?: string };

/** The one box to tick before signing in; the words "Terms and conditions" open the terms in a dialog. */
export function TermsCheckbox({ checked, onChange, error }: Props) {
  const t = useT();
  const open = useModalStore((s) => s.open);
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id="acceptedTerms"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'acceptedTerms-error' : undefined}
          className="mt-0.5 size-6 shrink-0 cursor-pointer accent-gold"
        />
        <label htmlFor="acceptedTerms" className="text-base text-slate-800">
          {t(LOGIN_COPY.terms.before)}{' '}
          <ActionLink
            className="cursor-pointer font-semibold text-blue-700 underline"
            onActivate={() => open('tncModal')}
          >
            {t(LOGIN_COPY.terms.link)}
          </ActionLink>
        </label>
      </div>
      {error && (
        <p id="acceptedTerms-error" role="alert" className="mt-1.5 text-base text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}
