'use client';
import { useCallback, useMemo, useState } from 'react';
import { social } from '@/services/social';
import { JOB_POLL_MS } from '@/constants/social';
import { useDeskAuth } from '@/hooks/useDeskAuth';
import type { Loose } from '@/types/desk';

type Notify = (text: string, bad?: boolean) => void;

/** Plan a week, build its pack, read the sample, then approve once (PIN-gated, with posts left out as exceptions). */
export function useWeeklyPack(
  week: string,
  onChanged: () => void,
  notify: Notify,
  setBusy: (b: boolean) => void,
) {
  const auth = useDeskAuth();
  const [job, setJob] = useState('');
  const [pack, setPack] = useState<Loose | null>(null);
  const [read, setRead] = useState<Record<string, boolean>>({});
  const [removed, setRemoved] = useState<Record<string, boolean>>({});
  const [pin, setPin] = useState('');
  const [approving, setApproving] = useState(false);

  const poll = useCallback(
    async (name: string) => {
      const r = await social.jobs(auth);
      const j = (r.jobs ?? []).find((x: Loose) => x.name === name);
      if (!j) return;
      if (j.state === 'running') {
        setJob('Planning is running: drafting and checking 252 posts…');
        setTimeout(() => poll(name), JOB_POLL_MS);
      } else if (j.state === 'done') {
        setJob(
          `Planned: ${j.result.created} posts drafted${j.result.gaps.length ? `, ${j.result.gaps.length} gaps in the facts` : ''}. Now build the pack.`,
        );
        onChanged();
      } else {
        setJob(`Planning failed: ${j.error}`);
        notify(j.error, true);
      }
    },
    [auth, onChanged, notify],
  );

  const plan = useCallback(async () => {
    setJob('Starting…');
    const r = await social.plan(auth, week);
    if (!r.ok) {
      setJob('');
      return notify(r.error ?? 'Could not start planning.', true);
    }
    poll(`plan:${week}`);
  }, [auth, week, poll, notify]);

  const build = useCallback(async () => {
    const r = await social.buildPack(auth, week);
    if (!r.ok) return notify(r.error ?? 'Could not build the pack.', true);
    setPack(r.pack);
    setRead({});
    setRemoved({});
  }, [auth, week, notify]);

  const sample = useMemo(
    () => (pack ? pack.items.filter((i: Loose) => pack.sampleIds.includes(i.id)) : []),
    [pack],
  );
  const needRead = sample.filter((i: Loose) => !removed[i.id]);
  const readCount = needRead.filter((i: Loose) => read[i.id]).length;
  const leftOut = Object.keys(removed).filter((k) => removed[k]);
  const approvable = pack ? pack.items.length - leftOut.length : 0;
  const canApprove = !approving && readCount >= needRead.length;

  const approve = useCallback(async () => {
    if (!pack || approving) return;
    setApproving(true);
    setBusy(true);
    const r = await social.approvePack(auth, pack.id, leftOut, pin);
    setApproving(false);
    setBusy(false);
    if (r.ok) {
      notify(
        `Approved ${r.approved} posts${r.excluded ? `, left out ${r.excluded}` : ''}${r.stale?.length ? `, ${r.stale.length} were out of date and went back for a re-check` : ''}${r.late ? `, ${r.late} were too late and expired` : ''}.`,
      );
      setPack(null);
      setPin('');
      onChanged();
    } else {
      notify(r.error ?? 'Not approved.', true);
      if (r.code === 'canary_approved') {
        setPack(null);
        onChanged();
      }
    }
  }, [auth, pack, approving, leftOut, pin, onChanged, notify, setBusy]);

  return {
    job,
    pack,
    sample,
    read,
    removed,
    pin,
    setPin,
    plan,
    build,
    approve,
    readCount,
    needRead: needRead.length,
    approvable,
    canApprove,
    toggleRead: (id: string) => setRead((s) => ({ ...s, [id]: !s[id] })),
    toggleRemoved: (id: string) => setRemoved((s) => ({ ...s, [id]: !s[id] })),
  };
}
