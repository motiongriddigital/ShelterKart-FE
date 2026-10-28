import { create } from 'zustand';
import type { CheckoutSession, Contact } from '@/types/checkout';

type CheckoutState = {
  session: CheckoutSession | null;
  /** Where the buyer asked for the report to be sent (demo: shown back after payment). */
  paidContact: Contact | null;
  begin: (s: CheckoutSession) => void;
  update: (patch: Partial<CheckoutSession>) => void;
  paid: (c: Contact) => void;
  end: () => void;
};

export const useCheckoutStore = create<CheckoutState>((set) => ({
  session: null,
  paidContact: null,
  begin: (session) => set({ session, paidContact: null }),
  update: (patch) => set((s) => (s.session ? { session: { ...s.session, ...patch } } : s)),
  paid: (paidContact) => set({ paidContact }),
  end: () => set({ session: null }),
}));
