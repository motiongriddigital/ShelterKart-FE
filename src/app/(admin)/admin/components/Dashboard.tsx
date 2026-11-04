'use client';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { Banners } from './Banners';
import { DailyChart } from './DailyChart';
import { Funnel } from './Funnel';
import { NeedsAPerson } from './NeedsAPerson';
import { SuccessMetrics } from './SuccessMetrics';
import { SystemCard } from './SystemCard';
import { Tiles } from './Tiles';
import { TopBar } from './TopBar';
import { TrafficCard } from './TrafficCard';

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
            <div className="dash-grid">
              {a && (
                <div className="card span-8">
                  <h2>Every day</h2>
                  <p className="sub">Visitors, searches and paid reports per day.</p>
                  <DailyChart daily={a.daily} />
                  <div className="legend">
                    <span>
                      <i style={{ background: 'var(--chart-1)' }} />
                      Visitors
                    </span>
                    <span>
                      <i style={{ background: 'var(--chart-2)' }} />
                      Searches
                    </span>
                    <span>
                      <i style={{ background: 'var(--chart-3)' }} />
                      Paid reports
                    </span>
                  </div>
                </div>
              )}
              <div className="span-4 contents-card">
                <NeedsAPerson
                  data={data}
                  onResolve={d.resolveDispute}
                  onRelease={d.approveHeld}
                  onReview={d.reviewResponse}
                />
              </div>
            </div>
            {a && (
              <div className="dash-grid">
                <div className="card span-4">
                  <h2>From visit to payment</h2>
                  <p className="sub">Visitor-days reaching each step.</p>
                  <Funnel steps={a.funnel} />
                </div>
                <div className="span-4 contents-card">
                  <TrafficCard a={a} />
                </div>
                <div className="span-4 contents-card">
                  <SystemCard
                    engines={data.engines}
                    health={data.health}
                    busy={d.checkingHealth}
                    onRun={d.runHealth}
                  />
                </div>
              </div>
            )}
            <div className="dash-grid">
              <div className="card">
                <h2>Success metrics</h2>
                <p className="sub">
                  Whether ShelterKart is working, against targets, for the period.
                </p>
                <SuccessMetrics a={a} stats={data.stats} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
