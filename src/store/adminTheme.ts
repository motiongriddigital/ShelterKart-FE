import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';
const KEY = 'sk-admin-theme';

const read = (): ThemeMode => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
};

export const isDarkFor = (mode: ThemeMode) =>
  mode === 'dark' ||
  (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

export function applyTheme(mode: ThemeMode) {
  const dark = isDarkFor(mode);
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
}

type State = { mode: ThemeMode; ready: boolean; init: () => void; setMode: (m: ThemeMode) => void };

export const useAdminTheme = create<State>((set) => ({
  mode: 'system',
  ready: false,
  init: () => {
    const mode = read();
    applyTheme(mode);
    set({ mode, ready: true });
  },
  setMode: (mode) => {
    try {
      if (mode === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch {
      // storage can be blocked; the choice then lasts for this visit only
    }
    applyTheme(mode);
    set({ mode });
  },
}));
