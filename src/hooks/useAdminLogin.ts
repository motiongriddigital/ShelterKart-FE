'use client';
import { useCallback, useState } from 'react';
import { checkCredentials } from '@/app/_api/admin';
import { useAdminSession } from '@/store/adminSession';

export function useAdminLogin() {
  const signInLive = useAdminSession((s) => s.signInLive);
  const openDemo = useAdminSession((s) => s.openDemo);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = useCallback(async () => {
    if (!user.trim() || !pass) {
      setError('Enter both fields.');
      return;
    }
    const authHeader = 'Basic ' + btoa(`${user.trim()}:${pass}`);
    setBusy(true);
    setError('');
    try {
      // Credentials are checked BEFORE the dashboard is shown.
      await checkCredentials({ mode: 'live', authHeader });
      setPass('');
      signInLive(authHeader, user.trim());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, [user, pass, signInLive]);

  return { user, setUser, pass, setPass, error, busy, submit, openDemo };
}
