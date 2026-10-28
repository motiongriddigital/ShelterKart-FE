import { create } from 'zustand';
import { DEFAULT_MARKET, MARKETS } from '@/constants/markets';
import type { MarketCode } from '@/types/market';

// Cross-route state only: the selected market and city survive navigation.
type PreferencesState = {
  market: MarketCode;
  city: string;
  setMarket: (m: MarketCode) => void;
  setCity: (c: string) => void;
};

export const usePreferences = create<PreferencesState>((set) => ({
  market: DEFAULT_MARKET,
  city: MARKETS[DEFAULT_MARKET].cities[0],
  // Changing market resets the city to that market's first option ("All ...").
  setMarket: (market) => set({ market, city: MARKETS[market].cities[0] }),
  setCity: (city) => set({ city }),
}));
