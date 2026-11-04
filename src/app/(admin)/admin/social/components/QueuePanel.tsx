import { platformName } from '@/constants/social';
import type { Loose } from '@/types/desk';
import { Button } from '@/components/console/ui/button';
import { dk } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

type Props = { queue: Loose[]; onVeto: (id: string) => void };

export function QueuePanel({ queue, onVeto }: Props) {
  return (
    <section aria-labelledby="h-queue">
      <h2 id="h-queue">Going out in the next 24 hours</h2>
      <p className={dk.muted}>
        Times are the market&apos;s local time. Veto stops a post until the minute it publishes.
      </p>
      <ul className={dk.list}>
        {!queue.length && (
          <li>
            <span className={dk.what}>Nothing is scheduled in the next 24 hours.</span>
          </li>
        )}
        {queue.map((p) => {
          const where = `${platformName(p.platform)} post for ${p.marketName}`;
          return (
            <li key={p.id}>
              <span className={dk.when}>{p.localTime}</span>
              <span className={dk.what}>
                <b>{p.marketName}</b> · {platformName(p.platform)}{' '}
                <span className={dk.chip}>{p.lang}</span>
                <small dir="auto">
                  {(p.body || '').split('\n').filter(Boolean).slice(0, 2).join(' · ').slice(0, 140)}
                </small>
              </span>
              <Button
                variant="plain"
                className={cn(dk.btn, dk.small)}
                type="button"
                aria-label={`Veto the ${where}`}
                onClick={() =>
                  confirm(`Veto this ${where}? It will not be published.`) && onVeto(p.id)
                }
              >
                Veto
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
