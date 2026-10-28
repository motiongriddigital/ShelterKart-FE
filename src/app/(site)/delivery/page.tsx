import type { Metadata } from 'next';
import Link from 'next/link';
import { DocPage } from '@/components/layout/DocPage';
import { Placeholder } from '@/components/ui/Placeholder';

export const metadata: Metadata = {
  title: 'Delivery',
  description:
    'ShelterKart sells digital research reports. The report appears on screen immediately after payment.',
};

export default function DeliveryPage() {
  return (
    <DocPage slug="delivery" title="Delivery">
      <p>ShelterKart sells digital research reports. Nothing is shipped.</p>
      <p>
        The full report appears on screen immediately after payment, in the browser where you paid.
        It stays available from its link for 30 days, and you can save it as a PDF at any time from
        the report itself. On another device, or after clearing your browser, use{' '}
        <em>Restore a purchase</em> on the site with the payment ID from your Razorpay receipt.
      </p>
      <p>
        If a report does not appear within a few minutes of a successful payment, write to{' '}
        <Placeholder field="supportEmail" /> with your payment ID; see our{' '}
        <Link href="/refunds">Refunds &amp; Cancellation</Link> policy.
      </p>
    </DocPage>
  );
}
