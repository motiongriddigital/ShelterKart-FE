import type { ModalId } from '@/store/modal';

/** A header or footer entry: a page link, a place on the home page, or a dialog. */
export type NavLink =
  | { label: string; href: string }
  | { label: string; modal: ModalId }
  | { label: string; guide: true };

export type FooterColumn = { title: string; links: NavLink[] };

export type EvidenceNode = { icon: 'source' | 'shield' | 'open'; label: string };
