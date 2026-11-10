# Next.js API reference

Every route handler in `src/app/api/`, the service function that calls it, and the backend it forwards to
(`API_ORIGIN`, default `http://localhost:4000`). All handlers are thin `forward` calls (see
`src/app/api/_lib/backend.ts`); the input and response shapes below are the Express backend's.

Format: **name - path - input/params - response**

Routes marked **(existing)** were already in the repo before this reference was written; the rest were added for
this task. "Verified" means it was called end to end through `next dev` and the backend during this work; anything
else has not been exercised here.

## Conventions

- Browser code never calls these with a bare backend URL — always `/api/...`, same-origin, cookie included.
- POST/PATCH bodies are JSON; send `Content-Type: application/json` (the `http()` service helper does this for you).
- Errors are `{ "ok": false, "error": "...", "code"?: "..." }`.
- `auth_required` (401) from any `/api/me*` or guarded route means: open sign-in, then repeat the call.

## Reference data

1. **Markets** (existing, `getMarketStatuses`) - `GET /api/markets` - none - array of `{ code, label, status, depth, note }`
2. **Languages** (`getLanguages`) - `GET /api/languages` - none - `{ ok, languages: [{ code, native, name, dir, locale, review }] }`
3. **Pricing countries** (existing, `getPricingCountries`) - `GET /api/pricing/countries` - none - `{ ok, countries: [{ iso, name, currency, onSale, reason? }], network? }`
4. **Source consent mode** (existing, `getSourceConsentMode`) - `GET /api/source-consent` - none - `{ mode: "required" | "notice" }`
5. **Search mode** (existing, `getSearchMode`) - `GET /api/search/config` - none - `{ mode?: SearchMode }`
6. **Search candidates** (existing, `fetchCandidates`) - `POST /api/search/candidates` - body `{ query, location, market, remember? }` - `CandidateResult`

## Sign-in

7. **Request sign-in code** (`requestSignInCode`) - `POST /api/auth/request-code` - body `{ email, language?, pow? }` - `202 { ok, cooldownSeconds, codeLength, devCode? }`. `429` carries `retryAfter`; `428 challenge` means solve proof of work and resend.
8. **Verify sign-in code** (`verifySignInCode`) - `POST /api/auth/verify-code` - body `{ email, code, termsAccepted? }` - `200 { ok, isNewUser, user }`, sets the session cookie. `400 invalid_code` carries `attemptsLeft`; `400 consent_required` means resend with `termsAccepted: true`.
9. **Sign out** (`signOut`) - `POST /api/auth/logout` - cookie - `{ ok }`
10. **Sign out everywhere** (`signOutEverywhere`) - `POST /api/auth/logout-all` - cookie - `{ ok }`

## Account

11. **Get me** (`getMe`) - `GET /api/me` - cookie - `{ ok, user: { id, email, displayName, country, language, phone, createdAt } }`, or `401 auth_required`
12. **Update me** (`updateMe`) - `PATCH /api/me` - body `{ displayName?, country?, language?, phone? }` - `{ ok, user }`
13. **Delete me** (`deleteMe`) - `DELETE /api/me` - body `{ confirm: "DELETE" }` - `{ ok }`
14. **My reports** (`getMyReports`) - `GET /api/me/reports` - cookie - `{ ok, reports: [{ ref, projectName, market, paid, purchasedAt, amount, currency, firstOpenedAt, lastOpenedAt }] }`
15. **Export my data** (`MY_DATA_EXPORT_URL`, a link not a fetch) - `GET /api/me/export` - cookie - file download

## Search and reports

16. **Run research** (`runResearch`) - `POST /api/research` - body `{ query, market, location?, lang?, country?, pow? }` - `{ ok, brief, paywall }`. `428 challenge` if a new search needs proof of work.
17. **Start investigation** (existing, `startInvestigation`) - `POST /api/investigate` - body `{ query, location, country, market, pow? }` - `{ ok, ref }`
18. **Research challenge** (existing, used by `proofOfWork`) - `GET /api/research/challenge` - none - `{ ok, token, bits }`
19. **Get report by ref** (`getReportByRef`) - `GET /api/research/by-ref/[ref]` - path `ref`; query `lang?`, `country?`; header `X-Report-Access?` - `{ ok, brief, paywall }`, or `404`
20. **Save delivery contact** (`saveDeliveryContact`) - `POST /api/investigate/[ref]/contact` - path `ref`; body `{ email?, phone? }` (at least one) - `{ ok }`
21. **Document check** (`checkDocument`) - `POST /api/research/document-check` - body `{ query, market, file (base64), mediaType, location?, lang?, country? }`; header `X-Report-Access?` - `{ ok, result: { documentType, checks: [{ topic, status, detail, action }] } }`
22. **Recover access** (existing, `recoverAccess`) - `POST /api/research/recover` - body `{ paymentId }` - `{ ok, ref, token }` (retired: `410 use_account` in practice, use **My reports**)

## Payments

23. **Get quote** (`getQuote`) - `POST /api/research/quote` - body `{ ref, billingCountry?, country?, previousQuoteId?, session? }` - `{ ok, quote: { id, ref, country, currency, net, tax, gross, expiresAt, ... } }`
24. **Start checkout** (`startCheckout`) - `POST /api/research/checkout` - body `{ ref, idempotencyKey, quoteId?, billingCountry?, buyerKind?, taxId?, lang? }` - `{ ok, purchaseId, razorpay? | mor? }`. Currently `503 "Payments are not enabled yet."`.
25. **Verify Razorpay payment** (`verifyRazorpayPayment`) - `POST /api/research/razorpay/verify` - body `{ ref, purchaseId, razorpay_payment_id, razorpay_signature }` - `{ ok, token }`
26. **Get access token** (`getAccessToken`) - `POST /api/research/access` - body `{ ref, purchaseId }` - `{ ok, token }`

## Right of reply

27. **Submit response** (`submitResponse`) - `POST /api/responses` - body `{ reportRef, role, kind, body, email, findingId?, findingText?, evidenceUrls?, senderName?, website? }` - `{ ok, publicRef, statusKey }`
28. **Confirm response** (`confirmResponse`) - `POST /api/responses/confirm` - body `{ token }` - `{ ok, publicRef, state }`
29. **Response status** (`getResponseStatus`) - `GET /api/responses/status/[publicRef]` - path `publicRef`; query `key` - `{ ok, publicRef, kind, state, createdAt, resolution }`, or `404`
30. **Report responses** (`getReportResponses`) - `GET /api/responses/[reportRef]` - path `reportRef` - `{ ok, replies, corrections, counts }`
31. **Developer replies** (`getDeveloperReplies`) - `GET /api/developer-response/[reportRef]` - path `reportRef` - `{ responses: [] }`
32. **Submit dispute** (existing, `submitDispute`) - `POST /api/dispute` - body `{ contact, note, reportRef }` - unspecified ok shape
33. **Submit developer reply** (existing, `submitDeveloperReply`) - `POST /api/developer-response` - body `{ reportRef, findingText, responseText, contactEmail }` - unspecified ok shape

## Analytics

34. **Track event** (existing, `track`) - `POST /api/track` - body `{ event, path, referrer?, utm?, lang? }` (fixed `event` list, see `src/types/track.ts`) - `204` no body, or `400 { ok: false }` for an unknown event

## Admin (not for buyer-facing pages)

35. **Admin catch-all** (existing, `src/services/admin.ts` and others) - `GET|POST /api/admin/[...path]` - whatever the matched `/api/admin/*` route needs - whatever that route returns. HTTP Basic auth, checked by the Express backend.

## Verified end to end in this session

Languages (2), request/verify sign-in code (7, 8), get/update me (11, 12), get report by ref (19), start checkout (24,
confirmed it answers 503 while payments are off).

## Not yet verified here

Everything else above — in particular delete me (13), my reports (14), export (15), run research (16), document
check (21), quote/access/razorpay-verify (23, 25, 26), and the right-of-reply routes (27–31) — has not been called
through `next dev` in this session. They forward to backend routes documented in
`ShelterKart-BE/docs/api/openapi.yaml`; treat that file as the source of truth if this one and the code disagree.
