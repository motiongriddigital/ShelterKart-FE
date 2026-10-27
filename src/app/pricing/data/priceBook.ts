// Price book 2026-10.2 (rates of 2026-06-26), copied from the generated pricing.html.
// Source of truth is tools/build_price_book.js; swap for the pricing service when it is wired up.
import type { PriceByCurrencyRow, PriceByValueRow } from '@/types/pricing';

export const PRICE_LIST_VERSION = '2026-10.2';
export const PRICE_LIST_RATES_DATE = '2026-06-26';

export const PRICE_BY_VALUE: PriceByValueRow[] = [
  {
    value: '$50,000',
    approx: 'about ₹0.47 crore',
    gold: 'US$23 (USD) · ₹2,150',
    heavy: 'US$23 (USD) · ₹2,150',
    thin: 'US$23 (USD) · ₹2,150',
  },
  {
    value: '$100,000',
    approx: 'about ₹0.94 crore',
    gold: 'US$33 (USD) · ₹3,100',
    heavy: 'US$23 (USD) · ₹2,150',
    thin: 'US$23 (USD) · ₹2,150',
  },
  {
    value: '$161,000',
    approx: 'about ₹1.52 crore',
    gold: 'US$39 (USD) · ₹3,700',
    heavy: 'US$33 (USD) · ₹3,100',
    thin: 'US$23 (USD) · ₹2,150',
  },
  {
    value: '$300,000',
    approx: 'about ₹2.83 crore',
    gold: 'US$55 (USD) · ₹5,300',
    heavy: 'US$47 (USD) · ₹4,400',
    thin: 'US$33 (USD) · ₹3,100',
  },
  {
    value: '$600,000',
    approx: 'about ₹5.66 crore',
    gold: 'US$80 (USD) · ₹7,700',
    heavy: 'US$70 (USD) · ₹6,400',
    thin: 'US$47 (USD) · ₹4,400',
  },
  {
    value: '$1,200,000',
    approx: 'about ₹11.33 crore',
    gold: 'US$115 (USD) · ₹11,000',
    heavy: 'US$100 (USD) · ₹9,200',
    thin: 'US$70 (USD) · ₹6,400',
  },
  {
    value: '$3,000,000',
    approx: 'about ₹28.32 crore',
    gold: 'US$200 (USD) · ₹19,000',
    heavy: 'US$140 (USD) · ₹13,500',
    thin: 'US$115 (USD) · ₹11,000',
  },
];

export const PRICE_BY_CURRENCY: PriceByCurrencyRow[] = [
  {
    currency: 'Australian dollar',
    code: 'AUD',
    typical: 'A$55 (AUD)',
    range: 'A$33 (AUD) – A$340 (AUD)',
  },
  { currency: 'Bahraini dinar', code: 'BHD', typical: 'BHD 15', range: 'BHD 9 – BHD 90' },
  {
    currency: 'Canadian dollar',
    code: 'CAD',
    typical: 'CA$55 (CAD)',
    range: 'CA$32 (CAD) – CA$330 (CAD)',
  },
  { currency: 'Czech koruna', code: 'CZK', typical: 'CZK 830', range: 'CZK 480 – CZK 5,000' },
  { currency: 'Danish krone', code: 'DKK', typical: 'DKK 260', range: 'DKK 150 – DKK 1,550' },
  { currency: 'Euro', code: 'EUR', typical: '€34 (EUR)', range: '€20 (EUR) – €210 (EUR)' },
  {
    currency: 'Hong Kong dollar',
    code: 'HKD',
    typical: 'HK$310 (HKD)',
    range: 'HK$180 (HKD) – HK$1,850 (HKD)',
  },
  {
    currency: 'Indian rupee',
    code: 'INR',
    typical: '₹3,700 (INR)',
    range: '₹2,150 (INR) – ₹22,000 (INR)',
  },
  {
    currency: 'New Taiwan dollar',
    code: 'TWD',
    typical: 'NT$1,200 (TWD)',
    range: 'NT$700 (TWD) – NT$7,300 (TWD)',
  },
  {
    currency: 'New Zealand dollar',
    code: 'NZD',
    typical: 'NZ$70 (NZD)',
    range: 'NZ$40 (NZD) – NZ$420 (NZD)',
  },
  { currency: 'Norwegian krone', code: 'NOK', typical: 'NOK 390', range: 'NOK 230 – NOK 2,350' },
  { currency: 'Omani rial', code: 'OMR', typical: 'OMR 15', range: 'OMR 9 – OMR 90' },
  { currency: 'Polish zloty', code: 'PLN', typical: 'PLN 145', range: 'PLN 85 – PLN 880' },
  {
    currency: 'Pound sterling',
    code: 'GBP',
    typical: '£30 (GBP)',
    range: '£17 (GBP) – £180 (GBP)',
  },
  { currency: 'Qatari riyal', code: 'QAR', typical: 'QAR 145', range: 'QAR 85 – QAR 860' },
  { currency: 'Saudi riyal', code: 'SAR', typical: 'SAR 145', range: 'SAR 85 – SAR 880' },
  { currency: 'Singapore dollar', code: 'SGD', typical: 'SGD 50', range: 'SGD 29 – SGD 300' },
  { currency: 'Swedish krona', code: 'SEK', typical: 'SEK 380', range: 'SEK 220 – SEK 2,300' },
  { currency: 'Swiss franc', code: 'CHF', typical: 'CHF 32', range: 'CHF 18 – CHF 190' },
  { currency: 'UAE dirham', code: 'AED', typical: 'AED 145', range: 'AED 85 – AED 860' },
  {
    currency: 'US dollar',
    code: 'USD',
    typical: 'US$39 (USD)',
    range: 'US$23 (USD) – US$240 (USD)',
  },
];
