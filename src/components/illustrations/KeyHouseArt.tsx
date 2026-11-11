import type { SVGProps } from 'react';

/** A house with a key: the home you are about to buy. */
export function KeyHouseArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 200h180" />
      <path d="M40 200v-84l70-62 70 62v84z" fill="currentColor" fillOpacity="0.06" />
      <path d="M26 118L110 44l84 74" />
      <path d="M150 70V46h18v40" />
      <path d="M92 200v-52h36v52" />
      <path d="M58 128h24v24H58zM138 128h24v24h-24z" strokeWidth="1.2" />
      <path d="M70 128v24M58 140h24M150 128v24M138 140h24" strokeWidth="1" />
      <circle cx="165" cy="190" r="16" fill="currentColor" fillOpacity="0.1" />
      <circle cx="165" cy="190" r="6" strokeWidth="1.2" />
      <path d="M181 190h30v10M199 190v8" strokeWidth="1.5" />
    </svg>
  );
}
