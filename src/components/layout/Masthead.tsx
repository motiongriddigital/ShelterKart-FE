import Image from 'next/image';
import Link from 'next/link';

export function Masthead() {
  return (
    <header className="border-b-2 border-gold bg-navy px-5 py-3.5">
      <Link href="/" className="inline-block leading-none" aria-label="ShelterKart home">
        {/* SVG lockup for dark surfaces; unoptimized because it is already vector */}
        <Image
          src="/logo/shelterkart-lockup-on-dark.svg"
          alt="ShelterKart"
          width={150}
          height={35}
          priority
          unoptimized
          className="h-[2.1rem] w-auto max-w-none"
        />
      </Link>
    </header>
  );
}
