import 'server-only';
import type { NextRequest } from 'next/server';
import { isAxiosError } from 'axios';
import { apiClient } from '@/utils/apiClient';

// The Next.js backend's only door to the real server. Route handlers forward through here, using the axios client in
// utils/apiClient.ts (which holds the server's base URL), so the URL, timeouts and the error shape live in one place
// and never reach client code.
const DROP_REQUEST = [
  'host',
  'connection',
  'content-length',
  'transfer-encoding',
  'accept-encoding',
];
const DROP_RESPONSE = ['content-encoding', 'content-length', 'transfer-encoding', 'connection'];

function unavailable(status: number, error: string) {
  return Response.json({ ok: false, error }, { status });
}

/** Sends the request to the Express API at `path` (default: the same path) and relays status, body and headers. */
export async function proxy(req: NextRequest, path = req.nextUrl.pathname): Promise<Response> {
  if (decodeURIComponent(path).includes('..')) return unavailable(400, 'Bad request.');

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    if (!DROP_REQUEST.includes(key)) headers[key] = value;
  });
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip');
  if (ip) headers['x-forwarded-for'] = ip;

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  try {
    const upstream = await apiClient.request<ArrayBuffer>({
      url: `${path}${req.nextUrl.search}`,
      method: req.method,
      headers,
      data: hasBody ? Buffer.from(await req.arrayBuffer()) : undefined,
    });
    const out = new Headers();
    for (const [key, value] of Object.entries(upstream.headers)) {
      if (DROP_RESPONSE.includes(key) || value == null) continue;
      // Several cookies arrive as a list; each one is its own header.
      if (Array.isArray(value)) value.forEach((v) => out.append(key, v));
      else out.set(key, String(value));
    }
    return new Response(upstream.data, { status: upstream.status, headers: out });
  } catch (e) {
    const timedOut = isAxiosError(e) && e.code === 'ECONNABORTED';
    return unavailable(timedOut ? 504 : 502, 'The server could not be reached.');
  }
}

/** A route handler that forwards to the Express endpoint at the same path. */
export const forward = (req: NextRequest) => proxy(req);
