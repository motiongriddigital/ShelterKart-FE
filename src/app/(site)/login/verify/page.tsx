import type { Metadata } from 'next';
import { BlueprintArt } from '@/components/illustrations/BlueprintArt';
import { Decor } from '@/components/illustrations/Decor';
import { DocumentSealArt } from '@/components/illustrations/DocumentSealArt';
import { SkylineArt } from '@/components/illustrations/SkylineArt';
import { VerifyCard } from './components/VerifyCard';

export const metadata: Metadata = {
  title: 'Enter your code',
  description: 'Enter the 6-digit code we sent to your email.',
  robots: { index: false, follow: false },
};

// The second step of signing in, on the V2 navy plate. The email shown is the one typed on the sign-in page.
export default function VerifyCodePage() {
  return (
    <div className="relative overflow-x-clip bg-navy px-4 pb-40 pt-10 md:px-8 md:pb-48 md:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(211,162,69,0.14),transparent_65%)]"
      />
      <Decor className="inset-x-0 bottom-0">
        <SkylineArt className="h-24 w-full text-cream/15 md:h-36" />
      </Decor>
      <Decor className="start-8 top-32 hidden w-56 -rotate-3 xl:block">
        <BlueprintArt className="w-full text-cream/15" />
      </Decor>
      <Decor className="end-12 top-28 hidden w-44 xl:block">
        <DocumentSealArt className="w-full text-cream/15" />
      </Decor>
      <div className="relative">
        <VerifyCard />
      </div>
    </div>
  );
}
