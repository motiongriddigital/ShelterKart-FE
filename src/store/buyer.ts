import { create } from 'zustand';
import { PRICING_COUNTRIES } from '@/constants/pricingCountries';
import type { PricingCountry } from '@/types/checkout';

type BuyerState = {
  country: string;
  source: 'default' | 'selected' | 'network';
  countries: PricingCountry[];
  set: (patch: Partial<Pick<BuyerState, 'country' | 'source' | 'countries'>>) => void;
};

export const useBuyer = create<BuyerState>((set) => ({
  country: '',
  source: 'default',
  countries: PRICING_COUNTRIES,
  set: (patch) => set(patch),
}));
