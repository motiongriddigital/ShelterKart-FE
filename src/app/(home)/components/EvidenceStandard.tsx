import { BrandMark } from '@/components/ui/BrandMark';
import { getT } from '@/i18n/server';

type NodeProps = {
  className: string;
  label: string;
  focusable?: boolean;
  children: React.ReactNode;
};

function Node({ className, label, focusable, children }: NodeProps) {
  return (
    <div className={`evstd-node ${className}`} tabIndex={focusable ? 0 : undefined}>
      <span className="evstd-ring">{children}</span>
      <span className="evstd-label">{label}</span>
    </div>
  );
}

const iconProps = { viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true } as const;

/** The three commitments, held around the mark: traced to source, independent, transparent. */
export async function EvidenceStandard() {
  const t = await getT();
  return (
    <aside className="hero-seal-wrap" aria-label="ShelterKart Evidence Standard">
      <div className="evstd">
        <div className="evstd-stage">
          <svg
            className="evstd-arcs"
            viewBox="0 0 560 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="evstd-arc" d="M280 34 C150 34 74 118 74 196" />
            <path className="evstd-arc" d="M280 34 C410 34 486 118 486 196" />
          </svg>

          <Node className="evstd-node-top" label={t('Every claim traced to its source')}>
            <svg {...iconProps}>
              <path
                d="M7 3h6l4 4v14H7z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M13 3v4h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <circle cx="12.5" cy="14" r="2.6" stroke="currentColor" strokeWidth="1.3" />
              <path
                d="M14.6 16.1L16.6 18"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </Node>

          <div className="evstd-shield">
            <BrandMark className="evstd-icon" size={120} />
          </div>

          <Node className="evstd-node-left" label={t('Independent & unbiased')} focusable>
            <svg {...iconProps}>
              <path
                d="M12 3l7 3v5.5c0 4-2.9 7.2-7 8.5-4.1-1.3-7-4.5-7-8.5V6z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2.2 2.2L15.2 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Node>

          <Node className="evstd-node-right" label={t('Full transparency')} focusable>
            <svg {...iconProps}>
              <path
                d="M9 3h5l3 3v11H9z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M14 3v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path
                d="M6.5 6.5V20h8.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path
                d="M11 10h4M11 12.6h4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </Node>
        </div>
      </div>
    </aside>
  );
}
