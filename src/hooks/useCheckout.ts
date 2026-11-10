'use client';
import { useCallback, useState } from 'react';
import { getDossierHtml } from '@/services/samples';
import { useBuyerCountry } from '@/hooks/useBuyerCountry';
import { useCountdown } from '@/hooks/useCountdown';
import { useLang, useT } from '@/hooks/useT';
import { useCheckoutStore } from '@/store/checkout';
import { useModalStore } from '@/store/modal';
import { useReportStore } from '@/store/report';
import { dossierById } from '@/utils/dossiers';
import { fmtPrice } from '@/utils/price';
import { demoQuote } from '@/utils/quote';
import { isEmail, isPhone, stripPhone } from '@/utils/validators';

const DEMO_PAYMENT_MS = 1200;

/** Opens a checkout for a sample report: the price for the buyer's country, locked for 30 minutes. */
export function useStartCheckout() {
  const { country } = useBuyerCountry();
  const begin = useCheckoutStore((s) => s.begin);
  const open = useModalStore((s) => s.open);
  const t = useT();

  return useCallback(
    async (dossierId: string) => {
      const d = dossierById(dossierId);
      if (!d) return;
      const html = await getDossierHtml(dossierId);
      const iso = html.quotes[country]
        ? country
        : html.quotes[d.home]
          ? d.home
          : Object.keys(html.quotes)[0];
      if (!iso) return;
      begin({
        dossierId,
        title: `${d.title} · ${t(d.city)}${t(', ')}${t(d.country)}`,
        quote: demoQuote(html.quotes[iso], iso, html.pricing.depthLabel),
        billing: iso,
        banner: '',
      });
      open('payModal');
    },
    [begin, country, open, t],
  );
}

/** The checkout sheet: re-quotes on a changed billing country or an expired lock, then simulated payment. */
export function useCheckout() {
  const t = useT();
  const lang = useLang();
  const session = useCheckoutStore((s) => s.session);
  const update = useCheckoutStore((s) => s.update);
  const paid = useCheckoutStore((s) => s.paid);
  const close = useModalStore((s) => s.close);
  const isOpen = useModalStore((s) => s.openId === 'payModal');
  const setView = useReportStore((s) => s.setView);
  const { countries } = useBuyerCountry();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const left = useCountdown(session?.quote.expiresAt, isOpen && !!session);

  const requote = useCallback(
    async (billing: string, banner: (oldAmount: string, newAmount: string) => string) => {
      if (!session) return;
      const html = await getDossierHtml(session.dossierId);
      const raw = html.quotes[billing];
      if (!raw) return;
      const old = session.quote;
      const next = demoQuote(raw, billing, html.pricing.depthLabel);
      update({
        quote: next,
        banner: banner(fmtPrice(old.gross, old.currency), fmtPrice(next.gross, next.currency)),
        billing,
      });
    },
    [session, update],
  );

  const setBilling = useCallback((iso: string) => update({ billing: iso }), [update]);

  const pay = useCallback(async () => {
    if (!session) return;
    setMessage('');
    const { billing, quote } = session;
    const html = await getDossierHtml(session.dossierId);
    if (billing !== quote.country && html.quotes[billing]) {
      await requote(billing, (o, n) =>
        t(
          'Your billing country differs from the price you were shown. New total: {new} (was {old}). Please confirm.',
          {
            new: n,
            old: o,
          },
        ),
      );
      return;
    }
    if (Date.now() > Date.parse(quote.expiresAt)) {
      await requote(billing, () =>
        t('Your price has been updated. Please review it before paying.'),
      );
      return;
    }
    const cleanPhone = stripPhone(phone);
    if (!isEmail(email.trim())) {
      setMessage(t('Enter a valid e-mail address so we can send the report.'));
      return;
    }
    if (cleanPhone && !isPhone(cleanPhone)) {
      setMessage(
        t('Enter the WhatsApp number with its country code, for example +91 98200 00000.'),
      );
      return;
    }
    setBusy(true);
    setMessage(t('Processing payment…'));
    await new Promise((r) => setTimeout(r, DEMO_PAYMENT_MS));
    paid({ email: email.trim(), phone: cleanPhone });
    setView({ kind: 'full', id: session.dossierId });
    setBusy(false);
    setMessage('');
    close();
  }, [session, requote, t, email, phone, paid, setView, close]);

  return {
    session,
    countries,
    lang,
    left,
    email,
    setEmail,
    phone,
    setPhone,
    message,
    busy,
    pay,
    setBilling,
    isOpen,
  };
}
