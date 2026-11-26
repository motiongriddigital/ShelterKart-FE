import { DoodleSvg, type DoodleProps } from './DoodleSvg';

/** A house with a question mark over it: a page that is not here. */
export function LostHouseDoodle(props: DoodleProps) {
  return (
    <DoodleSvg {...props}>
      <path d="M50 140V84l50-44 50 44v56z" fill="currentColor" fillOpacity="0.08" stroke="none" />
      <path className="doodle-draw" pathLength={1} d="M20 140h160" />
      <path className="doodle-draw" pathLength={1} d="M50 140V84l50-44 50 44v56" />
      <path className="doodle-draw doodle-late" pathLength={1} d="M88 140v-30h24v30" />
      <path className="doodle-draw doodle-late" pathLength={1} d="M60 98h16v14H60z" />
      <g className="doodle-bob">
        <path d="M150 34c0-12 20-12 20 1 0 9-10 10-10 20" />
        <circle cx="160" cy="68" r="1.5" />
      </g>
    </DoodleSvg>
  );
}
