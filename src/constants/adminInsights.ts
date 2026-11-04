export type InsightTone = 'critical' | 'warning' | 'good' | 'info';
export type InsightIcon = 'disputes' | 'held' | 'engine' | 'checkout' | 'traffic' | 'backup';

export type Insight = {
  id: string;
  tone: InsightTone;
  icon: InsightIcon;
  title: string;
  body: string;
  action?: string;
  href?: string;
};

export const SEED_INSIGHTS: Insight[] = [
  {
    id: 'disputes',
    tone: 'critical',
    icon: 'disputes',
    title: '2 reports of inaccuracy are open',
    body: 'Buyers say a possession date in a sample report disagrees with their agreement. The oldest is five days old.',
    action: 'Review them',
    href: '/admin',
  },
  {
    id: 'held',
    tone: 'warning',
    icon: 'held',
    title: '2 reports are held for a person',
    body: 'Negative findings in the UK and Ireland wait for release. Buyers see them as being checked and cannot unlock the report.',
    action: 'Open the queue',
    href: '/admin',
  },
  {
    id: 'engine',
    tone: 'warning',
    icon: 'engine',
    title: 'OpenAI hit a rate limit',
    body: '54 of 2,370 AI calls failed since the server started. Other engines took over for most of them.',
    action: 'See the AI engine',
    href: '/admin/ai-engine',
  },
  {
    id: 'checkout',
    tone: 'good',
    icon: 'checkout',
    title: 'Checkout is holding at 66%',
    body: 'Two in three buyers who start a checkout pay. That is above the 50% target for the fourth week running.',
    action: 'See the funnel',
    href: '/admin/freemium',
  },
  {
    id: 'backup',
    tone: 'info',
    icon: 'backup',
    title: 'Next backup in 6 days',
    body: 'Backups run every two weeks and are encrypted. The last one finished without errors.',
    action: 'Backup schedule',
    href: '/admin/settings/backup-schedule',
  },
];
