import 'server-only';
import axios from 'axios';
import { Agent as HttpAgent } from 'node:http';
import { Agent as HttpsAgent } from 'node:https';
import { API_ORIGIN } from '@/configs/env';

/**
 * The one HTTP client for the real server (Express). It has the server's base URL, so callers give only a path
 * (`apiClient.post('/api/auth/request-code', body)`). Server-only: the Next.js route handlers in app/api use it, and
 * the browser never learns the server's address. Browser code calls our own /api routes through services/http.ts.
 */
export const apiClient = axios.create({
  baseURL: API_ORIGIN,
  timeout: 35_000,
  maxRedirects: 0,
  // A 4xx or 5xx from the server is an answer to relay as it is, not an exception.
  validateStatus: () => true,
  // Bytes in, bytes out: the proxy relays JSON, files and anything else untouched.
  responseType: 'arraybuffer',
  decompress: true,
  // `localhost` can be IPv4 or IPv6 depending on how the server was started; try both instead of only the first.
  httpAgent: new HttpAgent({ autoSelectFamily: true }),
  httpsAgent: new HttpsAgent({ autoSelectFamily: true }),
});
