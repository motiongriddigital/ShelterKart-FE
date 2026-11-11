import type { SVGProps } from 'react';

/** A parcel map with a location pin and compass: the land a property stands on. */
export function LandPlotArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 300 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 190L110 150l170 30-90 46z" fill="currentColor" fillOpacity="0.06" />
      <path d="M20 190L110 150M110 150l170 30M280 180l-90 46M190 226L20 190" />
      <path
        d="M65 170l90 26M155 196l-45-46M110 150l50-17 60 12M155 196l35 30M230 160l-40 66"
        strokeWidth="1"
      />
      <path
        d="M150 168l50 8-18 12-52-9z"
        fill="currentColor"
        fillOpacity="0.12"
        strokeDasharray="3 3"
      />
      <path
        d="M170 60c-17 0-30 13-30 30 0 22 30 52 30 52s30-30 30-52c0-17-13-30-30-30z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <circle cx="170" cy="90" r="11" />
      <path d="M170 142v22" strokeDasharray="2 4" />
      <circle cx="256" cy="50" r="22" strokeWidth="1" />
      <path d="M256 32v36M238 50h36" strokeWidth="1" />
      <path d="M256 36l5 14h-10z" fill="currentColor" />
    </svg>
  );
}
