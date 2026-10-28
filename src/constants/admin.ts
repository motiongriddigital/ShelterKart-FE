export const COUNTRY: Record<string, string> = {
  IN: 'India',
  GB: 'United Kingdom',
  AE: 'United Arab Emirates',
  SG: 'Singapore',
  US: 'United States',
  AU: 'Australia',
  CA: 'Canada',
  FR: 'France',
  IE: 'Ireland',
  TW: 'Taiwan',
  unknown: 'Not provided by the network',
};
export const LANG_NAME: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  ar: 'Arabic',
  fr: 'French',
  pl: 'Polish',
  'zh-Hant': 'Chinese (Traditional)',
  es: 'Spanish',
  de: 'German',
};
export const AGENT_NAME: Record<string, string> = {
  research: 'Research',
  adviser: 'Adviser',
  documents: 'Document check',
  translate: 'Translation',
  verify: 'Meaning check',
};
export const TAX_LEVEL: Record<string, string> = {
  ok: 'Below 70%',
  watch: 'Watch: over 70%',
  alert: 'Alert: over 90%',
  reached: 'Reached: selling stopped until registered',
  registered: 'Registered: tax collected',
};
export const OFF_REASON: Record<string, string> = {
  registration_required: 'needs a tax registration first',
  registration_missing: 'needs its registration number configured',
  unverified: 'tax rule not yet confirmed by the tax adviser',
  no_payment_route: 'international payments not yet activated',
  threshold_reached: 'threshold reached: register to resume',
  no_tax_profile: 'no tax profile',
};
export const SENDER_CHECK: Record<string, string> = {
  match: 'Email domain matches the developer’s website',
  no_match: 'Email domain does NOT match the developer’s website — verify before approving',
  unknown: 'Developer website unknown — verify the sender another way',
};
export const PERIODS = [
  { value: '1', label: 'Today' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
  { value: '365', label: '12 months' },
];

export type Target = {
  key: string;
  label: string;
  why: string;
  fmt: 'pct' | 'num';
  target: number;
  better: 'higher' | 'lower';
};
// Starting points to revisit after the first months of real traffic.
export const TARGETS: Target[] = [
  {
    key: 'conv',
    label: 'Visitor → paid report',
    why: 'The whole business in one number.',
    fmt: 'pct',
    target: 0.02,
    better: 'higher',
  },
  {
    key: 'checkout',
    label: 'Unlock click → paid',
    why: 'Whether checkout loses people.',
    fmt: 'pct',
    target: 0.5,
    better: 'higher',
  },
  {
    key: 'answered',
    label: 'Searches answered',
    why: 'Reliability: a buyer who gets nothing does not come back.',
    fmt: 'pct',
    target: 0.97,
    better: 'higher',
  },
  {
    key: 'disputes',
    label: 'Open disputes per 100 paid reports',
    why: 'Accuracy, as buyers experience it.',
    fmt: 'num',
    target: 2,
    better: 'lower',
  },
  {
    key: 'pdf',
    label: 'PDFs saved per paid report',
    why: 'Whether buyers keep and use what they paid for.',
    fmt: 'pct',
    target: 0.6,
    better: 'higher',
  },
  {
    key: 'share',
    label: 'WhatsApp shares per paid report',
    why: 'The word-of-mouth loop.',
    fmt: 'pct',
    target: 0.2,
    better: 'higher',
  },
];
