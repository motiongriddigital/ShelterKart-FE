import { create } from 'zustand';

// Cross-route state only: selected market + language survive navigation.
type PreferencesState = {
  market: string | null;
  locale: string;
  setMarket: (m: string | null) => void;
  setLocale: (l: string) => void;
};

export const usePreferences = create<PreferencesState>((set) => ({
  market: null,
  locale: 'en',
  setMarket: (market) => set({ market }),
  setLocale: (locale) => set({ locale }),
}));
