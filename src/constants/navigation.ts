export type DocLink = { slug: string; label: string };

// Order matches the legacy page nav. "How we grade evidence" joins once /evidence is built.
export const DOC_LINKS: DocLink[] = [
  { slug: 'about', label: 'About' },
  { slug: 'methodology', label: 'How a report is built' },
  { slug: 'corrections', label: 'Corrections' },
  { slug: 'independence', label: 'Independence' },
  { slug: 'pricing', label: 'Pricing' },
  { slug: 'refunds', label: 'Refunds & Cancellation' },
  { slug: 'delivery', label: 'Delivery' },
  { slug: 'contact', label: 'Contact' },
  { slug: 'terms', label: 'Terms & Conditions' },
  { slug: 'privacy', label: 'Privacy Policy' },
];

export type DocSlug = (typeof DOC_LINKS)[number]['slug'];
