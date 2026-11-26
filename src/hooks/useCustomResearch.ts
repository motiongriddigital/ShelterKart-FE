'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { DEFAULT_RESEARCH_LOCATION } from '@/constants/research';
import { useT } from '@/hooks/useT';
import { runCustomResearch } from '@/services/customResearch';
import { useCustomResearchStore } from '@/store/customResearch';
import { usePreferences } from '@/store/preferences';
import { failureMessage, isAuthRequired } from '@/utils/apiErrors';

/** A city option such as "All cities" is a filter, not a place to research. */
const isRealPlace = (city: string) => Boolean(city) && !/^(All |Developer coverage)/.test(city);

/**
 * Researches a property: `search` asks the server (service), keeps the report (state) and opens its page. It returns
 * the message to show when the search fails, and nothing when it works. A 401 `auth_required` calls `onAuthRequired`
 * instead, so the caller can send the reader to sign in.
 */
export function useCustomResearch() {
  const t = useT();
  const router = useRouter();
  const busy = useCustomResearchStore((s) => s.busy);
  const { start, succeed, fail } = useCustomResearchStore.getState();

  const search = useCallback(
    async (query: string, onAuthRequired?: () => void): Promise<string | undefined> => {
      const { city } = usePreferences.getState();
      start();
      try {
        const result = await runCustomResearch({
          query,
          location: isRealPlace(city) ? city : DEFAULT_RESEARCH_LOCATION,
          tier: 'free',
        });
        if (!result.ok || !result.ref) throw new Error('RESEARCH_FAILED');
        succeed(result);
        router.push(`/report/${encodeURIComponent(result.ref)}`);
      } catch (e) {
        fail();
        if (isAuthRequired(e) && onAuthRequired) return void onAuthRequired();
        return (e as Error).message === 'RESEARCH_FAILED'
          ? t('The research could not be completed. Please try again.')
          : failureMessage(e, t);
      }
    },
    [router, start, succeed, fail, t],
  );

  return { search, busy };
}
