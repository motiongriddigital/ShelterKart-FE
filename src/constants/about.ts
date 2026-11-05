import { Ban, Database, FileText, HelpCircle, History, Columns2, Wallet } from 'lucide-react';
import type { Assurance, Doctrine, HierarchyLevel } from '@/types/about';

export const ABOUT_MANDATE = [
  'ShelterKart checks new and off-plan homes against the public record before you commit your savings. Search any project or developer and ShelterKart reads regulators, company registers, exchange filings and the wider web, then shows every claim with where it came from and how well it is supported — confirmed at an official source, reported by several independent sites, or resting on a single source.',
  'Where sources disagree, both versions are shown side by side. Where the record is silent, you get the exact question to ask the sales, legal or CRM team. ShelterKart never tells you to buy or not to buy, and no developer can pay to change what it shows.',
];

export const HIERARCHY: HierarchyLevel[] = [
  { level: 'Level 1: Gazette & Title Deed', weight: '100% Weight' },
  { level: 'Level 2: RERA & Municipal Sanctions', weight: 'Statutory' },
  { level: 'Level 3: Banking & CERSAI Hypothecation', weight: 'Encumbrance' },
  { level: 'Level 4: Developer Marketing / Brochure', weight: 'Subject to Audit' },
];

export const DOCTRINES: Doctrine[] = [
  {
    code: 'Doctrine 01',
    title: 'Evidence Provenance',
    text: 'Every single claim is traced directly to primary statutory registers — MahaRERA, MCA, HM Land Registry, and municipal sanction books with exact gazette references.',
    tag: 'Immutable citations',
    icon: FileText,
  },
  {
    code: 'Doctrine 02',
    title: 'Dual-Record Reconciliation',
    text: 'Where sales brochures differ from municipal sanction filings, both versions are placed side by side. We highlight discrepancies without editorial softening.',
    tag: 'Side-by-side audit',
    icon: Columns2,
  },
  {
    code: 'Doctrine 03',
    title: 'Prescribed Inquiries',
    text: 'Where the official public record is silent or incomplete, we provide the exact forensic legal questions you must ask the promoter’s conveyancing desk before wiring earnest money.',
    tag: 'Forensic scripts',
    icon: HelpCircle,
  },
  {
    code: 'Doctrine 04',
    title: 'Commercial Quarantine',
    text: '100% funded by buyers. Zero real-estate developer or builder can pay to advertise, sponsor rankings, dispute factual entries in secret, or alter verified records.',
    tag: 'Zero sponsorship',
    icon: Ban,
  },
];

export const ASSURANCES: Assurance[] = [
  {
    eyebrow: 'Cross-check engine',
    title: 'Continuous Record Aggregation',
    text: 'We crawl and index court filings, state land administration gazettes, encumbrance certificates (ECs), and RERA project quarterly reports across 24 metropolitan zones every evening.',
    stat: { label: 'Data Sources Tracked', value: '1,490+ Jurisdictions' },
    icon: Database,
  },
  {
    eyebrow: 'Integrity guarantee',
    title: 'WORM Storage Vault',
    text: 'Every snapshot captured by our audit crawler is committed to Write-Once-Read-Many (WORM) storage. If a developer alters their floor plans or delivery dates on their portal, the historical diff is permanently logged.',
    stat: { label: 'Archival Authenticity', value: 'SHA-256 Checksums' },
    icon: History,
  },
  {
    eyebrow: 'Economic alignment',
    title: 'Buyer Subscriptions Only',
    text: 'Our sole commercial revenue comes from homebuyers purchasing certified property inspection dockets. We accept zero agency advertising fees, developer sponsorships, or real-estate lead sale payouts.',
    stat: { label: 'Broker Commissions', value: 'Zero Percent (0.00%)' },
    icon: Wallet,
  },
];
