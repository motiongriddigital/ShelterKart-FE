import type { Metadata } from 'next';
import { DocPage } from '@/components/layout/DocPage';
import { PriceByCurrencyTable } from './components/PriceByCurrencyTable';
import { PriceByValueTable } from './components/PriceByValueTable';
import {
  PRICE_BY_CURRENCY,
  PRICE_BY_VALUE,
  PRICE_LIST_RATES_DATE,
  PRICE_LIST_VERSION,
} from './data/priceBook';
import styles from './styles/pricing.module.scss';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Searching is free. Each full report has one price, the same for every buyer.',
};

export default function PricingPage() {
  return (
    <DocPage slug="pricing" title="Pricing">
      <p>
        Searching is free, and every search shows a free preview: the project, the first findings,
        the topics sources disagree on, and what could not be found.
      </p>
      <p>
        The <strong>full report</strong> adds every finding with its sources, what each disagreement
        actually says, the questions to ask and who to ask, the buyer’s protections, every page
        checked, and a check of your own documents against the report.
      </p>
      <h2>How the price of a report is set</h2>
      <p>
        Each report has <strong>one price</strong>, set by code from two things, and it is{' '}
        <strong>the same for every buyer</strong>, wherever they are:
      </p>
      <ul>
        <li>
          <strong>The value of the property.</strong> The price follows the midpoint of the
          project’s own listed prices: a report on a more expensive home costs more, but less as a
          share of the home’s price. Where no listed price is found, the report is priced as a
          typical purchase (about $161,017).
        </li>
        <li>
          <strong>The depth of the evidence:</strong> Gold standard (high confidence, including an
          official source) 100%; Heavy (much of the evidence corroborated) 80%; Thin (a thin public
          record) 60%. ShelterKart decides this from the evidence; the buyer never chooses it.
        </li>
      </ul>
      <p>
        <strong>
          Your country decides only the currency you pay in, the tax, and how you can pay.
        </strong>{' '}
        The price is read from a published list of round prices for your currency, so it does not
        move with daily exchange rates. When you unlock a report, your price is locked for 30
        minutes. If your billing country turns out to be different, you see the new total and
        confirm it before anything is charged.
      </p>
      <p>
        <strong>The price never depends on whether the findings favor the developer.</strong>
      </p>
      <h2>By the value of the property</h2>
      <p>
        The price of a report in US dollars and Indian rupees (every other currency follows the same
        list):
      </p>
      <PriceByValueTable rows={PRICE_BY_VALUE} />
      <h2>The same report in each currency</h2>
      <p>
        A Gold-standard report on a typical purchase, and the lowest and highest price of any
        report, in each currency:
      </p>
      <PriceByCurrencyTable rows={PRICE_BY_CURRENCY} />
      <h2>Tax</h2>
      <p>
        Prices include tax where ShelterKart collects it: in India, GST. Where ShelterKart is not
        registered for a country’s tax, no tax is charged, and the checkout says so. The checkout
        always shows the report fee, the tax and the total as separate lines.
      </p>
      <p className={styles.muted}>
        Price list {PRICE_LIST_VERSION}, set from the exchange rates of {PRICE_LIST_RATES_DATE}. A
        new list is published at most once a month, and never changes a price already quoted to you.
      </p>
    </DocPage>
  );
}
