'use client';
import { useEffect, type ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { adminErrorMessage } from '@/app/_api/adminPeople';
import { useConsoleData } from '@/store/consoleData';
import { PageHeader } from '../PageHeader';
import { btn } from '../kit/Panel';

/** Runs an action that talks to the server and says in a toast what happened: the server's own sentence when it refuses. */
export const report = (p: Promise<unknown>, done: string) =>
  p.then(
    () => void toast.success(done),
    (e: unknown) => void toast.error(adminErrorMessage(e)),
  );

/**
 * Signed in to a real server: loads the people lists once and answers with a loading or an error screen until they are there.
 * In the demo, or once loaded, it returns null and the screen draws itself.
 */
export function useLiveGate(title: string, icon: LucideIcon): ReactNode | null {
  const live = useConsoleData((s) => s.live);
  const status = useConsoleData((s) => s.status);
  const error = useConsoleData((s) => s.error);
  const load = useConsoleData((s) => s.load);

  useEffect(() => {
    if (live && status === 'idle') void load();
  }, [live, status, load]);

  if (!live || status === 'ready') return null;
  return (
    <div>
      <PageHeader title={title} icon={icon} />
      <div className="mx-auto max-w-5xl p-6">
        {status === 'error' ? (
          <div role="alert" className="card-surface p-5">
            <p className="text-sm font-medium">Could not load this from the server.</p>
            <p className="mt-1 text-ui text-muted-foreground">{error}</p>
            <button className={`${btn} mt-3`} onClick={() => void load()}>
              Try again
            </button>
          </div>
        ) : (
          <p role="status" className="text-ui text-muted-foreground">
            Loading from the server…
          </p>
        )}
      </div>
    </div>
  );
}
