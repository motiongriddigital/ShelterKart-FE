import type { Metadata } from 'next';
import { WIRE_BLOCKS } from '@/constants/reportWireframe';
import { ResponseShape } from './components/ResponseShape';
import { WireSection } from './components/WireSection';

export const metadata: Metadata = {
  title: 'Report wireframe',
  description: 'The structure of a property report and the data each part needs.',
};

// A wireframe, not a report: it shows where each field from the backend goes. It has no real data.
export default function ReportWireframePage() {
  return (
    <main className="mx-auto max-w-[1900px] px-4 pb-16 pt-8 md:px-8 xl:px-12">
      <header className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-base font-bold text-blue-700">Wireframe, not a real report</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Property report: structure and data
        </h1>
        <p className="mt-2 max-w-3xl text-lg text-slate-700">
          Each dashed card is a part of the page. The names inside are the fields the backend sends.
          Grey bars show how much text fits.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {WIRE_BLOCKS.map((b, i) => (
          <WireSection key={b.id} block={b} index={i} />
        ))}
      </div>

      <ResponseShape />
    </main>
  );
}
