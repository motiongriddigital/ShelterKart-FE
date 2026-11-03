'use client';
import { useMemo } from 'react';
import type { AdminAuth } from '@/app/_api/admin';
import { useAdminSession } from '@/store/adminSession';

/** The signed-in admin's credentials (shared by the dashboard, the marketing desk and the social desk). */
export function useDeskAuth(): AdminAuth {
  const mode = useAdminSession((s) => s.mode) ?? 'demo';
  const authHeader = useAdminSession((s) => s.authHeader);
  return useMemo(() => ({ mode, authHeader }), [mode, authHeader]);
}
