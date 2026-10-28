import { FLAG_SVG } from '@/constants/flags';
import type { MarketCode } from '@/types/market';

/** National flag as inline SVG. The markup is static and trusted (constants/flags.ts), never user input. */
export function Flag({ code, className }: { code: MarketCode; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: FLAG_SVG[code] ?? '' }} />;
}
