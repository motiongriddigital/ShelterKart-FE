import type { SVGProps } from 'react';

/** A registry document with a verification seal: a fact traced to its official record. */
export function DocumentSealArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 280"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M40 20h110l50 50v190H40z" fill="currentColor" fillOpacity="0.06" />
      <path d="M150 20v50h50" />
      <path d="M62 52l16-14 16 14v16H62zM72 68v-8h12v8" strokeWidth="1.2" />
      <path d="M62 100h110M62 118h130M62 136h96M62 154h120M62 172h80" strokeWidth="1.2" />
      <path d="M62 200h70" strokeWidth="1.2" strokeDasharray="3 4" />
      <circle cx="160" cy="214" r="30" fill="currentColor" fillOpacity="0.08" />
      <circle cx="160" cy="214" r="22" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M148 214l9 9 16-18" strokeWidth="3" />
      <path d="M142 240l-8 24 18-9 8 14 4-26M178 240l8 24-18-9-8 14" strokeWidth="1.2" />
    </svg>
  );
}
