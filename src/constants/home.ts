import type { MarketCode } from '@/types/market';
import type { DocketClaim, FooterColumn, NavLink, Pillar, Stat } from '@/types/home';

// Copy and structure of the home page. English text is also the i18n key, so each string goes through t().

export const HEADER_LINKS: NavLink[] = [
  { label: 'Markets', href: '/#markets' },
  { label: 'Home Buying Guide', guide: true },
  { label: 'Sample Reports', href: '/#samples' },
  { label: 'Our Principles', modal: 'principlesModal' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Restore a purchase', modal: 'restoreModal' },
];

export const STANDARD_STRIP = {
  left: 'Est. 2026 · Public registry standard',
  framework: 'Statutory cross-verification framework v4.2',
  stamp: 'AUDIT_STAMP#SK-2026-EU-UK-IN',
};

export const PILLARS: Pillar[] = [
  {
    icon: 'scale',
    title: 'Independent & Unbiased',
    text: 'Zero developer sponsorship. Zero agent commission relationships.',
    tag: '100% buyer aligned',
  },
  {
    icon: 'seal',
    title: 'Certified Dossier',
    text: 'Registry standard ISO-27001. Cross-checked.',
    tag: 'Public ledger evidentiary',
    featured: true,
  },
  {
    icon: 'ledger',
    title: 'Full Transparency',
    text: 'Litigation filings, mortgage encumbrance, and zoning approvals disclosed.',
    tag: 'Zero redactions',
  },
];

export const TRACED_TO = 'Every claim traced to its statutory source';
export const TRACED_SOURCES = 'RERA · Land Registry · High Court Dockets';

/** The public registry behind each market, shown next to the coverage heading. */
export const MARKET_REGISTRY: Partial<Record<MarketCode, string>> = {
  uk: 'HM Land Registry',
  in: 'RERA',
  us: 'County Recorder',
  fr: 'Cadastre',
  ae: 'Dubai Land Department',
  au: 'State Land Titles',
  ca: 'Provincial Land Registry',
  de: 'Grundbuch',
  sg: 'SLA / URA',
  ie: 'Property Registration Authority',
};

export const DOCKET = {
  eyebrow: 'Inspection methodology',
  title: 'Marketing Claim vs. Official Docket',
  sub: 'How ShelterKart audits legal documents to illuminate critical variances before buyers execute deposits.',
  sample: 'Audit sample: Regency Crown Tower Phase II (Plot 188)',
  verdict: 'Critical variance identified',
  claimsTitle: 'Sales brochure / agent assertion',
  recordTitle: 'Public registry & RERA sanction',
  claims: [
    {
      label: 'Possession date',
      text: '“Ready by December 2026 — Guaranteed handover”',
    },
    {
      label: 'Land title & mortgage status',
      text: '“Clear title freehold, unencumbered land parcel”',
    },
    {
      label: 'Approved structural height',
      text: '“42 floors sanctioned with sky deck”',
    },
  ] satisfies DocketClaim[],
  record: [
    {
      label: 'RERA registered completion',
      text: 'June 2029 (18-month extension filed Oct 2025)',
      flag: 'bad',
      ref: 'Form 6, Sl. 4',
    },
    {
      label: 'Active bank charge',
      text: 'Mortgaged to State Infrastructure Fund for $42M',
      flag: 'bad',
      ref: 'RoC charge ID #88412',
    },
    {
      label: 'Municipal sanction',
      text: 'Approved only up to Floor 28; floors 29–42 pending NOC',
      flag: 'ok',
      ref: 'Commencement cert.',
    },
  ] satisfies DocketClaim[],
  footnote: 'All citations confirmed against Municipal Corporation docket #MC-9021B-B.',
  cta: 'View complete 34-page audit docket',
  ctaHref: '/report/hubtown-celeste',
};

export const PUBLIC_RECORD = {
  title: 'The public record, before you commit.',
  sub: 'Independent assessments of properties and the real estate developers behind them, with every claim traced to its public source.',
  primary: 'Initiate due diligence search',
  secondary: 'Review our independence code',
  stats: [
    { value: '100%', label: 'Developer independence' },
    { value: '36', label: 'Live global markets' },
    { value: '1,480,000+', label: 'Cross-verified dockets' },
    { value: '0', label: 'Sponsored endorsements' },
  ] satisfies Stat[],
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Verification scope',
    links: [
      { label: 'Coverage markets', href: '/#markets' },
      { label: 'Sample dossiers', href: '/#samples' },
      { label: 'How a report is built', href: '/methodology' },
      { label: 'How we grade evidence', href: '/evidence' },
      { label: 'Home Buying Guide', guide: true },
    ],
  },
  {
    title: 'Institutional standards',
    links: [
      { label: 'Our Principles', modal: 'principlesModal' },
      { label: 'Independence Policy', href: '/independence' },
      { label: 'Corrections & audit requests', href: '/corrections' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Refunds', href: '/refunds' },
    ],
  },
  {
    title: 'Account & legal',
    links: [
      { label: 'Restore a purchase', modal: 'restoreModal' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Terms & Conditions', modal: 'tncModal' },
      { label: 'Privacy Policy', modal: 'privacyModal' },
    ],
  },
];

export const INDEX_COUNT = '1.48M records';
