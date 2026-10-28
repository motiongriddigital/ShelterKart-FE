export type PricingCountry = {
  iso: string;
  name: string;
  currency: string;
  onSale: boolean;
  reason?: string;
};

export type Quote = {
  id: string;
  country: string;
  currency: string;
  net: number;
  tax: number;
  gross: number;
  taxName?: string;
  taxRateBps?: number;
  taxBy?: string;
  issuedAt: string;
  expiresAt: string;
  depthLabel?: string;
};

export type RawQuote = Omit<Quote, 'id' | 'country' | 'issuedAt' | 'expiresAt' | 'depthLabel'>;

export type Contact = { email: string; phone: string };

/** One open checkout: what the buyer sees is exactly what is charged. */
export type CheckoutSession = {
  dossierId: string;
  title: string;
  quote: Quote;
  billing: string;
  banner: string;
};
