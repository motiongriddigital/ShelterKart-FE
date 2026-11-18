// The parts of a property report, in reading order. The page and its "On this page" bar both read from here.
export const REPORT_SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'differences', label: 'Differences' },
  { id: 'questions', label: 'Questions to ask' },
  { id: 'numbers', label: 'The numbers' },
  { id: 'checklist', label: 'Full checklist' },
  { id: 'sources', label: 'Sources' },
] as const;

export type ReportSection = { id: string; label: string };
export type ReportSectionId = (typeof REPORT_SECTIONS)[number]['id'];

/** The parts of a report made from a research search. */
export const CUSTOM_REPORT_SECTIONS: readonly ReportSection[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'facts', label: 'Key facts' },
  { id: 'differences', label: 'Differences' },
  { id: 'questions', label: 'Questions to ask' },
  { id: 'pricing', label: 'Prices' },
];
