import { FileSearch, FileText, ShieldCheck, type LucideIcon } from 'lucide-react';
import { DocumentMark } from '@/components/illustrations/DocumentMark';
import { EVIDENCE_NODES } from '@/constants/home';
import { getT } from '@/i18n/server';
import type { EvidenceNode } from '@/types/home';
import { cn } from '@/utils/cn';

const ICONS: Record<EvidenceNode['icon'], LucideIcon> = {
  source: FileSearch,
  shield: ShieldCheck,
  open: FileText,
};

// Where each node sits around the document: the first on top, the others on either side of its base.
const POSITION = [
  'left-1/2 top-0 -translate-x-1/2',
  'bottom-2 start-[4%] md:start-[8%]',
  'bottom-2 end-[4%] md:end-[8%]',
];

/** The three commitments, drawn as a seal: a document held between three nodes joined by two arcs. */
export async function EvidenceStandard() {
  const t = await getT();
  return (
    <aside
      aria-label="ShelterKart Evidence Standard"
      className="relative mx-auto mt-8 h-80 w-full max-w-xl px-4"
    >
      <svg
        viewBox="0 0 560 300"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 size-full text-gold/40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path className="anim-arc" d="M280 34C150 34 74 118 74 196" />
        <path className="anim-arc" d="M280 34C410 34 486 118 486 196" />
      </svg>

      <div className="absolute left-1/2 top-24 -translate-x-1/2">
        <DocumentMark animated size={120} />
      </div>

      {EVIDENCE_NODES.map((n, i) => {
        const Icon = ICONS[n.icon];
        return (
          <div
            key={n.label}
            className={cn(
              'absolute flex w-36 flex-col items-center gap-2 text-center',
              `anim-node-${i}`,
              POSITION[i],
            )}
          >
            <span className="grid size-12 place-items-center rounded-full border border-gold/60 bg-navy text-gold">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold leading-snug text-cream">{t(n.label)}</span>
          </div>
        );
      })}
    </aside>
  );
}
