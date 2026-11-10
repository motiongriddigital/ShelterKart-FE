// Server-side origin of the Express API. Only the Next.js route handlers (app/api) call it; browser code calls /api/*.
export const API_ORIGIN = process.env.API_ORIGIN ?? 'http://localhost:4000';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shelterkart.com';

// With no live backend every report is a fictional sample, and the page says so. Set NEXT_PUBLIC_DEMO_MODE=false to go live.
export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';
