import type { Metadata } from 'next';
import { DocPage } from '@/components/layout/DocPage';
import { Placeholder } from '@/components/ui/Placeholder';
import { BUSINESS } from '@/constants/business';
import { ContactDetails } from './components/ContactDetails';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to reach ShelterKart for support, refunds, corrections and grievances.',
};

export default function ContactPage() {
  return (
    <DocPage slug="contact" title="Contact">
      <ContactDetails />
      <h2>Grievance Officer</h2>
      <p>
        <Placeholder field="grievanceOfficerName" />, {BUSINESS.grievanceOfficer.designation}
        <br />
        <Placeholder field="grievanceOfficerEmail" />
      </p>
      <p>We reply to every message within {BUSINESS.replyWithinBusinessDays} business days.</p>
    </DocPage>
  );
}
