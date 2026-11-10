import { http, ApiError } from './http';
import { solveProofOfWork } from '@/utils/proofOfWork';
import type { PricingCountry } from '@/types/checkout';
import type { CandidateResult, Remembered, SearchMode } from '@/types/search';
import type {
  BriefResponse,
  CheckoutRequest,
  CheckoutResult,
  DeliveryContact,
  DocumentCheckRequest,
  DocumentCheckResult,
  QuoteRequest,
  RazorpayVerifyRequest,
  ResearchRequest,
  ServerQuote,
} from '@/types/research';

export type InvestigationRequest = {
  query: string;
  location: string;
  country: string;
  market: string;
};

type Challenge = { ok: boolean; token: string; bits: number };

export async function proofOfWork() {
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

/** The search mode the server runs: candidates are shown only when it says "on" (otherwise it matches in the shadow). */
export async function getSearchMode(): Promise<SearchMode> {
  try {
    const d = await http<{ mode?: SearchMode }>('/api/search/config', { timeoutMs: 8000 });
    return d.mode ?? 'shadow';
  } catch {
    return 'shadow';
  }
}

export const fetchCandidates = (body: {
  query: string;
  location: string;
  market: string;
  remember?: Remembered;
}) => http<CandidateResult>('/api/search/candidates', { method: 'POST', body, timeoutMs: 12000 });

/** A search that returns the brief directly. Solves the anti-bot check when the server asks for it. */
export async function runResearch(payload: ResearchRequest): Promise<BriefResponse> {
  const post = (pow?: object) =>
    http<BriefResponse>('/api/research', {
      method: 'POST',
      body: { ...payload, pow },
      timeoutMs: 60000,
    });
  try {
    return await post();
  } catch (e) {
    if (!isChallenge(e)) throw e;
    const pow = await proofOfWork();
    if (!pow) throw new Error('POW_FAILED');
    return post(pow);
  }
}

/** Opens a stored report. Pass the access token to get the full report instead of the preview. */
export const getReportByRef = (
  ref: string,
  opts: { token?: string; lang?: string; country?: string } = {},
) => {
  const q = new URLSearchParams();
  if (opts.lang) q.set('lang', opts.lang);
  if (opts.country) q.set('country', opts.country);
  const qs = q.size ? `?${q}` : '';
  return http<BriefResponse>(`/api/research/by-ref/${encodeURIComponent(ref)}${qs}`, {
    headers: opts.token ? { 'X-Report-Access': opts.token } : undefined,
    cache: 'no-store',
  });
};

/** A signed price locked for 30 minutes. The price is set by the server, never by the page. */
export const getQuote = (body: QuoteRequest) =>
  http<{ ok: boolean; quote: ServerQuote }>('/api/research/quote', { method: 'POST', body });

export const startCheckout = (body: CheckoutRequest) =>
  http<CheckoutResult>('/api/research/checkout', { method: 'POST', body, timeoutMs: 30000 });

export const verifyRazorpayPayment = (body: RazorpayVerifyRequest) =>
  http<{ ok: boolean; token: string }>('/api/research/razorpay/verify', { method: 'POST', body });

/** Exchanges a paid purchase for the report's access token (also the return step after a merchant checkout). */
export const getAccessToken = (body: { ref: string; purchaseId: string }) =>
  http<{ ok: boolean; token: string }>('/api/research/access', { method: 'POST', body });

export const checkDocument = (body: DocumentCheckRequest, token?: string) =>
  http<DocumentCheckResult>('/api/research/document-check', {
    method: 'POST',
    body,
    headers: token ? { 'X-Report-Access': token } : undefined,
    timeoutMs: 90000,
  });

/** Where the finished report should be delivered. */
export const saveDeliveryContact = (ref: string, body: DeliveryContact) =>
  http<{ ok: boolean }>(`/api/investigate/${encodeURIComponent(ref)}/contact`, {
    method: 'POST',
    body,
  });

export const getDeveloperReplies = (reportRef: string) =>
  http<{ responses: unknown[] }>(`/api/developer-response/${encodeURIComponent(reportRef)}`, {
    cache: 'no-store',
  });
