import type { Metadata } from 'next';
import Link from 'next/link';
import { DocPage } from '@/components/layout/DocPage';
import { BUSINESS } from '@/constants/business';

export const metadata: Metadata = {
  title: 'Corrections',
  description:
    'If something in a report is wrong, tell us. Every request is checked against the original source.',
};

export default function CorrectionsPage() {
  return (
    <DocPage slug="corrections" title="Corrections">
      <p>
        If something in a report is wrong, tell us. Every correction request is checked against the
        original source the finding cites.
      </p>
      <h2>How to report an error</h2>
      <p>
        Use <em>Report an inaccuracy</em> on any report, or write to {BUSINESS.correctionsEmail}{' '}
        with the report’s reference (it starts with SK-) and what is wrong.
      </p>
      <h2>What happens next</h2>
      <p>
        We reply within {BUSINESS.replyWithinBusinessDays} business days. If the source does not say
        what the report says, the finding is corrected or removed; if sources genuinely disagree,
        both versions are shown. Submitting a request does not by itself change a finding: the
        source decides. A paid finding that is shown to be wrong against its own source, and is not
        corrected within 7 days, is refunded under our <Link href="/refunds">refund policy</Link>.
      </p>
      <h2>Developers’ right of reply</h2>
      <p>
        Any developer can reply to a finding about it, free and unconditionally. Replies are
        reviewed and published alongside the finding they respond to, never in place of it. A reply
        cannot change a finding; a correction to the underlying source can.
      </p>
    </DocPage>
  );
}
