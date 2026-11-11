import type { SVGProps } from 'react';

/** A floor plan with dimension lines: the "plans" a property is checked against. */
export function BlueprintArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="20" y="30" width="280" height="180" rx="6" fill="currentColor" fillOpacity="0.05" />
      <path d="M150 30v70M150 140v70M20 120h90M150 120h150" />
      <path d="M110 120a24 24 0 0 0-24-24M150 100a24 24 0 0 1 24 24" strokeDasharray="3 3" />
      <path d="M20 95v50M300 150v35" strokeWidth="4" strokeOpacity="0.5" />
      <circle cx="220" cy="75" r="20" />
      <path d="M205 75h30M220 60v30" strokeWidth="1" />
      <rect x="36" y="160" width="46" height="34" rx="4" />
      <path d="M36 172h46" strokeWidth="1" />
      <path d="M180 160h100M180 176h100M180 192h100" strokeWidth="1" strokeDasharray="2 5" />
      <path d="M20 14h280M20 8v12M300 8v12M12 30v180M6 30h12M6 210h12" strokeWidth="1" />
      <path d="M26 226h60M26 221v10M86 221v10" strokeWidth="1" />
    </svg>
  );
}
