'use client';
import { useCallback, useMemo, useState } from 'react';
import { DEMO_RECORDS } from '@/constants/demoRecords';
import { IS_DEMO } from '@/configs/env';
import { matchDemoRecords } from '@/utils/demoSearch';
import { findDossier } from '@/utils/dossiers';
import { startInvestigation } from '@/app/_api/research';
import { useT } from '@/hooks/useT';
import { MARKETS } from '@/constants/markets';
import { usePreferences } from '@/store/preferences';
import { failureMessage } from '@/utils/apiErrors';
import type { DemoHit, DemoRecord } from '@/types/search';

export type SearchView =
  | { mode: 'idle' }
  | { mode: 'empty' }
  | { mode: 'live'; message: string }
  | { mode: 'list'; hits: DemoHit[]; didYouMean?: string }
  | { mode: 'record'; record: DemoRecord; back: DemoHit[] | null };

// The search box state machine. In demo mode a search matches the illustrative records; live research and the
// sample reports arrive with the report flow (phase 3).
type Options = { onDossier?: (id: string) => void };

export function useSearch({ onDossier }: Options = {}) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<SearchView>({ mode: 'idle' });
  const [visible, setVisible] = useState(false);

  const showResults = useCallback((q: string) => {
    const hits = matchDemoRecords(q, DEMO_RECORDS);
    if (!hits.length) setView({ mode: 'empty' });
    else if (hits.length === 1) setView({ mode: 'record', record: hits[0].r, back: null });
    else setView({ mode: 'list', hits, didYouMean: hits[0].typo ? hits[0].r.name : undefined });
    setVisible(true);
  }, []);

  // Live mode: every search is a real investigation; the buyer is taken to its live page.
  const startLive = useCallback(
    async (q: string) => {
      const { market, city } = usePreferences.getState();
      const code = market.toUpperCase();
      const say = (message: string) => {
        setView({ mode: 'live', message });
        setVisible(true);
      };
      say(t('Starting the investigation. You will be taken to its live page.'));
      setBusy(true);
      try {
        const ref = await startInvestigation(
          {
            query: q,
            location: city,
            country: code === 'UK' ? 'GB' : code,
            market: MARKETS[market].label,
          },
          () => say(t('Checking that this search comes from a person. This takes a moment.')),
        );
        window.location.href = `/r/${encodeURIComponent(ref)}`;
      } catch (e) {
        const m = (e as Error).message;
        say(
          m === 'POW_FAILED'
            ? t('This search needs a short automatic check from your browser. Please try again.')
            : m === 'START_FAILED'
              ? t('The investigation could not start. Please try again.')
              : failureMessage(e, t),
        );
        setBusy(false);
      }
    },
    [t],
  );

  const submit = useCallback(
    (text?: string) => {
      const q = (text ?? query).trim();
      if (!q) return;
      if (text !== undefined) setQuery(text);
      if (!IS_DEMO) {
        if (!busy) startLive(q);
        return;
      }
      const dossier = findDossier(q);
      if (dossier && onDossier) {
        setVisible(false);
        onDossier(dossier.id);
        return;
      }
      showResults(q);
    },
    [query, showResults, onDossier, busy, startLive],
  );

  const pickDidYouMean = useCallback(
    (name: string) => {
      setQuery(name);
      showResults(name);
    },
    [showResults],
  );

  const showRecord = useCallback(
    (record: DemoRecord, back: DemoHit[]) => setView({ mode: 'record', record, back }),
    [],
  );

  const backToResults = useCallback(() => showResults(query.trim()), [query, showResults]);
  const hide = useCallback(() => setVisible(false), []);

  return useMemo(
    () => ({
      query,
      setQuery,
      view,
      visible,
      submit,
      pickDidYouMean,
      showRecord,
      backToResults,
      hide,
    }),
    [query, view, visible, submit, pickDidYouMean, showRecord, backToResults, hide],
  );
}
