import type { Metadata } from 'next';
import { DocPage } from '@/components/layout/DocPage';
import { TERMS_REVIEW_NOTE, TERMS_SECTIONS } from './data/terms';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply to using ShelterKart and buying a report.',
};

export default function TermsPage() {
  return (
    <DocPage slug="terms" title="Terms & Conditions">
      {TERMS_SECTIONS.map(({ title, body }, i) => (
        <section key={title}>
          <h4>
            {i + 1}. {title}
          </h4>
          <p>{body}</p>
        </section>
      ))}
      <p>
        <small>{TERMS_REVIEW_NOTE}</small>
      </p>
    </DocPage>
  );
}
