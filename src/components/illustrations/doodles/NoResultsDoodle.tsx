import { DoodleSvg, type DoodleProps } from './DoodleSvg';

/** A magnifying glass over a list with nothing on it: a search that found nothing. */
export function NoResultsDoodle(props: DoodleProps) {
  return (
    <DoodleSvg {...props}>
      <rect x="30" y="26" width="110" height="22" rx="6" className="doodle-draw" pathLength={1} />
      <rect
        x="30"
        y="58"
        width="110"
        height="22"
        rx="6"
        className="doodle-draw doodle-late"
        pathLength={1}
      />
      <rect
        x="30"
        y="90"
        width="110"
        height="22"
        rx="6"
        className="doodle-draw doodle-late"
        pathLength={1}
      />
      <g className="doodle-bob">
        <circle cx="138" cy="106" r="20" fill="currentColor" fillOpacity="0.12" />
        <path d="M130 106h16M153 121l20 20" />
      </g>
    </DoodleSvg>
  );
}
