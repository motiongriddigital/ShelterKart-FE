import type { CustomResearchInput, CustomResearchResult } from '@/types/customResearch';
import { http } from './http';

/** Researches a property by name and place. The server asks AI engines, so it takes several seconds. */
export const runCustomResearch = (input: CustomResearchInput) =>
  http<CustomResearchResult>('/api/custom/research', {
    method: 'POST',
    body: input,
    timeoutMs: 120_000,
  });
