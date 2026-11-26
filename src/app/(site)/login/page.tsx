import type { Metadata } from 'next';
import { BlueprintArt } from '@/components/illustrations/BlueprintArt';
import { Decor } from '@/components/illustrations/Decor';
import { KeyHouseArt } from '@/components/illustrations/KeyHouseArt';
import { SkylineArt } from '@/components/illustrations/SkylineArt';
import { safeNextPath } from '@/utils/validators';
import { LoginCard } from './components/LoginCard';

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to ShelterKart to see your unlocked reports.',
  robots: { index: false, follow: false },
};

// The sign-in page: the V2 navy plate with the card in the middle. Layout, header, footer and dialogs come from the
// site layout. `?next=` is where to go after signing in (the back end sends signed-out visitors here from /r/:ref).
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeNextPath((await searchParams).next);
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
      <Decor className="end-12 top-28 hidden w-48 xl:block">
        <KeyHouseArt className="w-full text-cream/15" />
      </Decor>
      <div className="relative">
        <LoginCard next={next} />
      </div>
    </div>
  );
}
