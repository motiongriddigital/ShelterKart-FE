'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FieldLabel, Input, Select } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal';
import { useCheckout } from '@/hooks/useCheckout';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';
import { countryName, fmtMoney, fmtPrice } from '@/utils/price';

const Line = ({ label, value, strong }: { label: string; value?: string; strong?: boolean }) => (
  <div
    className={`flex justify-between gap-3 py-1.5 text-base ${strong ? 'mt-1 border-t border-slate-200 pt-2.5 font-bold text-slate-900' : 'text-slate-700'}`}
  >
    <span>{label}</span>
    {value !== undefined && <span className="tabular-nums">{value}</span>}
  </div>
);

export function PayModal() {
  const t = useT();
  const close = useModalStore((s) => s.close);
  const c = useCheckout();
  const q = c.session?.quote;
  const locale = c.lang === 'ar' ? 'ar-AE-u-nu-latn' : c.lang;
  const mins = Math.floor(c.left / 60000);
  const secs = String(Math.floor((c.left % 60000) / 1000)).padStart(2, '0');

  return (
    <Modal id="payModal" bare>
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute end-3 top-3 grid size-8 place-items-center rounded-md text-xl leading-none text-slate-600 hover:bg-slate-100"
      >
        ×
      </button>
      <p className="text-sm font-bold text-blue-700">{t('Checkout')}</p>
      <h3 id="payModal-title" className="mt-1 pe-8 text-xl font-bold text-slate-900">
        {t('Unlock the full report')}
      </h3>
      {c.session && q && (
        <>
          <p className="mt-1 text-base font-semibold text-slate-700">
            {c.session.title}
            {q.depthLabel ? ` · ${t('{depth} report', { depth: t(q.depthLabel) })}` : ''}
          </p>
          <p
            className="mt-2 rounded-md bg-amber-50 p-2 text-sm text-amber-900"
            role="alert"
            hidden={!c.session.banner}
          >
            {c.session.banner}
          </p>
          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-1 text-sm font-bold text-slate-600">
              ShelterKart due diligence report
            </p>
            <Line label={t('Report fee')} value={fmtMoney(q.net, q.currency)} />
            {q.taxBy === 'merchant_of_record' ? (
              <Line label={t('Any tax is included in the total and shown on your receipt')} />
            ) : (
              <Line
                label={
                  (q.taxRateBps ?? 0) > 0
                    ? `${q.taxName} (${(q.taxRateBps ?? 0) / 100}%)`
                    : t('No tax charged')
                }
                value={fmtMoney(q.tax || 0, q.currency)}
              />
            )}
            <Line strong label={t('Total to pay')} value={fmtMoney(q.gross, q.currency)} />
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {t('Currency: {code}', { code: q.currency })} ·{' '}
            {t('Prices shown for: {country}', { country: countryName(q.country, locale) })}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {t('Price locked until {time} ({left} left)', {
              time: new Date(q.expiresAt).toLocaleTimeString(locale, {
                hour: '2-digit',
                minute: '2-digit',
              }),
              left: `${mins}:${secs}`,
            })}
          </p>
          <FieldLabel htmlFor="payBilling">{t('Billing country')}</FieldLabel>
          <Select
            id="payBilling"
            value={c.session.billing}
            onChange={(e) => c.setBilling(e.target.value || q.country)}
          >
            {[...c.countries]
              .map((x) => ({ iso: x.iso, name: countryName(x.iso, locale, x.name) }))
              .sort((a, b) => a.name.localeCompare(b.name, locale))
              .map((x) => (
                <option key={x.iso} value={x.iso}>
                  {x.name}
                </option>
              ))}
          </Select>
          <div>
            <FieldLabel htmlFor="payEmail">{t('E-mail for the report')}</FieldLabel>
            <Input
              id="payEmail"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={c.email}
              onChange={(e) => c.setEmail(e.target.value)}
            />
            <FieldLabel htmlFor="payPhone">{t('WhatsApp number, optional')}</FieldLabel>
            <Input
              id="payPhone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98200 00000"
              value={c.phone}
              onChange={(e) => c.setPhone(e.target.value)}
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            <strong>{t('Why this price?')}</strong>{' '}
            <span>
              {t(
                'It depends on the value of the property and how much evidence this report holds. It is the same for every buyer, shown in your currency.',
              )}
            </span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            <span>
              {t('Developers can reply to any finding, and any error is corrected and dated.')}
            </span>{' '}
            <Link
              className="font-semibold text-blue-700 underline"
              href="/corrections"
              target="_blank"
            >
              {t('How it works')}
            </Link>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {t(
              'Every question for each team at the developer, with why it matters and what closes it; every finding with its link and status; the reasoning and where sources disagree; a tracker; and the PDF.',
            )}
          </p>
          <p className="mt-3 text-sm italic leading-relaxed text-slate-600">
            {t(
              'Demo: no money is taken. In the live product this step is Razorpay’s secure checkout (UPI, cards, net banking).',
            )}
          </p>
          <Button className="mt-4 w-full" size="lg" disabled={c.busy} onClick={c.pay}>
            {t('Pay {amount}', { amount: fmtPrice(q.gross, q.currency) })}
          </Button>
          <p role="status" className="mt-2 min-h-5 text-base text-slate-700">
            {c.message}
          </p>
        </>
      )}
    </Modal>
  );
}
