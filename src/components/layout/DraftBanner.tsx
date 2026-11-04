import { BUSINESS_FIELD_LABELS, getMissingBusinessFields } from '@/utils/business';

/** Shown on policy pages until every registered business detail has been supplied. */
export function DraftBanner() {
  const missing = getMissingBusinessFields();
  if (missing.length === 0) return null;

  return (
    <div
      className="mb-5 rounded-md border border-disputed bg-disputed-bg px-3.5 py-3 text-disputed"
      role="note"
    >
      <strong>Draft — not ready to publish.</strong> Missing from business details:{' '}
      {missing.map((f) => BUSINESS_FIELD_LABELS[f]).join(', ')}.
    </div>
  );
}
