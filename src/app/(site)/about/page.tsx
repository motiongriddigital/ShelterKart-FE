import type { Metadata } from 'next';
import Link from 'next/link';
import { DocPage } from '@/components/layout/DocPage';
import { Placeholder } from '@/components/ui/Placeholder';

export const metadata: Metadata = {
  title: 'About',
  description:
    'ShelterKart checks new and off-plan homes against the public record before you commit your savings.',
};

export default function AboutPage() {
  return (
    <DocPage slug="about" title="About">
      <p>
        ShelterKart checks new and off-plan homes against the public record before you commit your
        savings. Search any project or developer and ShelterKart reads regulators, company
        registers, exchange filings and the wider web, then shows every claim with where it came
        from and how well it is supported — confirmed at an official source, reported by several
        independent sites, or resting on a single source.
      </p>
      <p>
        Where sources disagree, both versions are shown side by side. Where the record is silent,
        you get the exact question to ask the sales, legal or CRM team. ShelterKart never tells you
        to buy or not to buy, and no developer can pay to change what it shows.
      </p>
      <h2>Who we are</h2>
      <p>
        ShelterKart is run by <Placeholder field="legalName" />,{' '}
        <Placeholder field="registeredAddress" />. See <Link href="/contact">Contact</Link>.
      </p>
    </DocPage>
  );
}
