import type { MarketCode } from '@/types/market';
import type { DocketClaim, FooterColumn, NavLink, Pillar, Stat, Step } from '@/types/home';

// Copy and structure of the home page. English text is also the i18n key, so each string goes through t().

export const HEADER_LINKS: NavLink[] = [
  { label: 'How it works', href: '/#how' },
  { label: 'Sample reports', href: '/#samples' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Buying guide', guide: true },
];

/** Shown in the phone menu and next to the account icon, for a buyer returning to a report they paid for. */
export const RESTORE_LINK: NavLink = { label: 'Restore a purchase', modal: 'restoreModal' };

export const PILLARS: Pillar[] = [
  {
    icon: 'scale',
    title: 'Independent of builders',
    text: 'We take no money from developers or agents. Buyers are the only ones who pay us.',
    tag: 'On the buyer’s side',
  },
  {
    icon: 'seal',
    title: 'The full report',
    text: 'Every fact is checked against official records and shown with where it came from.',
    tag: 'What you unlock',
    featured: true,
  },
  {
    icon: 'ledger',
    title: 'Nothing hidden',
    text: 'Court cases, loans on the property and building approvals are all shown.',
    tag: 'Plain and complete',
  },
];

export const TRACED_TO = 'Every fact comes from an official public record.';

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
  eyebrow: 'An example',
  title: 'What the brochure says, and what the records say',
  sub: 'An example of how we compare a seller’s promises with official records, before you pay a deposit.',
  sample: 'Example: Regency Crown Tower Phase II (Plot 188)',
  verdict: 'The records do not match the promises',
  claimsTitle: 'What the seller says',
  recordTitle: 'What official records show',
  claims: [
    {
      label: 'Possession date',
      text: '“Ready by December 2026 — Guaranteed handover”',
    },
    {
      label: 'Ownership and loans',
      text: '“Clear title freehold, unencumbered land parcel”',
    },
    {
      label: 'Approved number of floors',
      text: '“42 floors sanctioned with sky deck”',
    },
  ] satisfies DocketClaim[],
  record: [
    {
      label: 'Completion date on the RERA register',
      text: 'June 2029 (18-month extension filed Oct 2025)',
      flag: 'bad',
      ref: 'Form 6, Sl. 4',
    },
    {
      label: 'Loan secured on the land',
      text: 'Mortgaged to State Infrastructure Fund for $42M',
      flag: 'bad',
      ref: 'RoC charge ID #88412',
    },
    {
      label: 'City approval',
      text: 'Approved only up to Floor 28; floors 29–42 pending NOC',
      flag: 'ok',
      ref: 'Commencement cert.',
    },
  ] satisfies DocketClaim[],
  footnote: 'Every point above is checked against the city’s official file (#MC-9021B-B).',
  cta: 'Read the full 34-page sample report',
  ctaHref: '/report/hubtown-celeste',
};

export const PUBLIC_RECORD = {
  title: 'The public record, before you commit.',
  sub: 'Independent checks of properties and the builders behind them, with every fact traced to its public source.',
  primary: 'Check a property',
  secondary: 'How we stay independent',
  stats: [
    { value: '100%', label: 'Independent of builders' },
    { value: '36', label: 'Countries and regions' },
    { value: '1,480,000+', label: 'Records checked' },
    { value: '0', label: 'Paid endorsements' },
  ] satisfies Stat[],
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Countries we cover', href: '/#markets' },
      { label: 'Sample reports', href: '/#samples' },
      { label: 'How a report is built', href: '/methodology' },
      { label: 'How we grade evidence', href: '/evidence' },
      { label: 'Buying guide', guide: true },
    ],
  },
  {
    title: 'Our promises',
    links: [
      { label: 'Our Principles', modal: 'principlesModal' },
      { label: 'How we stay independent', href: '/independence' },
      { label: 'Report a mistake', href: '/corrections' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Refunds', href: '/refunds' },
    ],
  },
  {
    title: 'Help and legal',
    links: [
      { label: 'Restore a purchase', modal: 'restoreModal' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Terms & Conditions', modal: 'tncModal' },
      { label: 'Privacy Policy', modal: 'privacyModal' },
    ],
  },
];

export const HOW_IT_WORKS: Step[] = [
  {
    icon: 'search',
    title: 'Search',
    text: 'Type the name of a project or a builder. Searching is always free.',
  },
  {
    icon: 'preview',
    title: 'Read the free preview',
    text: 'See the first findings and the points where official records do not agree.',
  },
  {
    icon: 'unlock',
    title: 'Unlock the full report',
    text: 'Pay once to read every finding with its source. You see the price before you pay.',
  },
];
