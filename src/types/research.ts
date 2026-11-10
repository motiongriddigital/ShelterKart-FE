import type { Quote } from '@/types/checkout';

export type ResearchRequest = {
  query: string;
  location?: string;
  market: string;
  lang?: string;
  country?: string;
};

/** The brief and the paywall are large and produced by the research engine; read the fields you need through a type guard. */
export type BriefResponse = {
  ok: boolean;
  brief: Record<string, unknown>;
  paywall: Record<string, unknown>;
};

export type ServerQuote = Quote & { ref: string };

export type QuoteRequest = {
  ref: string;
  previousQuoteId?: string;
  billingCountry?: string;
  country?: string;
  session?: string;
};

export type CheckoutRequest = {
  ref: string;
  idempotencyKey: string;
  quoteId?: string;
  billingCountry?: string;
  buyerKind?: 'individual' | 'business';
  taxId?: string;
  lang?: string;
};

/** Exactly one of `razorpay` or `mor` is present; their inner fields belong to the payment provider. */
export type CheckoutResult = {
  ok: boolean;
  purchaseId: string;
  razorpay?: Record<string, unknown>;
  mor?: Record<string, unknown>;
};

export type RazorpayVerifyRequest = {
  ref: string;
  purchaseId: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type DocumentCheckRequest = {
  query: string;
  location?: string;
  market: string;
  /** The document as base64, at most about 8 MB of file. */
  file: string;
  mediaType: 'application/pdf' | 'image/jpeg' | 'image/png' | 'image/webp';
  lang?: string;
  country?: string;
};

export type DocumentCheckResult = {
  ok: boolean;
  result: {
    documentType: string;
    checks: { topic: string; status: string; detail: string; action: string }[];
  };
};

export type DeliveryContact = { email?: string; phone?: string };
