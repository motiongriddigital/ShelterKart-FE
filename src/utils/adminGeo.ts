import type { CountryStat, Market } from '@/constants/adminSeedGeo';

export type ApiGeoSlot = { users: number; newThisWeek: number; paid: number; conversion: number };
export type ApiGeoMarket = ApiGeoSlot & { code: string; name: string; iso: string };
export type ApiGeo = {
  markets: ApiGeoMarket[];
  other: ApiGeoSlot;
  unknown: ApiGeoSlot;
  totals: ApiGeoSlot;
};

const n = (v: unknown) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : 0);

/** One row per market the map knows (its fixed facts come from `meta`), with the server's numbers. A market the server did not name has no users. */
export function geoStatsFromApi(markets: ApiGeoMarket[], meta: Market[]): CountryStat[] {
  const by = new Map(markets.map((m) => [m.code, m]));
  return meta.map((m) => {
    const s = by.get(m.code);
    return {
      ...m,
      users: n(s?.users),
      paid: n(s?.paid),
      conversion: n(s?.conversion),
      newThisWeek: n(s?.newThisWeek),
    };
  });
}

/** Users the map cannot place: in a country that is not one of the markets, or with no country at all. */
export const notPlaced = (g: Pick<ApiGeo, 'other' | 'unknown'>) =>
  n(g.other?.users) + n(g.unknown?.users);
