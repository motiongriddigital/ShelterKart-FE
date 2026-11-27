import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PendingSearch = { query: string };

type PendingSearchState = {
  /** The search that met the sign-in wall; it runs again once the reader is back signed in. */
  pending?: PendingSearch;
  remember: (search: PendingSearch) => void;
  /** Returns the saved search and forgets it. */
  take: () => PendingSearch | undefined;
};

// Kept in this tab's session storage (not in the address bar). Hydration is manual: the search box calls
// `usePendingSearch.persist.rehydrate()` after mount, so the server and client render the same first frame.
export const usePendingSearch = create<PendingSearchState>()(
  persist(
    (set, get) => ({
      pending: undefined,
      remember: (pending) => set({ pending }),
      take: () => {
        const { pending } = get();
        set({ pending: undefined });
        return pending;
      },
    }),
    {
      name: 'sk-pending-search',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      partialize: ({ pending }) => ({ pending }),
    },
  ),
);
