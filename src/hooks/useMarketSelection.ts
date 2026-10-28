'use client';
import { useCallback } from 'react';
import { MARKETS } from '@/constants/markets';
import { usePreferences } from '@/store/preferences';
import type { MarketCode } from '@/types/market';

export function useMarketSelection() {
  const market = usePreferences((s) => s.market);
  const city = usePreferences((s) => s.city);
  const setMarket = usePreferences((s) => s.setMarket);
  const setCity = usePreferences((s) => s.setCity);

  const select = useCallback((code: MarketCode) => setMarket(code), [setMarket]);

  return {
    market,
    city,
    cities: MARKETS[market].cities,
    label: MARKETS[market].label,
    select,
    setCity,
  };
}
