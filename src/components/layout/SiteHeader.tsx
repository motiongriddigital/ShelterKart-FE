import Link from 'next/link';
import { Menu } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { HEADER_LINKS, RESTORE_LINK } from '@/constants/home';
import { getT } from '@/i18n/server';
import { AccountButton } from './AccountButton';
import { NavItem } from './NavItem';

const NAV = 'text-base font-medium text-cream/85 transition-colors hover:text-cream';

// The navy chrome of the brand: cream type on navy, closed by a gold rule.
export async function SiteHeader() {
  const t = await getT();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-gold bg-navy">
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
            className={`${buttonVariants({ size: 'lg', variant: 'gold' })} whitespace-nowrap text-base max-sm:hidden`}
          >
            {t('Check a property')}
          </Link>
          <AccountButton />
          <details className="relative lg:hidden">
            <summary
              aria-label={t('Menu')}
              className="flex h-11 cursor-pointer list-none items-center gap-1.5 rounded-md border border-cream/30 px-3 text-base font-medium text-cream [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
              <span>{t('Menu')}</span>
            </summary>
            <nav
              aria-label={t('Main')}
              className="absolute end-0 top-13 flex w-64 flex-col gap-1 rounded-lg border border-gold/40 bg-navy p-2 shadow-lg"
            >
              {[...HEADER_LINKS, RESTORE_LINK].map((l) => (
                <NavItem
                  key={l.label}
                  link={l}
                  className={`${NAV} block rounded px-3 py-3 hover:bg-cream/10`}
                />
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
