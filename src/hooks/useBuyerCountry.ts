'use client';
import { useCallback, useEffect } from 'react';
import { getPricingCountries } from '@/app/_api/research';
import { IS_DEMO } from '@/configs/env';
import { useBuyer } from '@/store/buyer';
import { readStored, writeStored } from '@/utils/storage';

const KEY = 'sk_country';
const REMEMBER_DAYS = 30;

function storedChoice(): string {
  const raw = readStored(KEY);
  if (!raw) return '';
  try {
    const v = JSON.parse(raw) as { iso?: string; at?: number };
    if (v.iso && /^[A-Z]{2}$/.test(v.iso) && Date.now() - (v.at ?? 0) < REMEMBER_DAYS * 864e5)
      return v.iso;
  } catch {
    /* ignore a damaged value */
  }
  writeStored(KEY, '');
  return '';
}

/** The buyer's country: a remembered choice, else the network's guess (live), else the browser's language region. */
export function useBuyerCountry() {
  const { country, countries, set } = useBuyer();

  useEffect(() => {
    if (useBuyer.getState().country) return; // already settled this session
    let live = true;
    (async () => {
      const chosen = storedChoice();
      if (chosen) set({ country: chosen, source: 'selected' });
      let list = useBuyer.getState().countries;
      let network = '';
      if (!IS_DEMO) {
        try {
          const d = await getPricingCountries();
          if (d.ok) {
            list = d.countries;
            network = d.network ?? '';
          }
        } catch {
          /* the built-in list is used */
        }
      }
      if (!live) return;
      set({ countries: list });
      if (chosen) return;
      const fromBrowser = navigator.languages
        ?.map((l) => /-([A-Za-z]{2})$/.exec(l)?.[1]?.toUpperCase())
        .find((iso) => iso && list.some((c) => c.iso === iso));
      const guess = list.some((c) => c.iso === network) ? network : (fromBrowser ?? '');
      if (guess) set({ country: guess, source: 'network' });
    })();
    return () => {
      live = false;
    };
  }, [set]);

  const choose = useCallback(
    (iso: string) => {
      if (!countries.some((c) => c.iso === iso)) return;
      writeStored(KEY, JSON.stringify({ iso, at: Date.now() }));
      set({ country: iso, source: 'selected' });
    },
    [countries, set],
  );

  return { country, countries, choose };
}
