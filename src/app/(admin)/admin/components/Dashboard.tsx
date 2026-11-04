'use client';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { Banners } from './Banners';
import { Panel } from '@/components/console/kit/Panel';
import { Funnel } from './Funnel';
import { NeedsAPerson } from './NeedsAPerson';
import { SuccessMetrics } from './SuccessMetrics';
import { SystemCard } from './SystemCard';
import { Tiles } from './Tiles';
import { TopBar } from './TopBar';
import { TrafficCard } from './TrafficCard';
import { TrendChart } from './TrendChart';

export function Dashboard() {
  const d = useAdminDashboard();
  const data = d.data;
  const a = data?.analytics ?? null;

  return (
    <div>
      <TopBar status={d.status} days={d.days} onDays={d.setDays} onRefresh={d.refresh} />
      <div className="wrap">
        {data && (
          <>
            <Banners data={data} />
            <Tiles a={a} stats={data.stats} />
            <div className="mb-4 grid gap-4 lg:grid-cols-3">
              {a && (
                <Panel
                  className="lg:col-span-2"
                  title="Every day"
                  sub="One measure at a time. Hover the chart for a day."
                >
                  <TrendChart daily={a.daily} />
                </Panel>
              )}
              <NeedsAPerson
                data={data}
                onResolve={d.resolveDispute}
                onRelease={d.approveHeld}
                onReview={d.reviewResponse}
              />
            </div>
            {a && (
              <div className="mb-4 grid gap-4 lg:grid-cols-3">
                <Panel title="From visit to payment" sub="Visitor-days reaching each step.">
                  <Funnel steps={a.funnel} />
                </Panel>
                <TrafficCard a={a} />
                <SystemCard
                  engines={data.engines}
                  health={data.health}
                  busy={d.checkingHealth}
                  onRun={d.runHealth}
                />
              </div>
            )}
            <Panel
              title="Success metrics"
              sub="Whether ShelterKart is working, against targets, for the period."
            >
              <div className="legacy">
                <SuccessMetrics a={a} stats={data.stats} />
              </div>
            </Panel>
          </>
        )}
      </div>
    </div>
  );
}
