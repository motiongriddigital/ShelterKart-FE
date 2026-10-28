import type { Metadata } from 'next';
import { MethodologyContent } from '@/components/content/MethodologyContent';
import { DocPage } from '@/components/layout/DocPage';

export const metadata: Metadata = {
  title: 'How a report is built',
  description:
    'Every finding links to the public page it came from and shows the date it was read.',
};

export default function MethodologyPage() {
  return (
    <DocPage slug="methodology" title="How a report is built">
      <MethodologyContent />
    </DocPage>
  );
}
