import type { Quote, RawQuote } from '@/types/checkout';

const LOCK_MINUTES = 30;

/** The demo quote for one country, from the sample's own price table (built by the real pricing engine). */
export function demoQuote(
  raw: RawQuote,
  iso: string,
  depthLabel?: string,
  now = Date.now(),
): Quote {
  return {
    ...raw,
    id: `demo-${iso}-${now}`,
    country: iso,
    issuedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + LOCK_MINUTES * 60000).toISOString(),
    depthLabel,
  };
}
