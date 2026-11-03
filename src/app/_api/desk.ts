import type { AdminAuth } from './admin';
import type { DeskResponse, Loose } from '@/types/desk';

/**
 * One call to a desk endpoint (/api/admin/social/*, /api/admin/marketing/*). Never throws: a failure comes back as
 * { ok: false, error, status } so a page can show it inline. Demo mode has no desk, so it says so.
 */
export async function deskCall<T = Loose>(
  auth: AdminAuth,
  method: 'GET' | 'POST',
  path: string,
  body?: unknown,
): Promise<DeskResponse<T>> {
  if (auth.mode === 'demo') {
    return {
      ok: false,
      status: 0,
      error: 'This page needs the live backend. Sign in with the admin credentials.',
    } as DeskResponse<T>;
  }
  try {
    const res = await fetch(path, {
      method,
      headers: {
        Authorization: auth.authHeader,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res
      .json()
      .catch(() => ({ ok: false, error: 'The server sent something unreadable.' }));
    return { ...json, status: res.status } as DeskResponse<T>;
  } catch {
    return { ok: false, status: 0, error: 'The desk could not be reached.' } as DeskResponse<T>;
  }
}
