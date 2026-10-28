import { http } from './http';
import { MarketStatusSchema } from '@/types/marketApi';
import { z } from 'zod';

export async function getMarketStatuses() {
  const data = await http<unknown>('/api/markets', {
    next: { revalidate: 3600, tags: ['markets'] },
  });
  return z.array(MarketStatusSchema).parse(data);
}
