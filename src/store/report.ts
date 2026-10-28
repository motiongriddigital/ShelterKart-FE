import { create } from 'zustand';
import type { ReportView } from '@/types/report';

type ReportState = { view: ReportView; setView: (v: ReportView) => void; clear: () => void };

export const useReportStore = create<ReportState>((set) => ({
  view: { kind: 'none' },
  setView: (view) => set({ view }),
  clear: () => set({ view: { kind: 'none' } }),
}));
