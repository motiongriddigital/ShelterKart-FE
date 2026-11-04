type Props = { className?: string };

/** The ShelterKart document mark and wordmark, drawn for the light console surface. */
export function AdminLogo({ className }: Props) {
  return (
    <span className={`flex items-center gap-2 ${className ?? ''}`}>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={26}
        height={26}
        className="shrink-0"
      >
        <path
          d="M15 6 H40 L50 16 V58 H15 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.6"
          strokeLinejoin="round"
        />
        <path
          d="M40 6 V16 H50"
          fill="#D3A245"
          stroke="#D3A245"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M23 30 H42 M23 40 H42"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[15px] font-semibold leading-none tracking-tight">
        Shelter<span className="text-[#BC6055]">Kart</span>
        <span className="ml-1.5 text-xs font-medium text-muted-foreground">Admin</span>
      </span>
    </span>
  );
}
