import { Logo } from '@/components/ui/Logo';
import { FOOTER_COLUMNS } from '@/constants/home';
import { getT } from '@/i18n/server';
import { NavItem } from './NavItem';

export async function SiteFooter() {
  const t = await getT();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-[1900px] gap-8 px-4 py-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-8 xl:px-12">
        <div>
          <Logo />
          <p className="mt-3 text-base font-semibold text-slate-800">
            {t('The public record, before you commit.')}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
            {t(
              'Independent assessments of properties and the real estate developers behind them, with every claim traced to its public source.',
            )}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {t('Official land records and RERA data')}
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.title} aria-label={t(col.title)}>
            <h2 className="text-base font-bold text-slate-900">{t(col.title)}</h2>
            <ul className="mt-3 grid gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <NavItem
                    link={l}
                    className="cursor-pointer text-base text-slate-700 hover:text-slate-900 hover:underline"
                  />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-slate-100 px-4 py-4 text-sm text-slate-600 md:px-8 xl:px-12">
        <span className="mx-auto flex max-w-[1900px] flex-wrap justify-between gap-2">
          <span>{t('Every fact comes from an official public record.')} · © 2026</span>
        </span>
      </p>
    </footer>
  );
}
