import type { Metadata } from 'next';
import { DocNav } from '@/components/layout/DocNav';
import { DraftBanner } from '@/components/layout/DraftBanner';
import { AboutHero } from './components/AboutHero';
import { AssuranceSection } from './components/AssuranceSection';
import { DoctrinesSection } from './components/DoctrinesSection';
import { EntitySection } from './components/EntitySection';
import { MandateSection } from './components/MandateSection';
import { SearchCta } from './components/SearchCta';

export const metadata: Metadata = {
  title: 'About',
  description:
    'ShelterKart checks new and off-plan homes against the public record before you commit your savings.',
};

export default function AboutPage() {
  return (
    <div className="font-['Manrope_Variable',system-ui,sans-serif] [&_:is(h1,h2,h3)]:font-['Plus_Jakarta_Sans_Variable'] mx-auto max-w-[1900px] px-4 pb-14 pt-7 text-ink md:px-8 xl:px-12">
      <DraftBanner />
      <DocNav current="about" />
      <div className="space-y-10 md:space-y-12">
        <AboutHero />
        <MandateSection />
        <DoctrinesSection />
        <EntitySection />
        <AssuranceSection />
        <SearchCta />
      </div>
    </div>
  );
}
