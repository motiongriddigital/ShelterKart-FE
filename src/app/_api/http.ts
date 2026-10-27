import { API_ORIGIN } from '@/app/configs/env';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type NextOpts = { revalidate?: number | false; tags?: string[] };
type Options = Omit<RequestInit, 'body'> & { body?: unknown; next?: NextOpts; timeoutMs?: number };

// Server (RSC) calls the API origin directly; the browser uses same-origin /api/* via rewrites.
const base = () => (typeof window === 'undefined' ? API_ORIGIN : '');

export async function http<T>(path: string, { body, timeoutMs = 15000, headers, ...init }: Options = {}): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${base()}${path}`, {
      ...init,
      headers: { ...(body !== undefined && { 'Content-Type': 'application/json' }), ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: init.signal ?? ctrl.signal,
    });
    const data = await res.json().catch(() => undefined);
    if (!res.ok) throw new ApiError(res.status, data?.error ?? res.statusText, data);
    return data as T;
  } finally {
    clearTimeout(timer);
  }
}
