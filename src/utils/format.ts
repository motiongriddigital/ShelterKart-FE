export const fmt = (n: unknown) => (Number(n) || 0).toLocaleString('en-IN');

export function money(amount: number, currency: string): string {
  // Lakh/crore grouping is right for rupees only: "£8,19,000" would be wrong.
  const locale = currency === 'INR' ? 'en-IN' : 'en-GB';
  let out: string;
  try {
    out = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${fmt(amount)}`;
  }
  if (
    !out.includes(currency) &&
    ((/\$/.test(out) && !/[A-Z]{1,2}\$/.test(out) && currency !== 'USD') || /kr/.test(out))
  ) {
    out += ` (${currency})`;
  }
  return out;
}

export const shortDate = (t: string) =>
  new Date(t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
export const dateTime = (t?: string) => (t ? new Date(t).toLocaleString() : '—');
