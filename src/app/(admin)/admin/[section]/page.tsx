import { notFound } from 'next/navigation';
import { PlannedSection } from '@/components/console/PlannedSection';
import { viewFor } from '@/components/console/views/registry';
import { ADMIN_ITEMS, adminItemBySlug } from '@/constants/adminNav';

export function generateStaticParams() {
  return ADMIN_ITEMS.filter((i) => i.slug && !i.live).map((i) => ({ section: i.slug }));
}

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const item = adminItemBySlug((await params).section);
  if (!item || !item.slug) notFound();
  return viewFor(item.slug) ?? <PlannedSection slug={item.slug} />;
}
