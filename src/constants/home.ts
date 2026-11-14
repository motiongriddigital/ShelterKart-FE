import type { MarketCode } from '@/types/market';
import type { EvidenceNode, FooterColumn, NavLink } from '@/types/home';

// Copy and structure of the home page. English text is also the i18n key, so each string goes through t().

export const HEADER_LINKS: NavLink[] = [
  { label: 'How a report is built', href: '/methodology' },
  { label: 'Sample reports', href: '/#samples' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Buying guide', guide: true },
];

/** Shown in the phone menu and next to the account icon, for a buyer returning to a report they paid for. */
export const RESTORE_LINK: NavLink = { label: 'Restore a purchase', modal: 'restoreModal' };

/** The public registry behind each market, shown next to the country picker. */
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

/** The commitments shown around the document: first the top node, then left, then right. */
export const EVIDENCE_NODES: EvidenceNode[] = [
  { icon: 'source', label: 'Every claim traced to its source' },
  { icon: 'shield', label: 'Independent & unbiased' },
  { icon: 'open', label: 'Full transparency' },
];
