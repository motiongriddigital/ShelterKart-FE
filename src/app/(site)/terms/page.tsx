import type { Metadata } from 'next';
import { DocPage } from '@/components/layout/DocPage';
import { TermsContent } from '@/components/content/TermsContent';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply to using ShelterKart and buying a report.',
};

export default function TermsPage() {
  return (
    <DocPage slug="terms" title="Terms & Conditions">
      <TermsContent />
    </DocPage>
  );
}
