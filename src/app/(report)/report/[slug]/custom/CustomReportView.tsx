'use client';
import { useEffect, useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { CUSTOM_REPORT_SECTIONS } from '@/constants/reportSections';
import { useCustomResearchStore } from '@/store/customResearch';
import { ReportNav } from '../components/ReportNav';
import { CustomDifferences } from './CustomDifferences';
import { CustomHero } from './CustomHero';
import { CustomKeyFacts } from './CustomKeyFacts';
import { CustomPricing } from './CustomPricing';
import { CustomQuestions } from './CustomQuestions';

/** A report made from a research search: read from the store, which keeps it in this tab's session storage. */
export function CustomReportView({ reportRef }: { reportRef: string }) {
  const report = useCustomResearchStore((s) => s.reports[reportRef]);
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    // Session storage can only be read in the browser.
    void Promise.resolve(useCustomResearchStore.persist.rehydrate()).then(() =>
      setRehydrated(true),
    );
  }, []);

  if (!report) {
    return (
      <main>
        {rehydrated ? (
          <EmptyState kind="missingReport" />
        ) : (
          <p className="px-4 py-24 text-center text-lg text-slate-700">Loading the report…</p>
        )}
      </main>
    );
  }

  // The bar lists only the parts this report has: a search may find no key facts or no prices.
  const present: Record<string, boolean> = {
    summary: true,
    facts: report.keyFacts.length > 0,
    differences: true,
    questions: report.questions.length > 0,
    pricing: report.pricing.length > 0,
  };

  return (
    <>
      <ReportNav sections={CUSTOM_REPORT_SECTIONS.filter((s) => present[s.id])} />
      <main className="pb-16">
        <CustomHero report={report} />
        <CustomKeyFacts facts={report.keyFacts} />
        <CustomDifferences differences={report.differences} />
        {present.questions && <CustomQuestions questions={report.questions} />}
        <CustomPricing rows={report.pricing} />
        <p className="mx-auto mt-14 max-w-[1900px] px-4 text-base text-slate-700 md:px-8 xl:px-12">
          This report is research, not advice. Report reference: {report.ref}. Prepared{' '}
          {new Date(report.generatedAt).toLocaleDateString()}.
        </p>
      </main>
    </>
  );
}
