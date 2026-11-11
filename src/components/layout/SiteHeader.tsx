import Link from 'next/link';
import { Menu } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { HEADER_LINKS, RESTORE_LINK } from '@/constants/home';
import { getT } from '@/i18n/server';
import { AccountButton } from './AccountButton';
import { NavItem } from './NavItem';

const NAV = 'text-base font-medium text-slate-700 transition-colors hover:text-slate-900';

export async function SiteHeader() {
  const t = await getT();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1900px] items-center gap-3 px-4 py-3 md:px-8 xl:px-12">
        <Link href="/" aria-label="ShelterKart home" className="flex items-center">
          <Logo priority />
        </Link>

        <nav aria-label={t('Main')} className="ms-auto hidden items-center gap-7 lg:flex">
          {HEADER_LINKS.map((l) => (
            <NavItem key={l.label} link={l} className={NAV} />
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <Link
            href="/#search"
            className={`${buttonVariants({ size: 'lg' })} whitespace-nowrap text-base max-sm:hidden`}
          >
            {t('Check a property')}
          </Link>
          <ThemeToggle />
          <AccountButton />
          <details className="relative lg:hidden">
            <summary
              aria-label={t('Menu')}
              className="flex h-11 cursor-pointer list-none items-center gap-1.5 rounded-md border border-slate-300 px-3 text-base font-medium text-slate-700 [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
              <span>{t('Menu')}</span>
            </summary>
            <nav
              aria-label={t('Main')}
              className="absolute end-0 top-13 flex w-64 flex-col gap-1 rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
            >
              {[...HEADER_LINKS, RESTORE_LINK].map((l) => (
                <NavItem
                  key={l.label}
                  link={l}
                  className={`${NAV} block rounded px-3 py-3 hover:bg-slate-50`}
                />
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
