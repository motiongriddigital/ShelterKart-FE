import Image from 'next/image';
import { cn } from '@/utils/cn';

// The site is dark only, so the lockup is always the on-dark artwork.
export function Logo({ priority, className }: { priority?: boolean; className?: string }) {
  return (
    <Image
      alt="ShelterKart"
      width={907}
      height={211}
      priority={priority}
      unoptimized
      src="/logo/shelterkart-lockup-on-dark.svg"
      className={cn('h-8 w-auto max-w-none', className)}
    />
  );
}
