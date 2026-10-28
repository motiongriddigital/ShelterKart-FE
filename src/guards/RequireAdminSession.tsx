'use client';
import type { ReactNode } from 'react';
import { useAdminSession } from '@/store/adminSession';

/** Renders the dashboard only once the operator has signed in (or opened the demo); otherwise the fallback. */
export function RequireAdminSession({
  fallback,
  children,
}: {
  fallback: ReactNode;
  children: ReactNode;
}) {
  const signedIn = useAdminSession((s) => s.mode !== null);
  return <>{signedIn ? children : fallback}</>;
}
