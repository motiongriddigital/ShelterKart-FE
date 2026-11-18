import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CustomResearchResult } from '@/types/customResearch';

type CustomResearchState = {
  /** True while a search is waiting for the server. */
  busy: boolean;
  /** The reports researched in this tab, by reference, so a report page still opens after a refresh. */
  reports: Record<string, CustomResearchResult>;
  start: () => void;
  succeed: (result: CustomResearchResult) => void;
  fail: () => void;
};

// Kept in this tab's session storage. Hydration is manual: a report page calls
// `useCustomResearch.persist.rehydrate()` after mount, so the server and client render the same first frame.
export const useCustomResearchStore = create<CustomResearchState>()(
  persist(
    (set) => ({
      busy: false,
      reports: {},
      start: () => set({ busy: true }),
      succeed: (result) =>
        set((s) => ({ busy: false, reports: { ...s.reports, [result.ref]: result } })),
      fail: () => set({ busy: false }),
    }),
    {
      name: 'sk-custom-research',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      partialize: ({ reports }) => ({ reports }),
    },
  ),
);
