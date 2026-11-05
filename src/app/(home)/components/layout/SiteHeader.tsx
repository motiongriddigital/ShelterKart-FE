import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { MARKETS } from '@/constants/markets';
import { HEADER_LINKS } from '@/constants/home';
import { getT } from '@/i18n/server';
import { buttonVariants } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AccountButton } from './AccountButton';
import { NavItem } from './NavItem';

const NAV = 'text-[13px] font-medium text-slate-600 transition-colors hover:text-slate-900';

export async function SiteHeader() {
  const t = await getT();
  const count = Object.keys(MARKETS).length;
  const links = HEADER_LINKS.map((l) =>
    'href' in l && l.href === '#markets' ? { ...l, label: t('{n} Markets', { n: count }) } : l,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1900px] items-center gap-4 px-4 py-3 md:px-8 xl:px-12">
        <Link href="/" aria-label="ShelterKart home" className="flex items-center gap-3">
          <Logo priority />
          <span className="hidden leading-tight sm:block">
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-700">
              {t('Registry')}
            </span>
            <span className="mt-0.5 block text-[10px] text-slate-500">
              {t('Peace of mind, on the record.')}
            </span>
          </span>
        </Link>

        <nav aria-label={t('Main')} className="ms-auto hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <NavItem key={l.label} link={l} className={NAV} />
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <Link href="#search" className={`${buttonVariants({ size: 'sm' })} whitespace-nowrap`}>
            <span className="sm:hidden">{t('Search')}</span>
            <span className="hidden sm:inline">{t('Search Public Record')}</span>
          </Link>
          <ThemeToggle />
          <AccountButton />
          <details className="relative lg:hidden">
            <summary
              aria-label={t('Menu')}
              className="grid size-9 cursor-pointer list-none place-items-center rounded-md border border-slate-200 text-slate-700 [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-4" aria-hidden="true" />
            </summary>
            <nav
              aria-label={t('Main')}
              className="absolute end-0 top-11 flex w-60 flex-col gap-1 rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
            >
              {links.map((l) => (
                <NavItem
                  key={l.label}
                  link={l}
                  className={`${NAV} block rounded px-3 py-2 hover:bg-slate-50`}
                />
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
