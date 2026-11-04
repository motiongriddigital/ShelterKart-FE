'use client';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';
import { feature } from 'topojson-client';
import { Globe2, Maximize2, Minimize2, X } from 'lucide-react';
import { SegTabs } from '@/app/(admin)/admin/components/SegTabs';
import { COUNTRY_STATS, statByCode, type CountryStat } from '@/constants/adminSeedGeo';
import { cn } from '@/utils/cn';
import { PageHeader } from '../PageHeader';
import { Panel, Stat, rowCls, tableWrap, td, th } from '../kit/Panel';
import { Button } from '../ui/button';

type Metric = 'users' | 'paid' | 'conversion';
type Topo = Parameters<typeof feature>[0];
type Shape = { id: string; d: string; cx: number; cy: number; area: number };

const W = 960;
const H = 500;
const METRICS: { id: Metric; label: string }[] = [
  { id: 'users', label: 'Users' },
  { id: 'paid', label: 'Paid reports' },
  { id: 'conversion', label: 'Conversion' },
];

const value = (c: CountryStat, m: Metric) => (m === 'conversion' ? c.conversion : c[m]);
const show = (c: CountryStat, m: Metric) =>
  m === 'conversion' ? `${(c.conversion * 100).toFixed(1)}%` : value(c, m).toLocaleString('en-IN');

let cache: Shape[] | null = null;
async function loadShapes(): Promise<Shape[]> {
  if (cache) return cache;
  const topo = (await (await fetch('/admin/world-50m.json')).json()) as Topo & {
    objects: { countries: unknown };
  };
  const fc = feature(topo, topo.objects.countries as never) as unknown as {
    features: (GeoPermissibleObjects & { id: string })[];
  };
  const land = {
    type: 'FeatureCollection',
    features: fc.features.filter((f) => f.id !== '010'),
  } as never;
  const projection = geoNaturalEarth1().fitExtent(
    [
      [8, 8],
      [W - 8, H - 8],
    ],
    land,
  );
  const path = geoPath(projection);
  cache = fc.features
    .filter((f) => f.id !== '010')
    .map((f) => {
      const [cx, cy] = path.centroid(f);
      return { id: String(f.id), d: path(f) ?? '', cx, cy, area: path.area(f) };
    });
  return cache;
}

const Shapes = memo(function Shapes({
  shapes,
  byNumeric,
  colors,
  totalArea,
  selected,
}: {
  shapes: Shape[];
  byNumeric: Map<string, CountryStat>;
  colors: Map<string, string>;
  totalArea: Map<string, number>;
  selected?: string;
}) {
  return (
    <>
      {shapes.map((s, i) => {
        const c = byNumeric.get(s.id);
        const on = Boolean(c && selected === c.code);
        return (
          <path
            key={`${s.id}-${i}`}
            d={s.d}
            data-code={c?.code}
            fill={c ? colors.get(c.code) : 'var(--muted)'}
            stroke={on ? 'var(--foreground)' : 'var(--card)'}
            strokeWidth={on ? 1.6 : 0.5}
            className={c ? 'cursor-pointer hover:brightness-90' : undefined}
          />
        );
      })}
      {shapes
        .filter((s) => byNumeric.has(s.id) && (totalArea.get(s.id) ?? 0) < 40)
        .map((s, i) => {
          const c = byNumeric.get(s.id) as CountryStat;
          return (
            <circle
              key={`m-${s.id}-${i}`}
              data-code={c.code}
              cx={s.cx}
              cy={s.cy}
              r={5}
              fill={colors.get(c.code)}
              stroke="var(--foreground)"
              strokeWidth={selected === c.code ? 1.6 : 0.8}
              className="cursor-pointer hover:brightness-90"
            />
          );
        })}
    </>
  );
});

export function UserMapView({ country }: { country?: string }) {
  const router = useRouter();
  const [shapes, setShapes] = useState<Shape[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [metric, setMetric] = useState<Metric>('users');
  const [hoverCode, setHoverCode] = useState<string | null>(null);
  const tip = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [isFs, setIsFs] = useState(false);
  const [canFs, setCanFs] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    setCanFs(Boolean(document.fullscreenEnabled));
    const onChange = () => {
      const on = document.fullscreenElement === box.current;
      setIsFs(on);
      if (!on) setPicked(null);
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFs = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void box.current?.requestFullscreen();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT');
      if (e.key === 'f' && !typing && !e.metaKey && !e.ctrlKey && document.fullscreenEnabled) {
        e.preventDefault();
        toggleFs();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    loadShapes()
      .then(setShapes)
      .catch(() => setFailed(true));
  }, []);

  const totalArea = useMemo(() => {
    const m = new Map<string, number>();
    for (const sh of shapes ?? []) m.set(sh.id, (m.get(sh.id) ?? 0) + sh.area);
    return m;
  }, [shapes]);
  const byNumeric = useMemo(() => new Map(COUNTRY_STATS.map((c) => [c.numeric, c])), []);
  const max = useMemo(() => Math.max(...COUNTRY_STATS.map((c) => value(c, metric))), [metric]);
  const colors = useMemo(() => {
    const hi = Math.max(...COUNTRY_STATS.map((c) => value(c, metric)));
    const lo = Math.min(...COUNTRY_STATS.map((c) => value(c, metric)));
    return new Map(
      COUNTRY_STATS.map((c) => {
        const t = hi === lo ? 1 : (value(c, metric) - lo) / (hi - lo);
        return [
          c.code,
          `color-mix(in oklab, var(--signal) ${Math.round(22 + Math.sqrt(t) * 70)}%, var(--card))`,
        ];
      }),
    );
  }, [metric]);

  const selected = country && country !== 'world' ? statByCode(country) : undefined;
  const ranked = useMemo(
    () => [...COUNTRY_STATS].sort((a, b) => value(b, metric) - value(a, metric)),
    [metric],
  );
  const totalUsers = COUNTRY_STATS.reduce((s, c) => s + c.users, 0);
  const totalPaid = COUNTRY_STATS.reduce((s, c) => s + c.paid, 0);
  const top = ranked[0];
  const go = (code: string) => router.push(`/admin/map/${code}`);
  const hovered = hoverCode ? statByCode(hoverCode) : undefined;
  const onMove = (e: React.MouseEvent) => {
    const code = (e.target as SVGElement).dataset?.code ?? null;
    setHoverCode((prev) => (prev === code ? prev : code));
    if (tip.current)
      tip.current.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px)`;
  };

  return (
    <div>
      <PageHeader
        title={selected ? selected.name : 'User map'}
        icon={Globe2}
        note={selected ? 'User map' : undefined}
      >
        <SegTabs label="Shade the map by" tabs={METRICS} value={metric} onChange={setMetric} />
      </PageHeader>
      <div className="mx-auto max-w-6xl space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Countries with users"
            value={`${COUNTRY_STATS.length} of 36`}
            sub="Every market the backend supports"
          />
          <Stat label="Users" value={totalUsers.toLocaleString('en-IN')} />
          <Stat
            label="Paid reports"
            value={totalPaid.toLocaleString('en-IN')}
            sub={`${((100 * totalPaid) / totalUsers).toFixed(1)}% of users bought`}
          />
          <Stat
            label={`Top ${METRICS.find((m) => m.id === metric)?.label.toLowerCase()}`}
            value={top.name}
            sub={show(top, metric)}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Panel
            className="lg:col-span-2"
            title="Where users are"
            sub="Click a country to open it. Shading follows the chosen measure."
            actions={
              canFs && (
                <Button
                  variant="plain"
                  type="button"
                  onClick={toggleFs}
                  title="Full screen (F)"
                  aria-label="Show the map full screen"
                  className="pressable flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
                >
                  <Maximize2 className="size-4" strokeWidth={1.75} />
                </Button>
              )
            }
          >
            <div ref={box} className={cn(isFs && 'flex h-full flex-col gap-3 bg-card p-5')}>
              {isFs && (
                <div className="flex items-center gap-3">
                  <Globe2 className="size-4 text-muted-foreground" strokeWidth={1.75} />
                  <h2 className="text-[15px] font-semibold tracking-tight">User map</h2>
                  <span className="text-ui text-muted-foreground">
                    Click a country for its numbers. Press Esc to leave.
                  </span>
                  <span className="flex-1" />
                  <SegTabs
                    label="Shade the map by"
                    tabs={METRICS}
                    value={metric}
                    onChange={setMetric}
                  />
                  <Button
                    variant="plain"
                    type="button"
                    onClick={toggleFs}
                    aria-label="Leave full screen"
                    title="Leave full screen (Esc)"
                    className="pressable flex size-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
                  >
                    <Minimize2 className="size-4" strokeWidth={1.75} />
                  </Button>
                </div>
              )}
              <div className={cn('relative', isFs && 'min-h-0 flex-1')}>
                {!shapes && !failed && (
                  <div className="grid aspect-[96/50] place-items-center text-ui text-muted-foreground">
                    Loading the map
                  </div>
                )}
                {failed && (
                  <div className="grid aspect-[96/50] place-items-center text-ui text-status-down-text">
                    The map data could not be loaded. The table below has the same numbers.
                  </div>
                )}
                {shapes && (
                  <svg
                    viewBox={`0 0 ${W} ${H}`}
                    role="img"
                    aria-label={`World map shaded by ${metric}`}
                    className={cn('w-full', isFs ? 'h-full' : 'h-auto')}
                    onMouseMove={onMove}
                    onMouseLeave={() => setHoverCode(null)}
                    onClick={(e) => {
                      const code = (e.target as SVGElement).dataset?.code;
                      if (!code) return;
                      if (isFs) setPicked(code);
                      else go(code);
                    }}
                  >
                    <Shapes
                      shapes={shapes}
                      byNumeric={byNumeric}
                      colors={colors}
                      totalArea={totalArea}
                      selected={selected?.code}
                    />
                  </svg>
                )}
                <div
                  ref={tip}
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none fixed left-0 top-0 z-50 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-raised',
                    !hovered && 'invisible',
                  )}
                >
                  {hovered && (
                    <>
                      <p className="font-semibold">{hovered.name}</p>
                      <p className="tabular text-muted-foreground">
                        {hovered.users.toLocaleString('en-IN')} users · {hovered.paid} paid ·{' '}
                        {(hovered.conversion * 100).toFixed(1)}%
                      </p>
                    </>
                  )}
                </div>
                {isFs && picked && statByCode(picked) && (
                  <div className="absolute bottom-3 left-3 w-64 rounded-xl border border-border bg-popover p-4 shadow-raised">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{statByCode(picked)?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {statByCode(picked)?.currency}
                        </p>
                      </div>
                      <Button
                        variant="plain"
                        type="button"
                        aria-label="Close"
                        onClick={() => setPicked(null)}
                        className="rounded p-0.5 text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-4" strokeWidth={1.75} />
                      </Button>
                    </div>
                    <dl className="tabular mt-2 space-y-1 text-ui">
                      {(() => {
                        const c = statByCode(picked) as CountryStat;
                        return [
                          ['Users', c.users.toLocaleString('en-IN')],
                          ['New this week', `+${c.newThisWeek}`],
                          ['Paid reports', String(c.paid)],
                          ['Bought, of users', `${(c.conversion * 100).toFixed(1)}%`],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-3">
                            <dt className="text-muted-foreground">{k}</dt>
                            <dd className="font-medium">{v}</dd>
                          </div>
                        ));
                      })()}
                    </dl>
                    <Button
                      variant="plain"
                      type="button"
                      className="pressable mt-3 h-8 w-full rounded-md border border-border bg-card text-ui font-medium transition-colors hover:bg-accent"
                      onClick={() => {
                        const code = picked;
                        void document.exitFullscreen().finally(() => go(code));
                      }}
                    >
                      Open the country page
                    </Button>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span>Fewer</span>
                <span
                  className="h-2 w-40 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, color-mix(in oklab, var(--signal) 22%, var(--card)), color-mix(in oklab, var(--signal) 92%, var(--card)))',
                  }}
                />
                <span>More</span>
                <span className="ml-auto">Grey: no market</span>
              </div>
            </div>
          </Panel>

          {selected ? (
            <Panel
              title={selected.name}
              sub={`${selected.currency} · ${selected.lang}`}
              actions={
                <Button
                  variant="plain"
                  className="text-ui text-muted-foreground hover:text-foreground hover:underline"
                  onClick={() => router.push('/admin/map/world')}
                >
                  Back to the world
                </Button>
              }
            >
              <dl className="space-y-2.5 text-ui">
                {[
                  ['Users', selected.users.toLocaleString('en-IN')],
                  ['New this week', `+${selected.newThisWeek}`],
                  ['Paid reports', String(selected.paid)],
                  ['Bought, of users', `${(selected.conversion * 100).toFixed(1)}%`],
                  ['Share of all users', `${((100 * selected.users) / totalUsers).toFixed(1)}%`],
                  [
                    'Rank by users',
                    `${[...COUNTRY_STATS].sort((a, b) => b.users - a.users).findIndex((c) => c.code === selected.code) + 1} of 36`,
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-border pb-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="tabular font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          ) : (
            <Panel
              title="Top countries"
              sub={`By ${METRICS.find((m) => m.id === metric)?.label.toLowerCase()}`}
            >
              <ol className="space-y-2">
                {ranked.slice(0, 10).map((c) => (
                  <li key={c.code}>
                    <Button
                      variant="plain"
                      className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-left text-ui"
                      onClick={() => go(c.code)}
                    >
                      <span className="truncate">{c.name}</span>
                      <span className="tabular font-medium">{show(c, metric)}</span>
                      <span className="col-span-2 h-1.5 overflow-hidden rounded-full bg-muted">
                        <span
                          className="block h-full rounded-full bg-signal"
                          style={{ width: `${Math.max(4, (100 * value(c, metric)) / max)}%` }}
                        />
                      </span>
                    </Button>
                  </li>
                ))}
              </ol>
            </Panel>
          )}
        </div>

        <Panel title="All 36 countries" sub="Seed numbers until the user data is connected." flush>
          <div className={tableWrap}>
            <table className="w-full">
              <thead>
                <tr>
                  <th className={th}>Country</th>
                  <th className={`${th} text-right`}>Users</th>
                  <th className={`${th} text-right`}>New this week</th>
                  <th className={`${th} text-right`}>Paid reports</th>
                  <th className={`${th} text-right`}>Conversion</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((c) => (
                  <tr
                    key={c.code}
                    className={cn(
                      rowCls,
                      'cursor-pointer',
                      selected?.code === c.code && 'bg-accent',
                    )}
                    onClick={() => go(c.code)}
                  >
                    <td className={`${td} font-medium`}>{c.name}</td>
                    <td className={`${td} tabular text-right`}>
                      {c.users.toLocaleString('en-IN')}
                    </td>
                    <td className={`${td} tabular text-right`}>+{c.newThisWeek}</td>
                    <td className={`${td} tabular text-right`}>{c.paid}</td>
                    <td className={`${td} tabular text-right`}>
                      {(c.conversion * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
