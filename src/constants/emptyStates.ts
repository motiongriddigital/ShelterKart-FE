// The "nothing here" pages. English text is also the i18n key. `label` is what a screen reader says for the drawing.
export const EMPTY_STATES = {
  notFound: {
    title: 'We cannot find that page',
    text: 'The link may be wrong, or the page may have moved. You can search for a property instead.',
    label: 'Drawing of a house with a question mark above it',
    action: { label: 'Back to search', href: '/#search' },
  },
  missingReport: {
    title: 'We could not find this report',
    text: 'A report is kept only in the tab where it was searched. Search for the property again to get it back.',
    label: 'Drawing of an empty report page with a magnifying glass',
    action: { label: 'Search for a property', href: '/#search' },
  },
  error: {
    title: 'Something went wrong',
    text: 'Nothing was lost. Please try again.',
    label: 'Drawing of a plug that has come out of its socket',
    action: { label: 'Try again' },
  },
} as const;

export type EmptyKind = keyof typeof EMPTY_STATES;

/** The drawing for a search that found nothing, shown inside the results list. */
export const NO_RESULTS_LABEL = 'Drawing of a magnifying glass over an empty list';
