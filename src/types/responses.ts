export type ResponseRole = 'developer' | 'named' | 'reader';
export type ResponseKind =
  'reply' | 'supply' | 'error' | 'missing' | 'grade' | 'outdated' | 'privacy' | 'legal';

export type ResponseSubmission = {
  reportRef: string;
  role: ResponseRole;
  kind: ResponseKind;
  findingId?: string;
  findingText?: string;
  body: string;
  evidenceUrls?: string[];
  senderName?: string;
  email: string;
  /** Honeypot: always sent empty. */
  website?: string;
};

export type ResponseSubmitted = { ok: boolean; publicRef: string; statusKey: string | null };

export type ResponseState =
  | 'awaiting_confirmation'
  | 'published'
  | 'in_review'
  | 'held'
  | 'needs_info'
  | 'corrected'
  | 'not_changed'
  | 'declined';

export type ResponseStatus = {
  ok: boolean;
  publicRef: string;
  kind: string;
  state: ResponseState;
  createdAt?: string;
  resolution?: string | null;
};

export type PublishedReply = {
  publicRef: string;
  kind: 'reply' | 'supply';
  findingId: string | null;
  findingText: string;
  body: string;
  /** True when the sender's e-mail domain matched the developer named in the report. */
  verified: boolean;
  publishedAt: string;
};

export type PublishedCorrection = {
  publicRef: string;
  findingId: string | null;
  findingText: string;
  note: string;
  correctedAt: string;
};

export type ReportResponses = {
  ok: boolean;
  replies: PublishedReply[];
  corrections: PublishedCorrection[];
  counts: { replies: number; corrections: number };
};
