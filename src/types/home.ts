import type { ModalId } from '@/store/modal';

/** A header or footer entry: a page link, a place on the home page, or a dialog. */
export type NavLink =
  | { label: string; href: string }
  | { label: string; modal: ModalId }
  | { label: string; guide: true };

export type Pillar = {
  icon: 'scale' | 'seal' | 'ledger';
  title: string;
  text: string;
  tag: string;
  featured?: boolean;
};

export type DocketClaim = { label: string; text: string; flag?: 'bad' | 'ok'; ref?: string };

export type Stat = { value: string; label: string };

export type FooterColumn = { title: string; links: NavLink[] };
