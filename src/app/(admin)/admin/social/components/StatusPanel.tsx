import type { Loose } from '@/types/desk';
import { dk, tone } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

type Props = { status: Loose | null; unavailable: string; paused: boolean };

export function StatusPanel({ status, unavailable, paused }: Props) {
  if (unavailable) return <div className={cn(dk.banner, tone.bad)}>{unavailable}</div>;
  if (!status) return null;
  const d = status.desk;
  const live = d.mode === 'live';
  const kpis: [string | number, string][] = [
    [`${d.bufferDays} d`, 'Approved and waiting ahead'],
    [d.approvedAhead, 'Posts approved ahead'],
    [d.byStatus.held || 0, 'Held for a person'],
    [d.pauses.length, 'Active pauses'],
    [d.audit.ok ? 'Intact' : 'BROKEN', 'Audit chain'],
    [d.rulesVersion.slice(0, 8), 'Rules version'],
    [`${status.kb.usableNextWeek}/${status.kb.markets}`, 'Markets with facts for next week'],
  ];
  return (
    <>
      {!d.audit.ok && (
        <div className={cn(dk.banner, tone.bad)}>
          <b>The audit log chain is broken.</b> Stop and investigate before approving anything.
        </div>
      )}
      {paused && (
        <div className={cn(dk.banner, tone.bad)}>
          <b>Everything is paused.</b> Nothing will be published until you resume.
        </div>
      )}
      {!live && (
        <div className={cn(dk.banner, tone.warn)}>
          The desk is in <b>dry-run mode</b>: approved posts are recorded but not sent. Live posting
          needs SOCIAL_PUBLISH=live and the platform keys.
        </div>
      )}
      {!status.renderer && (
        <div className={cn(dk.banner, tone.warn)}>
          Card images cannot be drawn yet (no image library is installed), so posts that need an
          image wait. Video posts wait for the video renderer, which is not built.
        </div>
      )}
      <section aria-labelledby="h-status">
        <h2 id="h-status">Today</h2>
        <p className={dk.muted}>
          Posts only go out if they were approved, are unchanged, passed the checker under
          today&apos;s rules, and nothing is paused.
        </p>
        <div className={dk.grid}>
          {kpis.map(([n, l]) => (
            <div className={dk.kpi} key={l}>
              <div className={dk.kpiN}>{n}</div>
              <div className={dk.kpiL}>{l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
