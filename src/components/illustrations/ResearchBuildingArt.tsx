import type { SVGProps } from 'react';

/** A tower under a magnifying glass: looking closely at a building before you commit. */
export function ResearchBuildingArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 236h240" />
      <rect x="40" y="60" width="80" height="176" rx="5" fill="currentColor" fillOpacity="0.07" />
      <rect x="120" y="110" width="60" height="126" rx="5" fill="currentColor" fillOpacity="0.05" />
      <path d="M80 60V38M70 38h20" />
      <path
        d="M54 78h12v12H54zM74 78h12v12H74zM94 78h12v12H94zM54 106h12v12H54zM74 106h12v12H74zM94 106h12v12H94zM54 134h12v12H54zM74 134h12v12H74zM94 134h12v12H94zM54 162h12v12H54zM74 162h12v12H74zM94 162h12v12H94zM134 128h12v12h-12zM154 128h12v12h-12zM134 156h12v12h-12zM154 156h12v12h-12z"
        strokeWidth="1"
      />
      <path d="M72 236v-34h16v34" />
      <circle cx="168" cy="150" r="46" fill="currentColor" fillOpacity="0.06" />
      <circle cx="168" cy="150" r="36" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M201 183l34 34" strokeWidth="5" />
      <path d="M150 152l13 13 24-28" strokeWidth="3" />
    </svg>
  );
}
