'use client';
import { LayoutDashboard, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/console/PageHeader';
import { cn } from '@/utils/cn';
import { SegTabs } from './SegTabs';
import { Button } from '@/components/console/ui/button';

type Props = {
  status: string;
  days: string;
  onDays: (d: string) => void;
  onRefresh: () => void;
};

const PERIOD_TABS = [
  { id: '1', label: 'Today' },
  { id: '7', label: '7d' },
  { id: '30', label: '30d' },
  { id: '90', label: '90d' },
  { id: '365', label: '12m' },
];

export function TopBar({ status, days, onDays, onRefresh }: Props) {
  const loading = status === 'Loading…';
  return (
    <PageHeader title="Dashboard" icon={LayoutDashboard} note={status}>
      <SegTabs label="Period" tabs={PERIOD_TABS} value={days} onChange={onDays} />
      <Button
        variant="plain"
        type="button"
        onClick={onRefresh}
        aria-label="Refresh"
        title="Refresh"
        className="pressable flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
      >
        <RefreshCw className={cn('size-4', loading && 'animate-spin')} strokeWidth={1.75} />
      </Button>
    </PageHeader>
  );
}
