// A bare "$" (Singapore, Australia, Hong Kong, New Zealand dollars) or "kr" is ambiguous, so it gets its currency
// code; without a currency there is no price at all, never a guessed one.
const needsCode = (out: string, currency: string) =>
  !out.includes(currency) &&
  ((/\$/.test(out) && !/[A-Z]{1,2}\$/.test(out) && currency !== 'USD') || /kr/.test(out));

export function fmtPrice(amount: number, currency: string, locale?: string): string {
  if (!/^[A-Z]{3}$/.test(currency) || !(Number(amount) > 0)) return '';
  let out: string;
  try {
    out = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch {
    return `${currency} ${amount}`;
  }
  return needsCode(out, currency) ? `${out} (${currency})` : out;
}

/** Checkout amounts: zero is shown (a tax line can be zero) and decimals appear when an amount has them. */
export function fmtMoney(amount: number, currency: string): string {
  const n = Number(amount);
  if (!/^[A-Z]{3}$/.test(currency) || !(n >= 0)) return '';
  const whole = Math.abs(n - Math.round(n)) < 1e-9;
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: whole ? 0 : 2,
      maximumFractionDigits: whole ? 0 : 3,
    }).format(n);
  } catch {
    return `${currency} ${n}`;
  }
}

export const countryName = (iso: string, locale: string, fallback?: string): string => {
  try {
    const n = new Intl.DisplayNames([locale, 'en'], { type: 'region' }).of(iso);
    if (n && n !== iso) return n;
  } catch {
    /* fall through */
  }
  return fallback ?? iso;
};
