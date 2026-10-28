import { MARKET_ORDER, MARKETS } from '@/constants/markets';
import type { Market, MarketCode } from '@/types/market';

/** Markets in display order (largest first); any market not in MARKET_ORDER follows at the end. */
export function orderedMarkets(): Market[] {
  const listed = MARKET_ORDER.filter((k) => MARKETS[k]);
  const rest = (Object.keys(MARKETS) as MarketCode[]).filter((k) => !MARKET_ORDER.includes(k));
  return [...listed, ...rest].map((k) => MARKETS[k]);
}
