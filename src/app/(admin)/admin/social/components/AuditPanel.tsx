import type { Loose } from '@/types/desk';
import { utc } from '@/utils/social';
import { dk } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

export function AuditPanel({ audit }: { audit: Loose | null }) {
  return (
    <section aria-labelledby="h-audit">
      <h2 id="h-audit">Audit log</h2>
      {audit && (
        <p className={dk.muted}>
          {audit.verify.ok
            ? `The chain is intact: ${audit.verify.length} entries, none changed or removed.`
            : `The chain is BROKEN at entry ${audit.verify.brokenAt}.`}
        </p>
      )}
      <ul className={cn(dk.list, dk.audit)}>
        {[...(audit?.entries ?? [])]
          .slice(-15)
          .reverse()
          .map((e: Loose) => (
            <li key={e.seq}>
              <span className={dk.what}>
                <b>
                  #{e.seq} {e.kind}
                </b>{' '}
                <span className={dk.chip}>{utc(e.at)}</span>
                <small>{JSON.stringify(e.data).slice(0, 200)}</small>
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
}
