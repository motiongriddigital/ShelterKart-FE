import { http } from './http';
import { MarketSchema } from '@/types/market';
import { z } from 'zod';

export async function getMarkets() {
  const data = await http<unknown>('/api/markets', {
    next: { revalidate: 3600, tags: ['markets'] },
  });
  const list = Array.isArray(data) ? data : ((data as { markets?: unknown })?.markets ?? []);
  return z.array(MarketSchema).parse(list);
}
