import { z } from 'zod';

// Shape of GET /api/markets (backend/server.js): one row per market with its live research depth.
export const MarketStatusSchema = z.object({
  code: z.string(),
  label: z.string(),
  status: z.string().optional(),
  depth: z.string().optional(),
  note: z.string().optional(),
});
export type MarketStatus = z.infer<typeof MarketStatusSchema>;
