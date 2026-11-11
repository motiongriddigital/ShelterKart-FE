import { cn } from '@/utils/cn';

type Building = { x: number; w: number; h: number; crane?: boolean; spire?: boolean };

// Heights and widths in a 1200 x 240 box; the ground line is y = 230.
const BUILDINGS: Building[] = [
  { x: 10, w: 70, h: 90 },
  { x: 90, w: 52, h: 150, spire: true },
  { x: 150, w: 92, h: 110 },
  { x: 252, w: 60, h: 170, crane: true },
  { x: 322, w: 80, h: 120 },
  { x: 412, w: 56, h: 190, spire: true },
  { x: 478, w: 96, h: 100 },
  { x: 584, w: 66, h: 160 },
  { x: 660, w: 84, h: 125 },
  { x: 754, w: 58, h: 185, spire: true },
  { x: 822, w: 90, h: 105 },
  { x: 922, w: 64, h: 155, crane: true },
  { x: 996, w: 80, h: 118 },
  { x: 1086, w: 56, h: 175, spire: true },
  { x: 1150, w: 44, h: 95 },
];
const GROUND = 230;

// One path per building for all its windows, so the drawing stays light in the page.
function windows({ x, w, h }: Building) {
  const cols = Math.floor((w - 14) / 14);
  const rows = Math.floor((h - 18) / 20);
  const gap = (w - cols * 8) / (cols + 1);
  let d = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      d += `M${(x + gap + c * (8 + gap)).toFixed(1)} ${GROUND - h + 14 + r * 20}h8v10h-8z`;
    }
  }
  return d;
}

const COPIES = 4;

/**
 * A skyline with construction cranes: off-plan buildings going up. The drawing keeps its proportions at a fixed
 * height and repeats along the row, so a wide screen shows more buildings instead of cropping them.
 */
export function SkylineArt({ className }: { className?: string }) {
  return (
    <div className={cn('flex overflow-hidden', className)}>
      {Array.from({ length: COPIES }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 1200 240"
          preserveAspectRatio="xMinYMax meet"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-auto shrink-0"
        >
          <path d={`M0 ${GROUND}H1200`} />
          {BUILDINGS.map((b) => (
            <g key={b.x}>
              <rect
                x={b.x}
                y={GROUND - b.h}
                width={b.w}
                height={b.h}
                rx="3"
                fill="currentColor"
                fillOpacity="0.07"
              />
              <path d={windows(b)} strokeWidth="1" />
              {b.spire && <path d={`M${b.x + b.w / 2} ${GROUND - b.h}v-22`} />}
              {b.crane && (
                <path
                  d={`M${b.x + b.w / 2} ${GROUND - b.h}v-46h46M${b.x + b.w / 2} ${GROUND - b.h - 46}l-18 8M${b.x + b.w / 2 + 40} ${GROUND - b.h - 46}v16`}
                />
              )}
            </g>
          ))}
        </svg>
      ))}
    </div>
  );
}
