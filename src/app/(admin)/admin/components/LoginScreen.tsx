'use client';
import { useAdminLogin } from '@/hooks/useAdminLogin';

export function LoginScreen() {
  const { user, setUser, pass, setPass, error, busy, submit, openDemo } = useAdminLogin();

  return (
    <form
      className="login"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h1>ShelterKart Admin</h1>
      <p>Sign in with the admin credentials set on the server.</p>
      <input
        placeholder="Username"
        autoComplete="username"
        aria-label="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        aria-label="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button className="btn btn-gold" type="submit" disabled={busy}>
        Sign in
      </button>
      <div className="err" role="alert">
        {error}
      </div>
      <p className="demo-note">
        No server connected? Open the demo: simulated visitor traffic computed by the real analytics
        code, and the five real sample reports. No sign-in is needed.
      </p>
      <button type="button" className="btn btn-gold" onClick={openDemo}>
        Open the demo dashboard
      </button>
    </form>
  );
}
