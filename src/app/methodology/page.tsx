import type { Metadata } from 'next';
import { DocPage } from '@/components/layout/DocPage';

export const metadata: Metadata = {
  title: 'How a report is built',
  description:
    'Every finding links to the public page it came from and shows the date it was read.',
};

export default function MethodologyPage() {
  return (
    <DocPage slug="methodology" title="How a report is built">
      <p>
        A report is built from public sources. Every finding links to the page it came from and
        shows the date that page was read.
      </p>
      <h4>What every report answers</h4>
      <p>
        <strong>The developer.</strong> Its other projects, and what the public record says about
        them.
      </p>
      <p>
        <strong>The project.</strong> Registration, approvals, dates and progress, as the official
        sources state them.
      </p>
      <p>
        <strong>Legal standing.</strong> Any official register entry, court record or regulator
        action we can find.
      </p>
      <p>
        <strong>What buyers say.</strong> Themes that recur across independent reviews, forums and
        social media, shown as what people say, not as fact.
      </p>
      <p>
        <strong>What the developer discloses.</strong> The facts the developer publishes itself,
        marked as the developer’s own claim.
      </p>
      <h4>How each finding is marked</h4>
      <p>
        Each finding shows how well it is supported: confirmed at an official source, reported by
        several independent sites, resting on a single source, or the developer’s own claim. Where
        sources disagree, each version is shown side by side.
      </p>
      <h4>What we do not do</h4>
      <p>
        We do not fill a gap with a guess. What could not be found is said so plainly, with who to
        ask. We do not sum a project up in a number, and a report never says whether to buy.
      </p>
      <h4>The developer’s reply</h4>
      <p>
        Any developer may reply to any finding. The reply appears beside the finding and never
        replaces it.
      </p>
    </DocPage>
  );
}
