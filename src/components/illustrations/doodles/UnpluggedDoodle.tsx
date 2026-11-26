import { DoodleSvg, type DoodleProps } from './DoodleSvg';

/** A plug that has come out of its socket: something went wrong and a retry is the way on. */
export function UnpluggedDoodle(props: DoodleProps) {
  return (
    <DoodleSvg {...props}>
      <rect x="24" y="60" width="44" height="44" rx="8" className="doodle-draw" pathLength={1} />
      <path className="doodle-draw doodle-late" pathLength={1} d="M42 74v10M56 74v10" />
      <rect x="112" y="60" width="38" height="44" rx="8" className="doodle-draw" pathLength={1} />
      <path
        className="doodle-draw doodle-late"
        pathLength={1}
        d="M112 72h-14M112 92h-14M150 82c22 0 18 34 34 34"
      />
      <path className="doodle-bob" d="M80 56l8 12-10 6 10 12" />
    </DoodleSvg>
  );
}
