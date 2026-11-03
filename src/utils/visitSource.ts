import { readStored, writeStored } from './storage';

// Where this visit came from: the UTM tags and referrer of its FIRST page, kept for as long as the tab is open and
// sent with a checkout so a paid report can be traced to its channel. In the EEA, the UK, Switzerland, or when the
// visitor's country is unknown, it is stored and sent only after the visitor agrees (/api/source-consent).
export type ConsentMode = 'notice' | 'required';
export type SourceChoice = 'granted' | 'declined';
export type VisitSource = {
  utm: { source: string; medium: string; campaign: string };
  referrer: string;
};

const CHOICE_KEY = 'sk_src_choice'; // localStorage: the visitor's yes or no
const SOURCE_KEY = 'sk_src'; // sessionStorage: read by the checkout page the backend serves

export const readSourceChoice = (): SourceChoice | null => {
  const v = readStored(CHOICE_KEY);
  return v === 'granted' || v === 'declined' ? v : null;
};

export const isSourceAllowed = (mode: ConsentMode, choice: SourceChoice | null) =>
  mode !== 'required' || choice === 'granted';

function firstPageSource(): VisitSource {
  const p = new URLSearchParams(window.location.search);
  return {
    utm: {
      source: p.get('utm_source') ?? '',
      medium: p.get('utm_medium') ?? '',
      campaign: p.get('utm_campaign') ?? '',
    },
    referrer: document.referrer || '',
  };
}

/** Captures the visit's source once; persists it only when keeping it is allowed. */
export function captureVisitSource(allowed: boolean): VisitSource {
  let src: VisitSource | null = null;
  try {
    const saved = window.sessionStorage.getItem(SOURCE_KEY);
    if (saved) src = JSON.parse(saved) as VisitSource;
  } catch {
    /* use this page's values */
  }
  src ??= firstPageSource();
  if (allowed) {
    try {
      window.sessionStorage.setItem(SOURCE_KEY, JSON.stringify(src));
    } catch {
      /* kept in memory only */
    }
  }
  return src;
}

export function recordSourceChoice(choice: SourceChoice): void {
  writeStored(CHOICE_KEY, choice);
  if (choice === 'granted') captureVisitSource(true);
  else {
    try {
      window.sessionStorage.removeItem(SOURCE_KEY);
    } catch {
      /* nothing was kept */
    }
  }
}
