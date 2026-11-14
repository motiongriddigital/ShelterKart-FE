import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SignInState = {
  /** The address a code was asked for; the verify page shows it. */
  email?: string;
  setEmail: (email: string) => void;
  clear: () => void;
};

// Held in this tab's session storage (not in the address bar), so the verify page still knows the email after a
// refresh. Hydration is manual: the page calls `useSignIn.persist.rehydrate()` after mount, so the server and client
// render the same first frame.
export const useSignIn = create<SignInState>()(
  persist(
    (set) => ({
      email: undefined,
      setEmail: (email) => set({ email }),
      clear: () => set({ email: undefined }),
    }),
    {
      name: 'sk-sign-in',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    },
  ),
);
