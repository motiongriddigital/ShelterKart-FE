'use client';
import { useCallback, useEffect, useState } from 'react';
import { social } from '@/app/_api/social';
import { useDeskAuth } from '@/hooks/useDeskAuth';
import type { Loose } from '@/types/desk';

/** The knowledge keeper: add an official page, check each drafted fact, approve translations. */
export function useFactsDesk(onMessage: (text: string, bad?: boolean) => void) {
  const auth = useDeskAuth();
  const [summary, setSummary] = useState('Loading…');
  const [drafts, setDrafts] = useState<Loose[]>([]);
  const [translations, setTranslations] = useState<{ fact: Loose; lang: string }[]>([]);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    const [k, d, v] = await Promise.all([
      social.keeper(auth),
      social.kb(auth, 'draft'),
      social.kb(auth, 'verified'),
    ]);
    if (!k.ok) return;
    const draftItems: Loose[] = d.ok ? d.items : [];
    const verified: Loose[] = v.ok ? v.items : [];
    setSummary(
      `${k.verified} verified facts, ${draftItems.length} waiting for a check. ${
        k.autoVerify
          ? `Auto-verify is ON (writer and checker on different providers: ${k.providersDiffer === true ? 'yes' : 'not confirmed'}).`
          : 'Every fact needs your check: auto-verify is off.'
      }`,
    );
    setDrafts(draftItems.slice(0, 40));
    setTranslations(
      verified
        .flatMap((fact) =>
          Object.keys(fact.translations ?? {})
            .filter((l) => !fact.translations[l].approvedBy)
            .map((lang) => ({ fact, lang })),
        )
        .slice(0, 40),
    );
  }, [auth]);

  useEffect(() => {
    load();
  }, [load]);

  const addAddress = useCallback(
    async (market: string, topic: string, url: string) => {
      if (!url.trim()) return onMessage('Paste the address of an official page first.', true);
      setMessage('Adding the address…');
      const a = await social.addSeed(auth, market, topic, url.trim());
      if (!a.ok) {
        setMessage('');
        return onMessage(a.error ?? 'Could not add it.', true);
      }
      setMessage('Reading the page and drafting facts…');
      const r = await social.runKeeper(auth, market, topic);
      if (!r.ok) {
        setMessage('');
        return onMessage(r.error ?? 'Could not read it.', true);
      }
      const rep = r.result;
      const why = rep.sources
        .map((s: Loose) => (s.status === 'read' ? '' : s.status.replace(/_/g, ' ')))
        .filter(Boolean)
        .join(', ');
      setMessage(
        rep.created.length
          ? `Drafted ${rep.created.length} fact${rep.created.length > 1 ? 's' : ''} for you to check.`
          : `Nothing was drafted${rep.gap ? ` (${rep.gap.replace(/_/g, ' ')})` : ''}${why ? `: ${why}` : ''}.`,
      );
      load();
      return true;
    },
    [auth, onMessage, load],
  );

  const decide = useCallback(
    async (call: Promise<Loose>, okText: string) => {
      const r = await call;
      onMessage(r.ok ? okText : (r.error ?? 'That did not work.'), !r.ok);
      load();
    },
    [onMessage, load],
  );

  return {
    summary,
    drafts,
    translations,
    message,
    addAddress,
    verify: (id: string) => decide(social.verifyFact(auth, id), 'Verified.'),
    reject: (id: string) => decide(social.rejectFact(auth, id), 'Rejected.'),
    approveTranslation: (id: string, lang: string) => {
      const who = prompt('Your name, as the native-speaker reviewer:');
      if (who) decide(social.approveTranslation(auth, id, lang, who), 'Approved.');
    },
  };
}
