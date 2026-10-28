'use client';
import { COUNTRY } from '@/constants/admin';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { Banners } from './Banners';
import { BarList } from './BarList';
import { DailyChart } from './DailyChart';
import {
  CountryFunnelTable,
  EnginesPanel,
  HealthTable,
  LanguagesTable,
  TaxExposure,
} from './DataTables';
import { Funnel } from './Funnel';
import { KpiGrid } from './KpiGrid';
import { ReportsTable } from './ReportsTable';
import { DisputesQueue, HeldQueue, ResponsesQueue } from './ReviewQueues';
import { SuccessMetrics } from './SuccessMetrics';
import { TopBar } from './TopBar';

function Card({
  title,
  sub,
  wide,
  children,
}: {
  title: string;
  sub?: React.ReactNode;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`card${wide ? ' wide' : ''}`}>
      <h2>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
      {children}
    </div>
  );
}

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid">{children}</div>
);

export function Dashboard() {
  const d = useAdminDashboard();
  const data = d.data;
  const a = data?.analytics ?? null;

  return (
    <div>
      <TopBar
        status={d.status}
        days={d.days}
        onDays={d.setDays}
        onRefresh={d.refresh}
        onSignOut={d.signOut}
      />
      <div className="wrap">
        {data && (
          <>
            <Banners data={data} />
            <KpiGrid a={a} stats={data.stats} />
            <Grid>
              <Card
                wide
                title="Success metrics"
                sub="The few numbers that say whether ShelterKart is working, against their targets, for the period selected."
              >
                <SuccessMetrics a={a} stats={data.stats} />
              </Card>
            </Grid>
            <Grid>
              <Card
                wide
                title="Reports"
                sub="Every report, with its findings and sales. Open the full report exactly as a paying client receives it, or see what a visitor who hasn’t paid sees."
              >
                <ReportsTable reports={data.reports} demo={d.mode === 'demo'} />
              </Card>
            </Grid>
            {a && (
              <>
                <Grid>
                  <Card wide title="Every day" sub="Visitors, searches and paid reports per day.">
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
                  </Card>
                </Grid>
                <Grid>
                  <Card
                    title="From visit to payment"
                    sub="Visitor-days reaching each step, with the share of the step before."
                  >
                    <Funnel steps={a.funnel} />
                  </Card>
                  <Card
                    title="Where visitors come from"
                    sub={
                      <>
                        By page views. Tag your links with <code>?utm_source=</code> to separate
                        them.
                      </>
                    }
                  >
                    <BarList items={a.channels} />
                  </Card>
                </Grid>
                <Grid>
                  <Card title="Campaigns" sub="Source / campaign from tagged links.">
                    <BarList items={a.campaigns} />
                  </Card>
                  <Card title="Referring websites" sub="Sites that linked here.">
                    <BarList items={a.referrers} />
                  </Card>
                  <Card title="Countries" sub="From the hosting network, where it provides one.">
                    <BarList items={a.countries} label={(x) => COUNTRY[x.key] ?? x.key} />
                  </Card>
                  <Card
                    title="Languages"
                    sub="The language visitors read in, and how far each gets. Does a language convert better? This answers it."
                  >
                    <LanguagesTable rows={a.languages} />
                  </Card>
                  <Card
                    title="Conversion by country"
                    sub="Where visitors are, and how far each country gets. Checkouts are counted when they start; paid sales per country are in Tax exposure."
                  >
                    <CountryFunnelTable rows={a.country_funnel} />
                  </Card>
                  {data.tax && (
                    <Card
                      title="Tax exposure"
                      sub="Twelve months of sales against each country's registration threshold. An alert fires at 70% and 90%; at 100% that country stops selling until its registration is configured."
                    >
                      <TaxExposure tax={data.tax} />
                    </Card>
                  )}
                  {data.engines && (
                    <Card
                      title="AI engines"
                      sub="For each agent: the engines allowed to serve it, cheapest first (the rest take over in that order if one fails), and why any engine is left out. Below: what each engine did since the server last started. A rescue is a call another engine had failed first."
                    >
                      <EnginesPanel e={data.engines} />
                    </Card>
                  )}
                  <Card title="Devices" sub="Page views by device.">
                    <BarList items={a.devices} />
                  </Card>
                </Grid>
                <Grid>
                  <Card
                    title="Most searched projects"
                    sub="What buyers want checked. Demand for a market starts here."
                  >
                    <BarList items={a.top_searches} />
                  </Card>
                  <Card title="Searches by market" sub="Which country selector buyers used.">
                    <BarList items={a.markets} label={(x) => x.key.toUpperCase()} />
                  </Card>
                  <Card
                    title="How searches ended"
                    sub="fresh = new research; cached or matched = answered from memory; error or unavailable = the buyer got nothing."
                  >
                    <BarList items={a.search_outcomes} />
                  </Card>
                </Grid>
              </>
            )}
            <Grid>
              <Card
                wide
                title="Official registers"
                sub="The nightly check that each register still works and still allows automated access."
              >
                <HealthTable health={data.health} busy={d.checkingHealth} onRun={d.runHealth} />
              </Card>
            </Grid>
            <Grid>
              <Card title="Reports of inaccuracy" sub="From buyers, against a specific report.">
                <DisputesQueue rows={data.disputes} onResolve={d.resolveDispute} />
              </Card>
              <Card
                title="Held for a person"
                sub={
                  data.held?.markets.length
                    ? `Holding negative findings for review in: ${data.held.markets.join(', ')}.`
                    : 'No market is set to hold findings for review (ADVERSE_HOLD_MARKETS is empty).'
                }
              >
                <p className="sub">
                  Reports with negative findings in the markets set to hold them. Buyers see each
                  held finding as “being checked”, and cannot unlock the report until it is
                  released.
                </p>
                <HeldQueue held={data.held} onRelease={d.approveHeld} />
              </Card>
              <Card
                title="Developer replies awaiting review"
                sub="Shown on reports only once approved."
              >
                <ResponsesQueue rows={data.responses} onReview={d.reviewResponse} />
              </Card>
            </Grid>
            <p className="note">
              Visitors are counted with a code that changes every day and is never stored with an IP
              address, so the same person on two different days counts twice. That is the price of
              not tracking anyone. Bots and link previews (WhatsApp, Instagram and others) are not
              counted. Searches, report opens, checkouts and payments are recorded by the server, so
              ad blockers cannot hide them.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
