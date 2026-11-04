import Link from 'next/link';
import { DOC_LINKS, type DocSlug } from '@/constants/navigation';

export function DocNav({ current }: { current: DocSlug }) {
  return (
    <nav className="mb-[1.4rem] text-sm text-slate" aria-label="About and policies">
      <ul className="m-0 flex list-none flex-wrap gap-x-3 gap-y-1 p-0">
        {DOC_LINKS.map(({ slug, label }) => (
          <li key={slug}>
            {slug === current ? (
              <strong aria-current="page">{label}</strong>
            ) : (
              <Link href={`/${slug}`} className="text-inference">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
