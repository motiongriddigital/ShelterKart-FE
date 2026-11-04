'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, LogOut, Search, Settings2, UserRound, X } from 'lucide-react';
import { ADMIN_NAV, HEALTH_HREF, type AdminNavSection } from '@/constants/adminNav';
import { useAdminSession } from '@/store/adminSession';
import { cn } from '@/utils/cn';
import { AdminLogo } from './AdminLogo';
import { InsightsCard } from './InsightsCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from './ui/sidebar';

const linkClass = (active: boolean) =>
  cn(
    'flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors duration-150',
    active
      ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
      : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
  );

const linkIcon = (active: boolean) =>
  cn(
    'transition-colors duration-150',
    active
      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
      : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
  );

function filterNav(query: string): AdminNavSection[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return ADMIN_NAV;
  return ADMIN_NAV.map((section) => ({
    ...section,
    items: section.items.filter((i) => {
      const hay = `${i.label} ${i.keywords} ${section.label}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    }),
  })).filter((section) => section.items.length);
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const mode = useAdminSession((s) => s.mode);
  const username = useAdminSession((s) => s.username) || 'admin';
  const signOut = useAdminSession((s) => s.signOut);
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const groups = useMemo(() => filterNav(query), [query]);
  const first = groups[0]?.items[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT');
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/admin'
      ? pathname === '/admin'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border">
      <SidebarHeader className="gap-3 p-3">
        <Link href="/admin" aria-label="ShelterKart Admin, dashboard" className="px-1 pt-0.5">
          <AdminLogo />
        </Link>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <input
            ref={input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setQuery('');
                input.current?.blur();
              }
              if (e.key === 'Enter' && first) {
                router.push(first.href);
                setQuery('');
                input.current?.blur();
              }
            }}
            placeholder="Search the console"
            aria-label="Search the console"
            className="h-8 w-full rounded-md border border-sidebar-border bg-card pl-8 pr-14 text-ui text-foreground shadow-card outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                input.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" strokeWidth={1.75} />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-sidebar-border bg-muted px-1.5 text-[11px] leading-4 text-muted-foreground">
              /
            </kbd>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-2">
        {groups.map((section) => (
          <SidebarGroup key={section.label} className="px-0 py-2">
            <SidebarGroupLabel className="label-quiet h-auto px-2 pb-1.5">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild tooltip={item.label} className="h-auto p-0">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                      >
                        <span className={linkClass(isActive(item.href))}>
                          <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
                          <span className="flex-1">{item.label}</span>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {!groups.length && (
          <p className="px-2 py-4 text-ui text-muted-foreground">
            Nothing matches “{query}”. Try a word like sales, users or backup.
          </p>
        )}
      </SidebarContent>

      <InsightsCard />

      <SidebarFooter className="border-t border-sidebar-border px-2 py-2">
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`Account menu for ${username}`}
                className="pressable flex min-w-0 flex-1 items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors duration-150 hover:bg-sidebar-accent/60 data-[state=open]:bg-sidebar-accent"
              >
                <span
                  aria-hidden="true"
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-signal-soft text-xs font-semibold uppercase text-signal"
                >
                  {username.slice(0, 2)}
                </span>
                <span className="truncate text-sm">{username}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel className="flex flex-col gap-0.5">
                <span className="truncate">{username}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {mode === 'demo' ? 'Demo data, nothing is live' : 'Signed in as the server admin'}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => router.push('/admin/settings/account')}>
                <UserRound strokeWidth={1.75} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push('/admin/settings')}>
                <Settings2 strokeWidth={1.75} />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={signOut}>
                <LogOut strokeWidth={1.75} />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={HEALTH_HREF}
                aria-label="Health and errors"
                className={cn('pressable rounded-md p-1.5', linkIcon(isActive(HEALTH_HREF)))}
              >
                <Activity className="size-4" strokeWidth={1.75} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top">Health and errors</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                aria-label="Settings"
                className={cn('pressable rounded-md p-1.5', linkIcon(isActive('/admin/settings')))}
              >
                <Settings2 className="size-4" strokeWidth={1.75} />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top">Settings</TooltipContent>
          </Tooltip>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
