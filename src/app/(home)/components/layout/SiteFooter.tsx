import Image from 'next/image';
import { FOOTER_COLUMNS } from '@/constants/home';
import { getT } from '@/i18n/server';
import { NavItem } from './NavItem';

export async function SiteFooter() {
  const t = await getT();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-[1900px] gap-8 px-4 py-10 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-8 xl:px-12">
        <div>
          <Image
            src="/logo/shelterkart-lockup.svg"
            alt="ShelterKart"
            width={907}
            height={211}
            unoptimized
            className="h-8 w-auto max-w-none"
          />
          <p className="mt-3 text-sm font-semibold text-slate-800">
            {t('The public record, before you commit.')}
          </p>
          <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500">
            {t(
              'Independent assessments of properties and the real estate developers behind them, with every claim traced to its public source.',
            )}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {t('Statutory land registry & RERA data network')}
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.title} aria-label={t(col.title)}>
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {t(col.title)}
            </h2>
            <ul className="mt-3 grid gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <NavItem
                    link={l}
                    className="cursor-pointer text-xs text-slate-600 hover:text-slate-900 hover:underline"
                  />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-slate-100 px-4 py-4 text-[10px] text-slate-400 md:px-8 xl:px-12">
        <span className="mx-auto flex max-w-[1900px] flex-wrap justify-between gap-2">
          <span>{t('Every claim traced to its public source')} · © 2026</span>
          <span>{t('ShelterKart Institutional Trust v4.2')}</span>
        </span>
      </p>
    </footer>
  );
}
