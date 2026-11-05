import { create } from 'zustand';
import { applyTheme, isDarkFor, type ThemeMode } from '@/store/adminTheme';

// Light/dark choice of the public pages (home, reports). Same mechanics as the admin store, its own key.
export const THEME_KEY = 'sk-theme';

const read = (): ThemeMode => {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
};

type State = { dark: boolean; init: () => void; toggle: () => void };

export const useTheme = create<State>((set, get) => ({
  dark: false,
  init: () => set({ dark: isDarkFor(read()) }),
  toggle: () => {
    const mode: ThemeMode = get().dark ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {
      // storage can be blocked; the choice then lasts for this visit only
    }
    applyTheme(mode);
    set({ dark: mode === 'dark' });
  },
}));
