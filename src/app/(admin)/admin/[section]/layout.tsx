import { notFound } from 'next/navigation';
import { SecondaryPanel } from '@/components/console/SecondaryPanel';
import { adminItemBySlug } from '@/constants/adminNav';
import { PANELS } from '@/constants/adminPanels';

export default async function SectionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!adminItemBySlug(section)?.slug) notFound();
  const panel = PANELS[section];
  if (!panel) return <>{children}</>;
  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <SecondaryPanel base={`/admin/${section}`} panel={panel} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
