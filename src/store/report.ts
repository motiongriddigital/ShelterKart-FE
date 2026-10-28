import { create } from 'zustand';
import type { ReportView } from '@/types/report';

type ReportState = {
  view: ReportView;
  /** Reference of the report on screen: what a dispute or a developer's reply must name. */
  ref: string;
  /** A finding quoted from the report, ready to prefill the reply window. */
  replyClaim: string;
  setView: (v: ReportView) => void;
  setReply: (ref: string, claim: string) => void;
  clear: () => void;
};

export const useReportStore = create<ReportState>((set) => ({
  view: { kind: 'none' },
  ref: '',
  replyClaim: '',
  setView: (view) => set({ view, ref: view.kind === 'none' ? '' : `sample-${view.id}` }),
  setReply: (ref, replyClaim) => set((s) => ({ ref: ref || s.ref, replyClaim })),
  clear: () => set({ view: { kind: 'none' }, ref: '' }),
}));
