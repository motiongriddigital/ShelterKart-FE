export type Tone = 'green' | 'blue' | 'amber' | 'violet' | 'slate' | 'red';

export type LedgerRow = { label: string; value: string; highlight?: boolean };
export type Stat = { label: string; value: number; tone: Tone; hint: string };

export type Claim = { label: string; title: string; note: string };
export type Discrepancy = {
  tag: string;
  code: string;
  title: string;
  claimed: Claim;
  official: Claim;
  footer: { label: string; text: string };
};

export type Question = {
  category: string;
  question: string;
  why: string;
  good: string;
  notClose: string;
};

export type PriceRow = {
  typology: string;
  area: string;
  quoted: string;
  effective: string;
  benchmark: string;
  variance: string;
};
export type StatutoryMath = {
  rule: string;
  title: string;
  intro: string;
  rows: { label: string; value: string; strong?: boolean }[];
  outro: string;
};

export type ChecklistGroup =
  'Legal' | 'Accounts' | 'Promoters' | 'Sales' | 'Engineering' | 'Lawyer';
export type ChecklistStatus = 'Pending Response' | 'Document in Hand';
export type ChecklistItem = {
  no: number;
  group: ChecklistGroup;
  question: string;
  direction: string;
  status: ChecklistStatus;
};

export type Source = {
  authority: string;
  document: string;
  status: { label: string; tone: Tone };
  note: string;
};

export type PropertyReport = {
  slug: string;
  ref: string;
  researchedTo: string;
  registration: { id: string; registeredOn: string; jurisdiction: string };
  name: string;
  address: string;
  headline: string;
  summary: string;
  ledger: LedgerRow[];
  stats: Stat[];
  discrepancies: Discrepancy[];
  questions: Question[];
  numbers: {
    title: string;
    badge: string;
    rows: PriceRow[];
    footnote: string;
    statutory: StatutoryMath;
  };
  checklist: {
    items: ChecklistItem[];
    groupCounts: Record<ChecklistGroup, number>;
    more: number;
  };
  sources: Source[];
};
