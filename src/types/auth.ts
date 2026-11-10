export type SessionUser = {
  id: string;
  email: string;
  displayName: string | null;
  country: string | null;
  language: string | null;
  phone: string | null;
  createdAt: string;
};

export type RequestCodeResult = {
  ok: boolean;
  cooldownSeconds: number;
  codeLength: number;
  /** Only when the server runs with ACCOUNTS_DEV_ECHO outside production. */
  devCode?: string;
};

export type VerifyCodeResult = { ok: boolean; isNewUser: boolean; user: SessionUser };

export type ProfileUpdate = Partial<
  Pick<SessionUser, 'displayName' | 'country' | 'language' | 'phone'>
>;

export type MyReport = {
  ref: string;
  projectName: string | null;
  market: string | null;
  paid: boolean;
  purchasedAt: string | null;
  amount: number | null;
  currency: string | null;
  firstOpenedAt: string;
  lastOpenedAt: string;
};
