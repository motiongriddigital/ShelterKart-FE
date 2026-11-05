'use client';
import { useEffect, useMemo, useState } from 'react';
import { platformName } from '@/constants/social';
import { useWeeklyPack } from '@/hooks/useWeeklyPack';
import { nextMondays } from '@/utils/social';
import { PostCard } from './PostCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/console/ui/input';
import { dk, tone as tones, type Tone } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

type Props = {
  nextWeek?: string;
  week: string;
  onWeek: (w: string) => void;
  onChanged: () => void;
  notify: (text: string, bad?: boolean) => void;
  setBusy: (b: boolean) => void;
};

const SHOWN_LIMIT = 60;

export function PackPanel({ nextWeek, week, onWeek, onChanged, notify, setBusy }: Props) {
  const weeks = useMemo(() => (nextWeek ? nextMondays(nextWeek) : []), [nextWeek]);
  useEffect(() => {
    if (!week && weeks.length) onWeek(weeks[0]);
  }, [week, weeks, onWeek]);
  const p = useWeeklyPack(week, onChanged, notify, setBusy);
  const [filter, setFilter] = useState('');
  const s = p.pack?.summary;
  const rest = (p.pack?.items ?? []).filter(
    (i: Record<string, string>) => !p.pack?.sampleIds.includes(i.id),
  );
  const q = filter.toLowerCase();
  const shown = rest
    .filter(
      (i: Record<string, string>) =>
        !q || `${i.marketName} ${platformName(i.platform)} ${i.lang}`.toLowerCase().includes(q),
    )
    .slice(0, SHOWN_LIMIT);

  return (
    <section aria-labelledby="h-pack">
      <h2 id="h-pack">The weekly pack</h2>
      <p className={dk.muted}>
        Plan a week, build its pack, read the posts marked below, then approve once. Anything held
        or blocked stays out.
      </p>
      <div className={dk.row}>
        <div className={dk.grow} style={{ flexBasis: 220 }}>
          <label htmlFor="week">Week starting (Monday)</label>
          <select id="week" value={week} onChange={(e) => onWeek(e.target.value)}>
            {weeks.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>
        <Button variant="plain" className={dk.btn} type="button" onClick={p.plan}>
          Plan this week
        </Button>
        <Button variant="plain" className={cn(dk.btn, dk.gold)} type="button" onClick={p.build}>
          Build the pack
        </Button>
      </div>
      <p className={dk.muted} role="status" aria-live="polite">
        {p.job}
      </p>

      {p.pack && s && (
        <div>
          <div className={dk.grid}>
            {(
              [
                [s.approvable, 'Ready to approve'],
                [s.held.length, 'Held for you'],
                [s.blocked.length, 'Blocked by the checker'],
                [s.waitingForMedia.length, 'Waiting for an image or video'],
                [s.gaps.length, 'Gaps in the facts'],
              ] as [number, string][]
            ).map(([n, l]) => (
              <div className={dk.kpi} key={l}>
                <div className={dk.kpiN}>{n}</div>
                <div className={dk.kpiL}>{l}</div>
              </div>
            ))}
          </div>

          {(
            [
              ['held', 'Held for you', 'warn'],
              ['blocked', 'Blocked', 'bad'],
            ] as const
          ).map(
            ([key, title, tone]) =>
              s[key].length > 0 && (
                <details className={dk.post} key={key}>
                  <summary>
                    <span className={dk.what}>
                      <b>
                        {title} ({s[key].length})
                      </b>
                    </span>
                  </summary>
                  <div className={dk.postBody}>
                    {s[key].map((x: Record<string, string | string[]>) => (
                      <div className={dk.meta} key={x.id as string}>
                        <b>
                          {x.market} · {platformName(x.platform as string)}
                        </b>{' '}
                        <span className={cn(dk.chip, tones[tone as Tone])}>{x.id}</span>
                        {(x.reasons as string[]).map((r) => (
                          <div key={r}>{r}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </details>
              ),
          )}
          {s.gaps.length > 0 && (
            <details className={dk.post}>
              <summary>
                <span className={dk.what}>
                  <b>Gaps in the facts ({s.gaps.length})</b>{' '}
                  <span className={cn(dk.chip, tones.warn)}>no post was written for these</span>
                </span>
              </summary>
              <div className={dk.postBody}>
                {s.gaps.map((g: Record<string, string>) => (
                  <div className={dk.meta} key={`${g.market}${g.platform}${g.reason}`}>
                    {g.market} · {platformName(g.platform)}: {g.reason.replace(/_/g, ' ')}
                  </div>
                ))}
              </div>
            </details>
          )}

          <h3 style={{ marginTop: 20 }}>Read these first ({p.sample.length})</h3>
          <p className={dk.muted}>
            One or two posts in every language and on every platform. Read each one in full,
            including the English back-translation. If a post is wrong in any way, tick “Leave this
            one out”. Some of them may contain a mistake that must not be approved.
          </p>
          {p.sample.map((it: Record<string, string>) => (
            <PostCard
              key={it.id}
              post={it}
              mustRead
              read={!!p.read[it.id]}
              removed={!!p.removed[it.id]}
              onRead={() => p.toggleRead(it.id)}
              onRemove={() => p.toggleRemoved(it.id)}
            />
          ))}

          <details className={dk.post}>
            <summary>
              <span className={dk.what}>
                <b>All other posts ({rest.length})</b>{' '}
                <span className={dk.chip}>open to read or leave any out</span>
              </span>
            </summary>
            <div className={dk.postBody}>
              <Input
                variant="plain"
                type="text"
                placeholder="Filter by market, platform or language"
                aria-label="Filter the posts"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              {shown.map((it: Record<string, string>) => (
                <PostCard
                  key={it.id}
                  post={it}
                  mustRead={false}
                  read={false}
                  removed={!!p.removed[it.id]}
                  onRead={() => {}}
                  onRemove={() => p.toggleRemoved(it.id)}
                />
              ))}
            </div>
          </details>

          <div className={dk.approve}>
            <h3>Approve</h3>
            <p className={dk.muted}>
              {p.readCount} of {p.needRead} sample posts read
            </p>
            <p>
              This approves <b>{p.approvable}</b> posts. Each goes out at its own time unless you
              veto it first.
            </p>
            <label htmlFor="pin">Approval PIN</label>
            <Input
              variant="plain"
              type="password"
              id="pin"
              autoComplete="off"
              inputMode="numeric"
              value={p.pin}
              onChange={(e) => p.setPin(e.target.value)}
            />
            <div className={dk.row} style={{ marginTop: 12 }}>
              <Button
                variant="plain"
                className={cn(dk.btn, dk.gold)}
                type="button"
                disabled={!p.canApprove}
                onClick={p.approve}
              >
                Approve the pack
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
