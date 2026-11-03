export type DemoRecord = {
  name: string;
  developer: string;
  locality: string;
  city: string;
  country: string;
  flag: string;
  reg: string;
  status: string;
};

export type DemoHit = { r: DemoRecord; points: number; typoOnly: boolean; typo: boolean };

// ---- live search (backend/search): candidates before research ---------------------------------------------------
export type Candidate = {
  name: string;
  phase?: string;
  locality?: string;
  city?: string;
  developer?: string;
  registration?: string;
  score: number;
  why?: { code?: string; text?: string };
};

export type CandidateResult = {
  ok: boolean;
  confidence?: 'sure' | 'likely' | 'unsure';
  candidates: Candidate[];
  notFound?: { closest?: Candidate[] };
};

/** What the buyer remembers, to look again when nothing matched. */
export type Remembered = { developer: string; locality: string; year: string };
export type SearchMode = 'off' | 'shadow' | 'on';
