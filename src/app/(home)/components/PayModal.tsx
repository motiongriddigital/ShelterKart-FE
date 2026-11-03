'use client';
import Link from 'next/link';
import { Modal } from '@/components/ui/Modal';
import { useCheckout } from '@/hooks/useCheckout';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';
import { countryName, fmtMoney, fmtPrice } from '@/utils/price';

const Line = ({ label, value, strong }: { label: string; value?: string; strong?: boolean }) => (
  <div className={`pay-line${strong ? ' pay-total' : ''}`}>
    <span>{label}</span>
    {value !== undefined && <span className="pay-num">{value}</span>}
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
      <button className="modal-close" onClick={close} aria-label="Close">
        ×
      </button>
      <p className="pay-kicker">{t('Checkout')}</p>
      <h3 id="payModal-title">{t('Unlock the full report')}</h3>
      {c.session && q && (
        <>
          <p className="pay-project">
            {c.session.title}
            {q.depthLabel ? ` · ${t('{depth} report', { depth: t(q.depthLabel) })}` : ''}
          </p>
          <p className="pay-banner" role="alert" hidden={!c.session.banner}>
            {c.session.banner}
          </p>
          <div className="pay-block">
            <p className="pay-head">ShelterKart due diligence report</p>
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
          <p className="pay-meta">
            {t('Currency: {code}', { code: q.currency })} ·{' '}
            {t('Prices shown for: {country}', { country: countryName(q.country, locale) })}
          </p>
          <p className="pay-meta">
            {t('Price locked until {time} ({left} left)', {
              time: new Date(q.expiresAt).toLocaleTimeString(locale, {
                hour: '2-digit',
                minute: '2-digit',
              }),
              left: `${mins}:${secs}`,
            })}
          </p>
          <label className="pay-billing" htmlFor="payBilling">
            <span>{t('Billing country')}</span>
          </label>
          <select
            id="payBilling"
            className="lb-country"
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
          </select>
          <div id="payContact">
            <label className="pay-billing" htmlFor="payEmail">
              <span>{t('E-mail for the report')}</span>
            </label>
            <input
              id="payEmail"
              className="pay-input"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={c.email}
              onChange={(e) => c.setEmail(e.target.value)}
            />
            <label className="pay-billing" htmlFor="payPhone">
              <span>{t('WhatsApp number, optional')}</span>
            </label>
            <input
              id="payPhone"
              className="pay-input"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98200 00000"
              value={c.phone}
              onChange={(e) => c.setPhone(e.target.value)}
            />
          </div>
          <p className="pay-why">
            <strong>{t('Why this price?')}</strong>{' '}
            <span>
              {t(
                'It depends on the value of the property and how much evidence this report holds. It is the same for every buyer, shown in your currency.',
              )}
            </span>
          </p>
          <p className="pay-trust">
            <span>
              {t('Developers can reply to any finding, and any error is corrected and dated.')}
            </span>{' '}
            <Link className="pay-trust-link" href="/corrections" target="_blank">
              {t('How it works')}
            </Link>
          </p>
          <p className="pay-includes">
            {t(
              'Every question for each team at the developer, with why it matters and what closes it; every finding with its link and status; the reasoning and where sources disagree; a tracker; and the PDF.',
            )}
          </p>
          <p className="pay-demo">
            {t(
              'Demo: no money is taken. In the live product this step is Razorpay’s secure checkout (UPI, cards, net banking).',
            )}
          </p>
          <button className="modal-submit" type="button" disabled={c.busy} onClick={c.pay}>
            {t('Pay {amount}', { amount: fmtPrice(q.gross, q.currency) })}
          </button>
          <p role="status" className="pay-msg">
            {c.message}
          </p>
        </>
      )}
    </Modal>
  );
}
