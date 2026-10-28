type Props = { className?: string; size: number };

/** The ShelterKart document mark: cream outline, gold fold, two rules. */
export function BrandMark({ className, size }: Props) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
    >
      <path
        d="M15 6 H40 L50 16 V58 H15 Z"
        fill="none"
        stroke="#F5E6C2"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <path
        d="M40 6 V16 H50"
        fill="#D3A245"
        stroke="#D3A245"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path d="M23 30 H42 M23 40 H42" stroke="#F5E6C2" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
