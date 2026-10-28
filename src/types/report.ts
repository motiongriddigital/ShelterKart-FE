import type { RawQuote } from './checkout';

export type SampleDossier = {
  id: string;
  title: string;
  place: string;
  city: string;
  country: string;
  home: string;
  ids: string[];
  pdf: string;
};

/** The product renderer's output for one report: HTML escaped at build time, mounted in a shadow root. */
export type DossierHtml = {
  preview: string;
  full: string;
  quotes: Record<string, RawQuote>;
  pricing: { depthLabel?: string };
};

export type ReportView =
  | { kind: 'none' }
  | { kind: 'investigating'; id: string }
  | { kind: 'preview'; id: string }
  | { kind: 'full'; id: string };
