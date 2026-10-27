import { z } from 'zod';

// Loose on purpose until the /api/markets contract is pinned down in phase 3.
export const MarketSchema = z
  .object({ code: z.string().optional(), name: z.string().optional() })
  .passthrough();
export type Market = z.infer<typeof MarketSchema>;
