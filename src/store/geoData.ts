import { create } from 'zustand';
import { fetchGeo, adminErrorMessage } from '@/app/_api/adminPeople';
import { COUNTRY_STATS, MARKET_LIST, type CountryStat } from '@/constants/adminSeedGeo';
import { geoStatsFromApi, notPlaced } from '@/utils/adminGeo';
import { useAdminSession } from './adminSession';

type Load = 'idle' | 'loading' | 'ready' | 'error';

type State = {
  stats: CountryStat[];
  /** Users the map cannot place (another country, or none). 0 in the demo. */
  notPlaced: number;
  live: boolean;
  status: Load;
  error: string;
  load: () => Promise<void>;
};

const start = (live: boolean) =>
  live
    ? {
        stats: geoStatsFromApi([], MARKET_LIST),
        notPlaced: 0,
        live,
        status: 'idle' as Load,
        error: '',
      }
    : { stats: COUNTRY_STATS, notPlaced: 0, live, status: 'ready' as Load, error: '' };

/** The numbers behind the user map: from the admin API when signed in to a server, seed data in the demo. */
export const useGeoData = create<State>((set, get) => ({
  ...start(useAdminSession.getState().mode === 'live'),
  load: async () => {
    if (!get().live) return;
    set({ status: 'loading', error: '' });
    try {
      const g = await fetchGeo();
      set({
        stats: geoStatsFromApi(g.markets, MARKET_LIST),
        notPlaced: notPlaced(g),
        status: 'ready',
        error: '',
      });
    } catch (e) {
      set({ status: 'error', error: adminErrorMessage(e) });
    }
  },
}));

useAdminSession.subscribe((s, prev) => {
  if (s.mode !== prev.mode) useGeoData.setState(start(s.mode === 'live'));
});
