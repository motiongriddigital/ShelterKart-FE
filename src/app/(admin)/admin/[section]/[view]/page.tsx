import { notFound } from 'next/navigation';
import { PlannedSection } from '@/components/console/PlannedSection';
import { viewFor } from '@/components/console/views/registry';
import { adminItemBySlug } from '@/constants/adminNav';
import { PANELS } from '@/constants/adminPanels';

export default async function AdminViewPage({
  params,
}: {
  params: Promise<{ section: string; view: string }>;
}) {
  const { section, view } = await params;
  const item = adminItemBySlug(section);
  const entry = PANELS[section]?.groups.flatMap((g) => g.items).find((i) => i.slug === view);
  if (!item || !item.slug || !entry) notFound();
  return viewFor(section, view) ?? <PlannedSection slug={item.slug} view={entry.label} />;
}
