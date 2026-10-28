import { create } from 'zustand';
import type { AdminMode } from '@/types/admin';

// The Basic auth header lives in memory only: closing the tab signs out.
type AdminSession = {
  mode: AdminMode | null;
  authHeader: string;
  signInLive: (header: string) => void;
  openDemo: () => void;
  signOut: () => void;
};

export const useAdminSession = create<AdminSession>((set) => ({
  mode: null,
  authHeader: '',
  signInLive: (authHeader) => set({ mode: 'live', authHeader }),
  openDemo: () => set({ mode: 'demo', authHeader: '' }),
  signOut: () => set({ mode: null, authHeader: '' }),
}));
