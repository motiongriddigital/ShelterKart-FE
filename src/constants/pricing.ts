import { FileSearch, Lock, Scale } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { EvidenceTier, GovernanceItem, PriceFactor, ScopeCard } from '@/types/pricing';

export const PRICING_INTRO =
  'Deterministic, evidence-indexed report fees. The same price for every buyer, wherever they are.';

export const SCOPE_CARDS: ScopeCard[] = [
  {
    eyebrow: 'Public gateway',
    badge: 'Free forever',
    title: 'Free Public Search & Preview',
    text: 'Searching is free, and every search shows a free preview: the project, the first findings, the topics sources disagree on, and what could not be found.',
    points: [
      '100% unrestricted indexed cadastral search',
      'Identification of public source discrepancies',
      'Summary catalogue of unverified titles',
    ],
  },
  {
    eyebrow: 'Evidentiary record',
    badge: 'One-time statutory unlock',
    title: 'Comprehensive Forensic Dossier',
    text: 'The full report adds every finding with its sources, what each disagreement actually says, the questions to ask and who to ask, the buyer’s protections, every page checked, and a check of your own documents against the report.',
    points: [
      'Full primary sources citation & official gazette records',
      'Tailored question dockets for developers & legal counsels',
      'Cross-examination of your agreement against verified filings',
    ],
    featured: true,
  },
];

export const PRICE_FACTORS: PriceFactor[] = [
  {
    code: 'Factor 01',
    badge: 'Midpoint benchmark',
    title: 'The Value of the Property',
    text: 'The price follows the midpoint of the project’s own listed prices: a report on a more expensive home costs more, but less as a share of the home’s price. Where no listed price is found, the report is priced as a typical purchase (about $161,017).',
  },
  {
    code: 'Factor 02',
    badge: 'Evidence weighting',
    title: 'The Depth of the Evidence',
    text: 'The fee adjusts according to public availability and archival documentation depth, across official municipal and state registries:',
  },
];

export const EVIDENCE_TIERS: EvidenceTier[] = [
  { label: 'Gold Standard', note: 'High confidence, including an official source', percent: 100 },
  { label: 'Heavy', note: 'Much of the evidence corroborated', percent: 80 },
  { label: 'Thin', note: 'A thin public record', percent: 60 },
];

export const FACTOR_FOOTNOTES = {
  value: { label: 'Relative share of home value', value: 'Decreases progressively' },
  evidence: 'ShelterKart decides this from the evidence; the buyer never chooses it.',
};

export const NEUTRALITY = {
  title: 'Absolute Guarantees of Neutrality',
  lead: 'The price never depends on whether the findings favor the developer.',
  text: 'Your country decides only the currency you pay in, the tax, and how you can pay. The price is read from a published list of round prices for your currency, so it does not move with daily exchange rates. When you unlock a report, your price is locked for 30 minutes. If your billing country turns out to be different, you see the new total and confirm it before anything is charged.',
};

export const BENCHMARK_VALUE = '$161,000';

export const GOVERNANCE: { icon: LucideIcon; item: GovernanceItem }[] = [
  {
    icon: FileSearch,
    item: {
      title: 'Transparent Itemization',
      text: 'The checkout always shows the report fee, the tax and the total as separate lines, with every jurisdictional charge shown as its own entry before final authorization.',
    },
  },
  {
    icon: Lock,
    item: {
      title: 'Guaranteed 30-Min Lock',
      text: 'Unlocking a report secures your price for 30 minutes, shielding buyers against exchange-rate movement or tariff revisions while they pay.',
    },
  },
  {
    icon: Scale,
    item: {
      title: 'Sovereign Tax Compliance',
      text: 'Prices include tax where ShelterKart collects it: in India, GST. Where ShelterKart is not registered for a country’s tax, no tax is charged, and the checkout says so.',
    },
  },
];
