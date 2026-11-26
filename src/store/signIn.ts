import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CODE_LENGTH, RESEND_SECONDS } from '@/constants/verify';
import type { SessionUser } from '@/types/auth';

type SignInState = {
  /** The address a code was asked for; the verify page shows it. */
  email?: string;
  /** The page to open after the code is accepted (`?next=` on the sign-in page). */
  next?: string;
  /** The terms box ticked on the sign-in page; the verify step sends it with the code. */
  acceptedTerms: boolean;
  /** What the server said about the code it sent: how many digits, and how long until a new one can be asked for. */
  codeLength: number;
  cooldownSeconds: number;
  /** The signed-in user, once the code is accepted. Kept in memory only. */
  user?: SessionUser;
  startVerification: (v: {
    email: string;
    acceptedTerms: boolean;
    next?: string;
    codeLength?: number;
    cooldownSeconds?: number;
  }) => void;
  signedIn: (user: SessionUser) => void;
  clear: () => void;
};

const FRESH = {
  email: undefined,
  next: undefined,
  acceptedTerms: false,
  codeLength: CODE_LENGTH,
  cooldownSeconds: RESEND_SECONDS,
};

// The pending sign-in is held in this tab's session storage (not in the address bar), so the verify page still knows
// the email after a refresh. Hydration is manual: the page calls `useSignIn.persist.rehydrate()` after mount, so the
// server and client render the same first frame. The signed-in user is not stored here: the session cookie is.
export const useSignIn = create<SignInState>()(
  persist(
    (set) => ({
      ...FRESH,
      user: undefined,
      startVerification: ({ email, acceptedTerms, next, codeLength, cooldownSeconds }) =>
        set({
          email,
          acceptedTerms,
          next,
          codeLength: codeLength ?? CODE_LENGTH,
          cooldownSeconds: cooldownSeconds ?? RESEND_SECONDS,
        }),
      signedIn: (user) => set({ ...FRESH, user }),
      clear: () => set({ ...FRESH, user: undefined }),
    }),
    {
      name: 'sk-sign-in',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
      partialize: ({ email, acceptedTerms, next, codeLength, cooldownSeconds }) => ({
        email,
        acceptedTerms,
        next,
        codeLength,
        cooldownSeconds,
      }),
    },
  ),
);
