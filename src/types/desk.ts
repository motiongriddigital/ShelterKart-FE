/* eslint-disable @typescript-eslint/no-explicit-any -- the marketing and social desks return large server-built
   payloads; only the fields the UI reads are named, the rest stay loose rather than half-typed. */
export type Loose = Record<string, any>;

/** Every desk call answers with this shape, success or not (the pages show `error` inline, never throw). */
export type DeskResponse<T = Loose> = T & {
  ok: boolean;
  error?: string;
  code?: string;
  status: number;
};

export type Market = { code: string; name: string };
export type Platform = 'X' | 'FB' | 'IG' | 'LI' | 'YT' | 'TT' | 'TH' | 'TG' | 'LN';
