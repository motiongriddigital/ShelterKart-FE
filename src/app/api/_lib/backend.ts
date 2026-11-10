import 'server-only';
import type { NextRequest } from 'next/server';
import { API_ORIGIN } from '@/configs/env';

// The Next.js backend's only door to the real server. Route handlers forward through here, so the Express URL,
// timeouts and the error shape live in one place and never reach client code.
const DROP_REQUEST = [
  'host',
  'connection',
  'content-length',
  'transfer-encoding',
  'accept-encoding',
];
const DROP_RESPONSE = ['content-encoding', 'content-length', 'transfer-encoding', 'connection'];
const TIMEOUT_MS = 35_000;

function unavailable(status: number, error: string) {
  return Response.json({ ok: false, error }, { status });
}

/** Sends the request to the Express API at `path` (default: the same path) and relays status, body and headers. */
export async function proxy(req: NextRequest, path = req.nextUrl.pathname): Promise<Response> {
  if (decodeURIComponent(path).includes('..')) return unavailable(400, 'Bad request.');

  const headers = new Headers(req.headers);
  DROP_REQUEST.forEach((h) => headers.delete(h));
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ?? req.headers.get('x-real-ip');
  if (ip) headers.set('x-forwarded-for', ip);

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  try {
    const upstream = await fetch(`${API_ORIGIN}${path}${req.nextUrl.search}`, {
      method: req.method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const out = new Headers(upstream.headers);
    DROP_RESPONSE.forEach((h) => out.delete(h));
    return new Response(upstream.body, { status: upstream.status, headers: out });
  } catch (e) {
    const timedOut = (e as Error)?.name === 'TimeoutError';
    return unavailable(timedOut ? 504 : 502, 'The server could not be reached.');
  }
}

/** A route handler that forwards to the Express endpoint at the same path. */
export const forward = (req: NextRequest) => proxy(req);
