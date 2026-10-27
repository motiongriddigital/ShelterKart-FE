import type { Metadata } from 'next';
import { DocPage } from '@/components/layout/DocPage';

export const metadata: Metadata = {
  title: 'Independence',
  description:
    'No developer can pay to add, change, or remove any finding in a ShelterKart report.',
};

export default function IndependencePage() {
  return (
    <DocPage slug="independence" title="Independence">
      <p>
        No developer can pay to add, change, or remove any finding, question, or part of a report.
      </p>
      <p>
        Every claim on a report traces to a specific public source, graded by how well it is
        supported: confirmed at an official source, reported by several independent sites, resting
        on a single source, or the developer’s own claim. We never present an unverified claim with
        the confidence of a verified one.
      </p>
      <p>
        Where we don’t have reliable public data, we say so plainly rather than filling the gap with
        a plausible-sounding guess.
      </p>
      <p>Payment unlocks the full findings and the source trail. It never changes a finding.</p>
      <p>
        ShelterKart is paid by buyers, for reports. A report’s price depends on the project’s listed
        price and the depth of the evidence; your country decides only the currency and the tax —
        never on whether the findings favor the developer.
      </p>
    </DocPage>
  );
}
