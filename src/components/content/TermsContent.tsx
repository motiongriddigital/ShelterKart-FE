import { TERMS_REVIEW_NOTE, TERMS_SECTIONS } from '@/constants/terms';

export function TermsContent() {
  return (
    <>
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
    </>
  );
}
