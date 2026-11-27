'use client';
import { useCustomResearch } from '@/hooks/useCustomResearch';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEMO_RECORDS } from '@/constants/demoRecords';
import { IS_DEMO } from '@/configs/env';
import { matchDemoRecords } from '@/utils/demoSearch';
import { findDossier } from '@/utils/dossiers';
import { useT } from '@/hooks/useT';
import { usePendingSearch } from '@/store/pendingSearch';
import { getAuthSession } from '@/services/auth';
import { track } from '@/services/track';
import { RESUME_SEARCH_PATH, signInPath } from '@/constants/auth';
import type { DemoHit, DemoRecord } from '@/types/search';

export type SearchView =
  | { mode: 'idle' }
  | { mode: 'empty' }
  | { mode: 'live'; message: string }
  | { mode: 'list'; hits: DemoHit[]; didYouMean?: string }
  | { mode: 'record'; record: DemoRecord; back: DemoHit[] | null };

// The search box state machine. In demo mode a search matches the illustrative records; live, every search is a real
// research. A 401 `auth_required` saves the search, opens the sign-in page and runs it again on the way back.
type Options = { onDossier?: (id: string) => void };

export function useSearch({ onDossier }: Options = {}) {
  const t = useT();
  const router = useRouter();
  const research = useCustomResearch();
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

  // The search needs an account: keep what was typed, open the sign-in page, and come back to run it.
  const sendToSignIn = useCallback(
    (q: string) => {
      usePendingSearch.getState().remember({ query: q });
      track('signin_wall', { path: '/' });
      setView({
        mode: 'live',
        message: t('Please sign in to see your results. Your search is saved.'),
      });
      setVisible(true);
      router.push(signInPath(RESUME_SEARCH_PATH));
    },
    [t, router],
  );

  // Researches the property by name; the report page opens when the answer arrives.
  const runResearch = useCallback(
    async (q: string) => {
      setView({ mode: 'live', message: t('Researching this property. This takes a few seconds.') });
      setVisible(true);
      const problem = await research.search(q, () => sendToSignIn(q));
      if (problem) setView({ mode: 'live', message: problem });
    },
    [research, t, sendToSignIn],
  );

  // The search button. Live, it researches the typed name, after a sign-in if the reader has none.
  const submit = useCallback(
    async (text?: string) => {
      const q = (text ?? query).trim();
      if (!q) return;
      if (text !== undefined) setQuery(text);
      if (!IS_DEMO) {
        if (research.busy) return;
        // Signed out: go to sign-in now rather than start a search that would be refused. If the check itself fails,
        // the search starts and the server's 401 does the same.
        const session = await getAuthSession().catch(() => undefined);
        if (session && !session.authenticated) return sendToSignIn(q);
        return runResearch(q);
      }
      const dossier = findDossier(q);
      if (dossier && onDossier) {
        setVisible(false);
        onDossier(dossier.id);
        return;
      }
      showResults(q);
    },
    [query, showResults, onDossier, research.busy, runResearch, sendToSignIn],
  );

  // Back from signing in (sign-in is another layout, so the page loads afresh): the saved search runs again.
  useEffect(() => {
    if (IS_DEMO) return;
    usePendingSearch.persist.rehydrate();
    const url = new URL(window.location.href);
    if (url.searchParams.get('resume') !== 'search') return;
    window.history.replaceState(null, '', url.pathname);
    const saved = usePendingSearch.getState().take();
    if (!saved) return;
    setQuery(saved.query);
    runResearch(saved.query);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once, when the search box appears
  }, []);

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
      researching: research.busy,
      view,
      visible,
      submit,
      pickDidYouMean,
      showRecord,
      backToResults,
      hide,
    }),
    [query, research.busy, view, visible, submit, pickDidYouMean, showRecord, backToResults, hide],
  );
}
