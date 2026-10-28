'use client';
import Link from 'next/link';
import { ActionLink } from '@/components/ui/ActionLink';
import { useGuide } from '@/hooks/useGuide';
import { useT } from '@/hooks/useT';
import { useModalStore, type ModalId } from '@/store/modal';

const MODAL_LINKS: { id: ModalId; label: string }[] = [
  { id: 'principlesModal', label: 'Our Principles' },
  { id: 'tncModal', label: 'Terms & Conditions' },
  { id: 'privacyModal', label: 'Privacy Policy' },
  { id: 'restoreModal', label: 'Restore a purchase' },
];

const PAGE_LINKS = [
  { href: '/methodology', label: 'How a report is built' },
  { href: '/evidence', label: 'How we grade evidence' },
  { href: '/corrections', label: 'Corrections' },
  { href: '/independence', label: 'Independence' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/refunds', label: 'Refunds' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
];

export function HeroFoot() {
  const t = useT();
  const open = useModalStore((s) => s.open);
  const { openGuide } = useGuide();

  return (
    <div className="hero-foot">
      <div className="hero-foot-links">
        <ActionLink onActivate={() => openGuide()}>{t('Home Buying Guide')}</ActionLink>
        {MODAL_LINKS.map(({ id, label }) => (
          <ActionLink key={id} onActivate={() => open(id)}>
            {t(label)}
          </ActionLink>
        ))}
        {PAGE_LINKS.map(({ href, label }) => (
          <Link key={href} href={href}>
            {t(label)}
          </Link>
        ))}
      </div>
      <div className="hero-foot-note">{t('Every claim traced to its public source')}</div>
    </div>
  );
}
