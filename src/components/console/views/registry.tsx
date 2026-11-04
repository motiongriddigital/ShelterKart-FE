import type { ReactNode } from 'react';
import { PANELS } from '@/constants/adminPanels';
import {
  DeliveryView,
  ErrorLogView,
  FailedJobsView,
  HealthOverview,
  RegistersView,
} from './HealthViews';
import { UserMapView } from './UserMapView';
import { BansView, SessionsView, UserDetailView } from './UsersViews';

/** The built screens. A section or view not listed here shows its "Planned" page. */
export function viewFor(section: string, view?: string): ReactNode | null {
  const v = view ?? PANELS[section]?.groups[0]?.items[0]?.slug;
  if (!v) return null;
  if (section === 'users') {
    if (v === 'bans') return <BansView />;
    if (v === 'sessions') return <SessionsView />;
    return <UserDetailView id={v} />;
  }
  if (section === 'health') {
    if (v === 'overview') return <HealthOverview />;
    if (v === 'registers') return <RegistersView />;
    if (v === 'errors') return <ErrorLogView />;
    if (v === 'jobs') return <FailedJobsView />;
    if (v === 'delivery') return <DeliveryView />;
  }
  if (section === 'map') return <UserMapView country={v} />;
  return null;
}
