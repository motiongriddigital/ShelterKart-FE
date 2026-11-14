import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CODE_LENGTH, RESEND_SECONDS } from '@/constants/verify';
import type { SessionUser } from '@/types/auth';

type SignInState = {
  /** The address a code was asked for; the verify page shows it. */
  email?: string;
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
    codeLength?: number;
    cooldownSeconds?: number;
  }) => void;
  signedIn: (user: SessionUser) => void;
  clear: () => void;
};

const FRESH = {
  email: undefined,
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
      startVerification: ({ email, acceptedTerms, codeLength, cooldownSeconds }) =>
        set({
          email,
          acceptedTerms,
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
      partialize: ({ email, acceptedTerms, codeLength, cooldownSeconds }) => ({
        email,
        acceptedTerms,
        codeLength,
        cooldownSeconds,
      }),
    },
  ),
);
