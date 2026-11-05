import type { LucideIcon } from 'lucide-react';

export type Doctrine = { code: string; title: string; text: string; tag: string; icon: LucideIcon };
export type HierarchyLevel = { level: string; weight: string };
export type Assurance = {
  eyebrow: string;
  title: string;
  text: string;
  stat: { label: string; value: string };
  icon: LucideIcon;
};
