// Server-side origin of the Express API. Browser code uses relative /api/* (proxied by next.config).
export const API_ORIGIN = process.env.API_ORIGIN ?? 'http://localhost:4000';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shelterkart.com';
