import { DoodleSvg, type DoodleProps } from './DoodleSvg';

/** An empty report page with a magnifying glass: the report asked for is not here. */
export function MissingReportDoodle(props: DoodleProps) {
  return (
    <DoodleSvg {...props}>
      <path d="M50 20h60l30 30v90H50z" fill="currentColor" fillOpacity="0.08" stroke="none" />
      <path className="doodle-draw" pathLength={1} d="M50 20h60l30 30v90H50z" />
      <path className="doodle-draw doodle-late" pathLength={1} d="M110 20v30h30" />
      <path className="doodle-draw doodle-late" pathLength={1} d="M66 70h36M66 86h52M66 102h24" />
      <g className="doodle-bob">
        <circle cx="132" cy="112" r="18" fill="currentColor" fillOpacity="0.12" />
        <path d="M145 125l20 20" />
      </g>
    </DoodleSvg>
  );
}
