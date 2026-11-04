'use client';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { AdminLogo } from '@/components/console/AdminLogo';
import { useAdminLogin } from '@/hooks/useAdminLogin';

const field =
  'h-10 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground shadow-card outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30';

export function LoginScreen() {
  const { user, setUser, pass, setPass, error, busy, submit, openDemo } = useAdminLogin();
  const [show, setShow] = useState(false);

  return (
    <div className="console-shell grid min-h-svh place-items-center bg-ground p-4">
      <div className="w-full max-w-[380px]">
        <div className="mb-6 flex justify-center">
          <AdminLogo />
        </div>
        <form
          className="card-surface p-6"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
          <p className="mb-5 mt-1 text-sm text-muted-foreground">
            Use the admin username and password set on the server.
          </p>

          <label htmlFor="admin-user" className="label-quiet mb-1.5 block">
            Username
          </label>
          <input
            id="admin-user"
            className={field}
            autoComplete="username"
            autoFocus
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label htmlFor="admin-pass" className="label-quiet mb-1.5 mt-4 block">
            Password
          </label>
          <div className="relative">
            <input
              id="admin-pass"
              className={`${field} pr-10`}
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
            >
              {show ? (
                <EyeOff className="size-4" strokeWidth={1.75} />
              ) : (
                <Eye className="size-4" strokeWidth={1.75} />
              )}
            </button>
          </div>

          <div role="alert" className="min-h-5 pt-2 text-sm text-status-down-text">
            {error}
          </div>

          <button
            type="submit"
            disabled={busy}
            className="pressable mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy && <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />}
            {busy ? 'Signing in' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 rounded-xl border border-border bg-panel p-4">
          <p className="text-sm font-medium">No server connected?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Open the demo: simulated visitor traffic computed by the real analytics code, and the
            five real sample reports. No sign-in is needed.
          </p>
          <button
            type="button"
            onClick={openDemo}
            className="pressable mt-3 h-9 rounded-md border border-border bg-card px-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Open the demo dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
