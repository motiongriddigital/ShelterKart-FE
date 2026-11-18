import { ExternalLink } from 'lucide-react';

/** A link to the page a fact came from; it opens in a new tab. */
export function SourceLink({ href, label = 'See the source' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-base font-semibold text-blue-700 underline underline-offset-2"
    >
      {label}
      <ExternalLink className="size-4" aria-hidden="true" />
    </a>
  );
}
