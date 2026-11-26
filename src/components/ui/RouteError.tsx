'use client';
import { EmptyState } from '@/components/ui/EmptyState';

/** The body of an `error.tsx`: the "something went wrong" page, with a button that tries the page again. */
export function RouteError({ reset }: { reset: () => void }) {
  return (
    <main>
      <EmptyState kind="error" onAction={reset} />
    </main>
  );
}
