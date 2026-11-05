export type PriceByValueRow = {
  value: string;
  approx: string;
  gold: string;
  heavy: string;
  thin: string;
};

export type PriceByCurrencyRow = {
  currency: string;
  code: string;
  typical: string;
  range: string;
};

export type ScopeCard = {
  eyebrow: string;
  badge: string;
  title: string;
  text: string;
  points: string[];
  featured?: boolean;
};

export type PriceFactor = {
  code: string;
  badge: string;
  title: string;
  text: string;
};

export type EvidenceTier = { label: string; note: string; percent: number };

export type GovernanceItem = { title: string; text: string };
