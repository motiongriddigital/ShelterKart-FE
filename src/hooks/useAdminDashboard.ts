'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Unauthorised,
  approveHeld,
  loadDashboard,
  resolveDispute,
  reviewResponse,
  runHealthCheck,
  type AdminAuth,
} from '@/services/admin';
import { useAdminSession } from '@/store/adminSession';
import type { DashboardData } from '@/types/admin';

export function useAdminDashboard() {
  const mode = useAdminSession((s) => s.mode);
  const authHeader = useAdminSession((s) => s.authHeader);
  const signOut = useAdminSession((s) => s.signOut);
  const [days, setDays] = useState('30');
  const [data, setData] = useState<DashboardData | null>(null);
  const [status, setStatus] = useState('');
  const [checkingHealth, setCheckingHealth] = useState(false);

  const auth = useMemo<AdminAuth | null>(
    () => (mode ? { mode, authHeader } : null),
    [mode, authHeader],
  );

  const refresh = useCallback(async () => {
    if (!mode) return;
    setStatus('Loading…');
    try {
      const d = await loadDashboard({ mode, authHeader }, days);
      setData(d);
      setStatus(
        d.failed.length
          ? 'Some panels could not load'
          : `Updated ${new Date().toLocaleTimeString()}`,
      );
    } catch (e) {
      if (e instanceof Unauthorised) signOut();
      else setStatus((e as Error).message);
    }
  }, [mode, authHeader, days, signOut]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Each action reports a failure to the operator and reloads the panels afterwards.
  const act = useCallback(
    async (fn: (a: AdminAuth) => Promise<unknown>) => {
      if (!auth) return;
      try {
        await fn(auth);
      } catch (e) {
        alert((e as Error).message);
      }
      refresh();
    },
    [auth, refresh],
  );

  return {
    data,
    days,
    setDays,
    status,
    checkingHealth,
    refresh,
    signOut,
    mode,
    resolveDispute: (id: string) => act((a) => resolveDispute(a, id)),
    reviewResponse: (id: string, action: 'approve' | 'reject') =>
      act((a) => reviewResponse(a, id, action)),
    approveHeld: (ref: string) => {
      if (
        !confirm(
          `Release ${ref}? Confirm each finding matches its own source first. To remove a wrong finding, use the purge tools instead.`,
        )
      )
        return;
      act((a) => approveHeld(a, ref));
    },
    runHealth: async () => {
      setCheckingHealth(true);
      await act(runHealthCheck);
      setCheckingHealth(false);
    },
  };
}
