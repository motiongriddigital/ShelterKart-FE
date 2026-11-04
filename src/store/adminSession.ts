import { create } from 'zustand';
import type { AdminMode } from '@/types/admin';

// The Basic auth header lives in memory only: closing the tab signs out.
type AdminSession = {
  mode: AdminMode | null;
  authHeader: string;
  username: string;
  signInLive: (header: string, username: string) => void;
  openDemo: () => void;
  signOut: () => void;
};

export const useAdminSession = create<AdminSession>((set) => ({
  mode: null,
  authHeader: '',
  username: '',
  signInLive: (authHeader, username) => set({ mode: 'live', authHeader, username }),
  openDemo: () => set({ mode: 'demo', authHeader: '', username: 'demo' }),
  signOut: () => set({ mode: null, authHeader: '', username: '' }),
}));
