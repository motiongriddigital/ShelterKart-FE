import type { Metadata } from 'next';
import { DocPage } from '@/components/layout/DocPage';
import { PrivacyContent } from '@/components/content/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What ShelterKart collects, who processes it, how long it is kept, and your rights.',
};

export default function PrivacyPage() {
  return (
    <DocPage slug="privacy" title="Privacy Policy">
      <PrivacyContent />
    </DocPage>
  );
}
