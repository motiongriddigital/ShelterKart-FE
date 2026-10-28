import type { Metadata } from 'next';
import { DocPage } from '@/components/layout/DocPage';
import { BUSINESS } from '@/constants/business';
import { Placeholder } from '@/components/ui/Placeholder';

export const metadata: Metadata = {
  title: 'Refunds & Cancellation',
  description: 'When a ShelterKart report is refundable, how to ask, and how refunds are paid.',
};

export default function RefundsPage() {
  return (
    <DocPage slug="refunds" title="Refunds & Cancellation">
      <h2>When you get a full refund</h2>
      <p>
        Write to us within 7 days of paying, with your payment ID (it starts with <code>pay_</code>{' '}
        and is in Razorpay&apos;s receipt email), and we refund the full amount if:
      </p>
      <ul>
        <li>you were charged more than once for the same report;</li>
        <li>the report would not open, and we could not fix it within 2 business days;</li>
        <li>the report is about a different project from the one you searched for; or</li>
        <li>
          a finding in your report is shown to be wrong against the very source it cites, and we
          have not corrected it within 7 days.
        </li>
      </ul>
      <h2>When a refund is not available</h2>
      <p>
        The full report is delivered instantly and in full, so a report that opened correctly and is
        about the project you searched for is not refundable because you changed your mind, or
        because the public record contained less than you hoped. The free preview is there so you
        can see what the record holds before you pay.
      </p>
      <h2>Cancellation</h2>
      <p>
        Nothing is charged until a payment completes. You can close the payment window at any time
        before that. If a payment fails but money has left your account, your bank normally returns
        it automatically; if it has not appeared within 7 days, write to us with the payment ID.
      </p>
      <h2>How refunds are paid</h2>
      <p>
        We reply to every refund request within {BUSINESS.replyWithinBusinessDays} business days. An
        approved refund is sent to the original payment method within{' '}
        {BUSINESS.refundWithinBusinessDays} business days of approval; your bank may take a few more
        days to show it.
      </p>
      <p>
        Write to <Placeholder field="supportEmail" />.
      </p>
    </DocPage>
  );
}
