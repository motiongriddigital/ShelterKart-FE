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
  // A user's own page is addressed by the user's id, which only the data knows; the screen says so if there is no such user.
  if (!item || !item.slug || (!entry && section !== 'users')) notFound();
  return viewFor(section, view) ?? <PlannedSection slug={item.slug} view={entry?.label ?? view} />;
}
