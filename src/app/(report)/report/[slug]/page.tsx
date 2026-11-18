import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROPERTY_REPORTS, propertyReportBySlug } from '@/constants/propertyReports';
import { DiscrepancySection } from './components/DiscrepancySection';
import { DueDiligenceMatrix } from './components/DueDiligenceMatrix';
import { NumbersSection } from './components/NumbersSection';
import { QuestionSection } from './components/QuestionSection';
import { ReportDisclaimer } from './components/ReportDisclaimer';
import { ReportActions } from './components/ReportActions';
import { ReportHero } from './components/ReportHero';
import { ReportNav } from './components/ReportNav';
import { ReportTopBar } from './components/ReportTopBar';
import { SourcesSection } from './components/SourcesSection';
import { CustomReportView } from './custom/CustomReportView';
import { WhatItMeans } from './components/WhatItMeans';

const isResearchRef = (slug: string) => /^CR-[A-Z0-9]+$/i.test(slug);

type Params = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => Object.keys(PROPERTY_REPORTS).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (isResearchRef(slug)) return { title: 'Property research' };
  const report = propertyReportBySlug(slug);
  return report
    ? { title: `${report.name} · Public audit record`, description: report.headline }
    : {};
}

export default async function PropertyReportPage({ params }: Params) {
  const { slug } = await params;
  // A research search opens at its own reference; the named sample reports keep their pages.
  if (isResearchRef(slug)) return <CustomReportView reportRef={slug} />;
  const report = propertyReportBySlug(slug);
  if (!report) notFound();

  return (
    <>
      <ReportTopBar report={report} />
      <ReportNav />
      <main>
        <ReportActions report={report} />
        <ReportHero report={report} />
        <WhatItMeans report={report} />
        <DiscrepancySection report={report} />
        <QuestionSection report={report} />
        <NumbersSection report={report} />
        <DueDiligenceMatrix checklist={report.checklist} />
        <SourcesSection report={report} />
        <ReportDisclaimer report={report} />
      </main>
    </>
  );
}
