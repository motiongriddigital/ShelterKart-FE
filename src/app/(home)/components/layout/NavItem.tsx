'use client';
import Link from 'next/link';
import { ActionLink } from '@/components/ui/ActionLink';
import { useGuide } from '@/hooks/useGuide';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';
import type { NavLink } from '@/types/home';

/** One header or footer entry: a page, a place on this page, the guide reader, or a dialog. */
export function NavItem({ link, className }: { link: NavLink; className?: string }) {
  const t = useT();
  const open = useModalStore((s) => s.open);
  const { openGuide } = useGuide();
  const label = t(link.label);

  if ('href' in link) {
    return (
      <Link href={link.href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <ActionLink
      className={className}
      onActivate={() => ('modal' in link ? open(link.modal) : openGuide())}
    >
      {label}
    </ActionLink>
  );
}
