import { http, ApiError } from './http';
import { solveProofOfWork } from '@/utils/proofOfWork';
import type { PricingCountry } from '@/types/checkout';

export type InvestigationRequest = {
  query: string;
  location: string;
  country: string;
  market: string;
};

type Challenge = { ok: boolean; token: string; bits: number };

async function proofOfWork() {
  try {
    const c = await http<Challenge>('/api/research/challenge', { cache: 'no-store' });
    if (!c.ok) return null;
    const solution = await solveProofOfWork(c.token, c.bits);
    return solution == null ? null : { token: c.token, solution };
  } catch {
    return null;
  }
}

const isChallenge = (e: unknown) =>
  e instanceof ApiError &&
  e.status === 428 &&
  (e.body as { code?: string } | undefined)?.code === 'challenge';

/** Starts a server-side investigation and returns its reference; solves the anti-bot check when asked. */
export async function startInvestigation(
  payload: InvestigationRequest,
  onChallenge?: () => void,
): Promise<string> {
  const post = (body: object) =>
    http<{ ok: boolean; ref?: string }>('/api/investigate', {
      method: 'POST',
      body,
      timeoutMs: 30000,
    });
  let data;
  try {
    data = await post(payload);
  } catch (e) {
    if (!isChallenge(e)) throw e;
    onChallenge?.();
    const pow = await proofOfWork();
    if (!pow) throw new Error('POW_FAILED');
    data = await post({ ...payload, pow });
  }
  if (!data.ok || !data.ref) throw new Error('START_FAILED');
  return data.ref;
}

export const recoverAccess = (paymentId: string) =>
  http<{ ok: boolean; ref: string; token: string }>('/api/research/recover', {
    method: 'POST',
    body: { paymentId },
    timeoutMs: 20000,
  });

export const submitDispute = (body: { contact: string; note: string; reportRef: string }) =>
  http<unknown>('/api/dispute', { method: 'POST', body, timeoutMs: 12000 });

export const submitDeveloperReply = (body: {
  reportRef: string;
  findingText: string;
  responseText: string;
  contactEmail: string;
}) => http<unknown>('/api/developer-response', { method: 'POST', body, timeoutMs: 12000 });

export const getPricingCountries = () =>
  http<{ ok: boolean; countries: PricingCountry[]; network?: string }>('/api/pricing/countries', {
    timeoutMs: 8000,
  });
