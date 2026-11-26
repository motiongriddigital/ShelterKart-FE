import { EmptyState } from '@/components/ui/EmptyState';

// `notFound()` from a report page (an unknown sample report) lands here.
export default function NotFound() {
  return (
    <main>
      <EmptyState kind="missingReport" />
    </main>
  );
}
