import type { ReactNode } from 'react';
import { BlueprintArt } from '@/components/illustrations/BlueprintArt';
import { Decor } from '@/components/illustrations/Decor';
import { ResearchBuildingArt } from '@/components/illustrations/ResearchBuildingArt';
import { SkylineArt } from '@/components/illustrations/SkylineArt';
import { MotionStarter } from './MotionStarter';

const CORNERS = [
  'start-3 top-3 border-s-2 border-t-2',
  'end-3 top-3 border-e-2 border-t-2',
  'start-3 bottom-3 border-s-2 border-b-2',
  'end-3 bottom-3 border-e-2 border-b-2',
];

/** The navy plate the whole first page sits on: gold corner marks, a soft glow, and the skyline along the bottom. */
export function Plate({ children }: { children: ReactNode }) {
  return (
    <div id="landing" className="relative overflow-x-clip bg-navy">
      <MotionStarter />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(211,162,69,0.14),transparent_65%)]"
      />
      {CORNERS.map((c) => (
        <Decor key={c} className={`size-8 border-gold/50 ${c}`}>
          <span />
        </Decor>
      ))}
      <Decor className="inset-x-0 bottom-0">
        <SkylineArt className="h-24 w-full text-cream/15 md:h-36" />
      </Decor>
      <Decor className="start-6 top-[30rem] hidden w-56 -rotate-3 xl:block xl:start-12">
        <BlueprintArt className="w-full text-cream/15" />
      </Decor>
      <Decor className="end-6 top-[28rem] hidden w-52 xl:block xl:end-12">
        <ResearchBuildingArt className="w-full text-cream/15" />
      </Decor>
      <div className="relative pb-32 md:pb-44">{children}</div>
    </div>
  );
}
