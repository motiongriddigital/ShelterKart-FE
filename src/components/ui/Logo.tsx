import Image from 'next/image';

// The lockup in both themes: dark ink on light pages, the on-dark artwork once the .dark class is set.
export function Logo({ priority }: { priority?: boolean }) {
  const common = {
    alt: 'ShelterKart',
    width: 907,
    height: 211,
    priority,
    unoptimized: true,
  };
  return (
    <>
      <Image
        {...common}
        src="/logo/shelterkart-lockup.svg"
        className="h-8 w-auto max-w-none dark:hidden"
      />
      <Image
        {...common}
        src="/logo/shelterkart-lockup-on-dark.svg"
        className="hidden h-8 w-auto max-w-none dark:block"
      />
    </>
  );
}
