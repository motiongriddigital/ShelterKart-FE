import { Logo } from '@/components/ui/Logo';
import { FOOTER_COLUMNS } from '@/constants/home';
import { getT } from '@/i18n/server';
import { NavItem } from './NavItem';

// The navy chrome again, opened by a gold rule: the page ends the way it began.
export async function SiteFooter() {
  const t = await getT();
  return (
    <footer className="border-t-2 border-gold bg-navy text-cream">
      <div className="mx-auto grid max-w-[1900px] gap-8 px-4 py-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-8 xl:px-12">
        <div>
          <Logo />
          <p className="mt-3 font-display text-lg text-cream">
            {t('The public record, before you commit.')}
          </p>
          <p className="mt-2 max-w-xs text-base leading-relaxed text-cream/75">
            {t(
              'Independent assessments of properties and the real estate developers behind them, with every claim traced to its public source.',
            )}
          </p>
          <p className="mt-3 flex items-center gap-2 text-base font-semibold text-gold">
            <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
            {t('Official land records and RERA data')}
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.title} aria-label={t(col.title)}>
            <h2 className="font-display text-lg text-gold">{t(col.title)}</h2>
            <ul className="mt-3 grid gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <NavItem
                    link={l}
                    className="cursor-pointer text-base text-cream/80 hover:text-cream hover:underline"
                  />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-cream/15 px-4 py-4 text-base text-cream/70 md:px-8 xl:px-12">
        <span className="mx-auto flex max-w-[1900px] flex-wrap justify-between gap-2">
          <span>{t('Every fact comes from an official public record.')} · © 2026</span>
        </span>
      </p>
    </footer>
  );
}
