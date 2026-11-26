import { http, ApiError } from './http';
import { proofOfWork } from './research';
import type {
  AuthSession,
  RequestCodeInput,
  RequestCodeResult,
  VerifyCodeResult,
} from '@/types/auth';

const isChallenge = (e: unknown) =>
  e instanceof ApiError && e.status === 428 && (e.body as { code?: string })?.code === 'challenge';

/** Asks for a sign-in code by e-mail; solves the anti-bot check when the server asks for it. */
export async function requestSignInCode(input: RequestCodeInput): Promise<RequestCodeResult> {
  const post = (pow?: object) =>
    http<RequestCodeResult>('/api/auth/request-code', {
      method: 'POST',
      body: { ...input, pow },
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

/** Sets the session cookie. `termsAccepted` is the terms box answer kept at sign-in. */
export const verifySignInCode = (email: string, code: string, termsAccepted: boolean) =>
  http<VerifyCodeResult>('/api/auth/verify-code', {
    method: 'POST',
    body: { email, code, termsAccepted },
  });

/** Is a reader signed in? Used before a search that needs an account. */
export const getAuthSession = () => http<AuthSession>('/api/auth/session');

export const signOut = () => http<{ ok: boolean }>('/api/auth/logout', { method: 'POST' });

export const signOutEverywhere = () =>
  http<{ ok: boolean }>('/api/auth/logout-all', { method: 'POST' });
