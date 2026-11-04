'use client';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useAdminLogin } from '@/hooks/useAdminLogin';
import { Button } from '@/components/console/ui/button';
import { Input } from '@/components/console/ui/input';

export function LoginScreen() {
  const { user, setUser, pass, setPass, error, busy, submit, openDemo } = useAdminLogin();
  const [show, setShow] = useState(false);

  return (
    <div className="console-shell grid min-h-svh place-items-center bg-ground p-4">
      <div className="w-full max-w-[380px]">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo/shelterkart-lockup.svg"
            alt="ShelterKart Admin"
            width={907}
            height={211}
            priority
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/logo/shelterkart-lockup-on-dark.svg"
            alt="ShelterKart Admin"
            width={907}
            height={211}
            priority
            className="hidden h-8 w-auto dark:block"
          />
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
          <Input
            id="admin-user"
            className="h-10"
            autoComplete="username"
            autoFocus
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label htmlFor="admin-pass" className="label-quiet mb-1.5 mt-4 block">
            Password
          </label>
          <div className="relative">
            <Input
              id="admin-pass"
              className="h-10 pr-10"
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {show ? (
                <EyeOff className="size-4" strokeWidth={1.75} />
              ) : (
                <Eye className="size-4" strokeWidth={1.75} />
              )}
            </Button>
          </div>

          <div role="alert" className="min-h-5 pt-2 text-sm text-status-down-text">
            {error}
          </div>

          <Button size="lg" type="submit" disabled={busy} className="pressable mt-2 w-full">
            {busy && <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />}
            {busy ? 'Signing in' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-4 rounded-xl border border-border bg-panel p-4">
          <p className="text-sm font-medium">No server connected?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Open the demo: simulated visitor traffic computed by the real analytics code, and the
            five real sample reports. No sign-in is needed.
          </p>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={openDemo}
            className="pressable mt-3 bg-card"
          >
            Open the demo dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
