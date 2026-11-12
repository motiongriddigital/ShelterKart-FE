/**
 * The brand mark: a document with a folded corner, in cream and gold, for navy surfaces. With `animated` the page
 * outline traces itself in, then the fold and the lines appear, once (see the anim- classes in tailwind.css).
 */
export function DocumentMark({
  size = 56,
  className,
  animated,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={`${animated ? 'anim-rise ' : ''}${className ?? ''}`}
    >
      <path
        d="M15 6H40L50 16V58H15Z"
        stroke="#F5E6C2"
        strokeWidth="3.4"
        strokeLinejoin="round"
        className={animated ? 'anim-trace' : undefined}
      />
      <path
        d="M40 6V16H50"
        fill="#D3A245"
        stroke="#D3A245"
        strokeWidth="2.4"
        strokeLinejoin="round"
        className={animated ? 'anim-fold' : undefined}
      />
      <path
        d="M24 30H41M24 40H41"
        stroke="#F5E6C2"
        strokeWidth="3.4"
        strokeLinecap="round"
        className={animated ? 'anim-lines' : undefined}
      />
    </svg>
  );
}
