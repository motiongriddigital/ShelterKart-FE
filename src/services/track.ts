import { IS_DEMO } from '@/configs/env';
import type { TrackEvent, TrackExtra } from '@/types/track';

/**
 * First-party visit statistics: no cookies, no IP stored (see the Privacy Policy). Fire-and-forget, and nothing is
 * sent in demo mode, where no backend is connected.
 */
export function track(event: TrackEvent, extra?: TrackExtra): void {
  if (IS_DEMO || typeof window === 'undefined') return;
  try {
    const p = new URLSearchParams(window.location.search);
    const body = JSON.stringify({
      event,
      lang: document.documentElement.lang,
      path: window.location.pathname,
      referrer: document.referrer || '',
      utm: {
        source: p.get('utm_source') ?? '',
        medium: p.get('utm_medium') ?? '',
        campaign: p.get('utm_campaign') ?? '',
      },
      ...extra,
    });
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* tracking must never break the page */
  }
}
