import type { WireBlock } from '@/types/reportWireframe';

// The structure of a property report and the data each part needs. The wireframe page draws it, and the example
// response is built from it, so the two always agree. Field names match types/propertyReport.ts.
const TONES = ['green', 'blue', 'amber', 'violet', 'slate', 'red'];
const GROUPS = ['Legal', 'Accounts', 'Promoters', 'Sales', 'Engineering', 'Lawyer'];

export const WIRE_BLOCKS: WireBlock[] = [
  {
    id: 'meta',
    title: 'Top bar',
    where: 'The thin strip under the site header',
    columns: 1,
    fields: [
      { path: 'slug', kind: 'text', limit: 40 },
      { path: 'ref', kind: 'text', limit: 40 },
      { path: 'researchedTo', kind: 'text', limit: 20 },
    ],
  },
  {
    id: 'property',
    title: 'Title and summary',
    where: 'Top left of the page',
    columns: 1,
    fields: [
      { path: 'name', kind: 'text', limit: 60 },
      { path: 'address', kind: 'text', limit: 100 },
      { path: 'registration.id', kind: 'text', limit: 20 },
      { path: 'registration.registeredOn', kind: 'text', limit: 20 },
      { path: 'registration.jurisdiction', kind: 'text', limit: 40 },
      { path: 'headline', kind: 'text', limit: 120 },
      { path: 'summary', kind: 'text', limit: 200 },
    ],
  },
  {
    id: 'ledger',
    title: 'Key facts',
    where: 'Box on the top right',
    repeat: { path: 'ledger', show: 5, max: 5 },
    columns: 3,
    fields: [
      { path: 'label', kind: 'text', limit: 40 },
      { path: 'value', kind: 'text', limit: 40 },
      { path: 'highlight', kind: 'boolean' },
    ],
  },
  {
    id: 'stats',
    title: 'Number tiles',
    where: 'Row of tiles under the title',
    repeat: { path: 'stats', show: 3, max: 6 },
    columns: 3,
    fields: [
      { path: 'label', kind: 'text', limit: 30 },
      { path: 'value', kind: 'number' },
      { path: 'tone', kind: 'enum', options: TONES },
      { path: 'hint', kind: 'text', limit: 50 },
    ],
  },
  {
    id: 'discrepancies',
    title: 'Part 1 · Differences',
    where: 'Cards: what the seller says next to what the record says',
    repeat: { path: 'discrepancies', show: 3, max: 3 },
    columns: 3,
    fields: [
      { path: 'tag', kind: 'text', limit: 30 },
      { path: 'title', kind: 'text', limit: 70 },
      { path: 'claimed.title', kind: 'text', limit: 60 },
      { path: 'claimed.note', kind: 'text', limit: 100 },
      { path: 'claimed.label', kind: 'text', limit: 40 },
      { path: 'official.title', kind: 'text', limit: 60 },
      { path: 'official.note', kind: 'text', limit: 100 },
      { path: 'official.label', kind: 'text', limit: 40 },
      { path: 'footer.label', kind: 'text', limit: 30 },
      { path: 'footer.text', kind: 'text', limit: 140 },
    ],
  },
  {
    id: 'questions',
    title: 'Part 2 · Questions to ask',
    where: 'Cards in two columns',
    repeat: { path: 'questions', show: 2, max: 8 },
    columns: 2,
    fields: [
      { path: 'category', kind: 'text', limit: 30 },
      { path: 'question', kind: 'text', limit: 120 },
      { path: 'why', kind: 'text', limit: 140 },
      { path: 'good', kind: 'text', limit: 140 },
      { path: 'notClose', kind: 'text', limit: 100 },
    ],
  },
  {
    id: 'numbers',
    title: 'Part 3 · The numbers',
    where: 'Table title and the note under it',
    columns: 1,
    fields: [
      { path: 'numbers.title', kind: 'text', limit: 60 },
      { path: 'numbers.badge', kind: 'text', limit: 30 },
      { path: 'numbers.footnote', kind: 'text', limit: 120 },
    ],
  },
  {
    id: 'rows',
    title: 'Part 3 · Table rows',
    where: 'One row per home type (a card on phones)',
    repeat: { path: 'numbers.rows', show: 3, max: 6 },
    columns: 3,
    fields: [
      { path: 'typology', kind: 'text', limit: 20 },
      { path: 'area', kind: 'text', limit: 30 },
      { path: 'quoted', kind: 'text', limit: 20 },
      { path: 'effective', kind: 'text', limit: 30 },
      { path: 'benchmark', kind: 'text', limit: 30 },
      { path: 'variance', kind: 'text', limit: 20 },
    ],
  },
  {
    id: 'checklist',
    title: 'Part 4 · Checklist',
    where: 'List with topic tabs above it',
    repeat: { path: 'checklist.items', show: 2, max: 10 },
    columns: 2,
    fields: [
      { path: 'no', kind: 'number' },
      { path: 'group', kind: 'enum', options: GROUPS },
      { path: 'question', kind: 'text', limit: 100 },
      { path: 'direction', kind: 'text', limit: 100 },
      { path: 'status', kind: 'enum', options: ['Pending Response', 'Document in Hand'] },
    ],
  },
  {
    id: 'tabs',
    title: 'Part 4 · Topic tabs',
    where: 'Buttons above the checklist, with a count each',
    columns: 3,
    fields: [
      ...GROUPS.map((g) => ({ path: `checklist.groupCounts.${g}`, kind: 'number' as const })),
      { path: 'checklist.more', kind: 'number' },
    ],
  },
  {
    id: 'sources',
    title: 'Part 5 · Sources',
    where: 'Cards in a grid',
    repeat: { path: 'sources', show: 3, max: 8 },
    columns: 3,
    fields: [
      { path: 'authority', kind: 'text', limit: 50 },
      { path: 'document', kind: 'text', limit: 60 },
      { path: 'status.label', kind: 'text', limit: 40 },
      { path: 'status.tone', kind: 'enum', options: TONES },
      { path: 'note', kind: 'text', limit: 120 },
    ],
  },
];
