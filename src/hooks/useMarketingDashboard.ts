'use client';
import { useCallback, useEffect, useState } from 'react';
import { marketing } from '@/services/marketing';
import { useDeskAuth } from '@/hooks/useDeskAuth';
import type { DeskResponse, Loose } from '@/types/desk';
import { addDays } from '@/utils/marketingView';

type Saved = { ok: boolean; text: string } | null;

/** The marketing dashboard: one week at a time, plus the inputs that feed it (spend, effort, settings). */
export function useMarketingDashboard() {
  const auth = useDeskAuth();
  const [week, setWeek] = useState<string | null>(null);
  const [data, setData] = useState<Loose | null>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState<Saved>(null);

  const load = useCallback(
    async (w: string | null) => {
      const r = await marketing.dashboard(auth, w);
      if (!r.ok) return setError(r.error ?? 'Unknown error');
      setError('');
      setData(r);
      setWeek(r.week);
    },
    [auth],
  );

  useEffect(() => {
    load(null);
  }, [load]);

  const shift = (days: number) => week && load(addDays(week, days));

  /** Saves an input, says so, and reloads the week. */
  const save = useCallback(
    async (call: Promise<DeskResponse>, okText: string) => {
      const r = await call;
      setSaved({ ok: r.ok, text: r.ok ? okText : (r.error ?? 'That was not saved.') });
      if (r.ok) load(week);
    },
    [load, week],
  );

  return {
    data,
    error,
    week,
    saved,
    previous: () => shift(-7),
    next: () => shift(7),
    saveSpend: (f: Loose) =>
      save(
        marketing.spend(auth, {
          market: f.market,
          week: f.week,
          channel: f.channel,
          amount: Number(f.amount),
          currency: f.currency.toUpperCase(),
        }),
        'Spend saved.',
      ),
    saveCitation: (f: Loose) =>
      save(
        marketing.citation(auth, {
          month: f.month,
          market: f.market,
          query: f.query,
          engine: f.engine,
          cited: f.cited === 'true',
          where: f.where,
        }),
        'Check saved.',
      ),
    saveEffort: (f: Loose) =>
      save(
        marketing.effort(auth, { month: f.month, market: f.market, hours: Number(f.hours) }),
        'Hours saved.',
      ),
    saveSettings: (body: Loose, okText: string) => save(marketing.settings(auth, body), okText),
  };
}
