'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { social } from '@/services/social';
import { DESK_REFRESH_MS } from '@/constants/social';
import { useDeskAuth } from '@/hooks/useDeskAuth';
import type { Loose, Market } from '@/types/desk';

/** Status, the next-24-hours queue and the audit chain; refreshed every 30 seconds while the tab is visible. */
export function useSocialDesk(onMessage: (text: string, bad?: boolean) => void) {
  const auth = useDeskAuth();
  const [status, setStatus] = useState<Loose | null>(null);
  const [queue, setQueue] = useState<Loose[]>([]);
  const [audit, setAudit] = useState<Loose | null>(null);
  const [unavailable, setUnavailable] = useState('');
  const busy = useRef(false);

  const refresh = useCallback(async () => {
    const [s, q, a] = await Promise.all([
      social.status(auth),
      social.queue(auth),
      social.audit(auth),
    ]);
    if (!s.ok) {
      setUnavailable(
        s.status === 503
          ? (s.error ?? 'The desk is switched off.')
          : (s.error ?? 'Could not load the desk.'),
      );
      return;
    }
    setUnavailable('');
    setStatus(s);
    if (q.ok) setQueue(q.queue);
    if (a.ok) setAudit(a);
  }, [auth]);

  useEffect(() => {
    refresh();
    const id = setInterval(() => !document.hidden && !busy.current && refresh(), DESK_REFRESH_MS);
    return () => clearInterval(id);
  }, [refresh]);

  /** Runs a desk action, reports its outcome as a toast and reloads. */
  const act = useCallback(
    async (call: Promise<Loose>, okText: string) => {
      const r = await call;
      onMessage(r.ok ? okText : (r.error ?? 'That did not work.'), !r.ok);
      refresh();
      return r;
    },
    [onMessage, refresh],
  );

  const markets: Market[] = status?.marketList ?? [];
  const paused = !!status?.desk.pauses.some((p: Loose) => p.scope === 'global');

  return {
    auth,
    status,
    queue,
    audit,
    unavailable,
    markets,
    paused,
    refresh,
    setBusy: (b: boolean) => (busy.current = b),
    veto: (id: string) => act(social.veto(auth, id), 'Vetoed.'),
    togglePauseAll: () =>
      paused
        ? act(social.resume(auth, { scope: 'global' }), 'Posting resumed.')
        : confirm('Pause everything? Nothing will be published until you resume.')
          ? act(
              social.pause(auth, { scope: 'global', reason: 'paused from the desk' }),
              'Everything is paused.',
            )
          : undefined,
    resume: (p: Loose) => act(social.resume(auth, { scope: p.scope, key: p.key }), 'Resumed.'),
    pause: (scope: string, key: string, reason: string) =>
      act(
        social.pause(auth, {
          scope,
          key: scope === 'global' ? null : key,
          reason: reason || 'paused from the desk',
        }),
        'Paused.',
      ),
    reportIncident: (kind: string, key: string, detail: string) =>
      act(
        social.incident(auth, { kind, key: kind === 'security_alert' ? null : key, detail }),
        'Reported. What it affects is paused.',
      ),
  };
}
