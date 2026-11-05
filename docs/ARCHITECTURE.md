# ShelterKart web: developer guide

How the site is put together, how a request flows through it, and where to go to change or fix something.
Paths are relative to `web/`.

## 1. The big picture

```
Browser ──► Next.js (this app, :3000) ──/api, /r, /samples, /assets, /guide/pdf──► Express backend (:4000)
                │                                                                      (backend/server.js)
                └─ serves: home (/), doc pages, /admin, static files in public/
```

- **Next.js** renders every page. **Express** stays the API and still serves the live report page `/r/<ref>`.
- `next.config.ts` forwards the backend paths. Set `API_ORIGIN` (default `http://localhost:4000`).
- **Demo mode** (default): no backend needed; reports are the 3 samples. Set `NEXT_PUBLIC_DEMO_MODE=false` for live.

### Three independent "sites" (route groups)

Each group has its **own root layout**, so its global CSS loads only on its pages. Moving between them is a full page load.

| Group              | URLs                                                                                                  | Layout               | Styles                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------- |
| `src/app/(home)/`  | `/`                                                                                                   | `(home)/layout.tsx`  | Tailwind classes in each component (`styles/tailwind.css`) |
| `src/app/(site)/`  | `/about /contact /corrections /delivery /independence /methodology /pricing /privacy /refunds /terms` | `(site)/layout.tsx`  | CSS Modules + `src/styles/globals.scss`                    |
| `src/app/(admin)/` | `/admin`                                                                                              | `(admin)/layout.tsx` | `(admin)/admin/styles/admin.scss`                          |

## 2. The layers (who may call whom)

```
page.tsx / components   UI only: render props, call hooks, no business logic
        │
     hooks/             logic and state wiring (search, checkout, forms, voice, i18n switch ...)
        │
  store/ (Zustand)      state shared between components or routes
  utils/                pure functions (matching, prices, validators, proof-of-work)
  app/_api/             every network call (fetch wrapper + one file per area)
        │
  constants/ types/     static data and TypeScript types
  configs/ i18n/        env, fonts, metadata, translations
```

Rules we kept: a component never calls `fetch`; logic lives in a hook or util; static data lives in `constants/` and is
passed to client components as props from the server `page.tsx`; `"use client"` only on interactive leaves.

## 3. Folder map

```
src/
├─ app/
│  ├─ (home)/                 HOME PAGE
│  │  ├─ page.tsx             server: the sections in reading order (no logic)
│  │  ├─ layout.tsx           <html lang dir>, I18nProvider, Tailwind, fonts
│  │  └─ components/          one folder per section, Tailwind only:
│  │                          layout/ (SiteHeader, StatusStrip, SiteFooter, NavItem) · hero/ (Hero, PillarCards) ·
│  │                          markets/ (MarketCoverage, LanguageSelect) · search/ (SearchPanel, SuggestPanel,
│  │                          VoicePanel, RememberForm, SampleLinks) · guide/ (GuideCard, GuideModal) ·
│  │                          docket/ · cta/ · report/ (ReportPanel, ShadowReport, InvestigationSteps) ·
│  │                          modals/ (HomeModals, PayModal, RestoreModal, DisputeModal, ReplyModal) · notices/
│  ├─ (site)/<page>/page.tsx  one folder per doc page; pricing/ and contact/ also have components/, data/
│  ├─ (admin)/admin/          ADMIN: page.tsx, components/ (Dashboard + cards), styles/
│  └─ _api/                   http.ts · research.ts · samples.ts · track.ts · markets.ts · admin.ts
├─ components/                shared UI: layout/ (DocPage, DocNav, SiteHeader, SiteFooter, NavItem, DraftBanner),
│                             ui/ (Modal, Flag, BrandMark, ActionLink, Placeholder), content/ (Terms, Privacy,
│                             Methodology, Principles text, used by both the doc pages and the home modals)
├─ hooks/                     see section 5
├─ store/                     preferences (market, city) · modal (which dialog is open) · report (view, ref) ·
│                             checkout (session, paidContact) · buyer (country, countries) · adminSession
├─ constants/                 markets, flags, demoRecords, samples (index), pricingCountries, business, terms,
│                             navigation, admin
├─ utils/                     demoSearch, dossiers, price, quote, validators, proofOfWork, storage, markets,
│                             apiErrors, business, adminMetrics, format
├─ i18n/                      index.ts (createT, pickLang) · server.ts (getLang/getT) · I18nProvider.tsx ·
│                             languages.ts · messages/<lang>.json
├─ guards/RequireAdminSession.tsx
├─ configs/                   env.ts · fonts.ts · metadata.ts
├─ styles/                    tokens.scss (brand vars) · _theme.scss (GENERATED) · globals.scss · mixins/breakpoints
└─ types/                     market, search, report, checkout, speech, track, admin, ...
public/   guide/index.html (guide reader) · samples/<id>.json (report HTML + price tables) · sample-reports/*.pdf
          admin/demo-data.json · fonts/
scripts/build-tokens.mjs      regenerates src/styles/_theme.scss from ../brand/dist/tokens.css (skipped in CI)
```

## 4. Page flows

### 4.1 Home page load

1. `(home)/layout.tsx` calls `getLang()` (cookie `sk_lang` → `Accept-Language` → English) and `getDict(lang)`, sets
   `<html lang dir>`, and wraps children in `<I18nProvider>`.
2. `(home)/page.tsx` (server) renders `DemoBanner`, `ConsentBanner`, `Hero`, `HomeModals`. Server components use
   `const t = await getT()`; client components use `const t = useT()`.
3. `Hero` composes: `HeroMasthead` → `EvidenceStandard` → `MarketPicker` → `LanguageBar` → `SearchCard` → `GuideCard`
   → `ReportPanel` → headline → `HeroFoot`.

### 4.2 Choosing a market / language

- Market click → `useMarketSelection` → `store/preferences.setMarket` (also resets the city). Caption re-keys to replay
  its animation. `LanguageBar` reads the market to offer that market's languages (`i18n/languages.ts: MARKET_LANGUAGES`).
- Language change → `useLanguageSwitch` writes cookie `sk_lang` and calls `router.refresh()`; the server re-renders.

### 4.3 Search (demo mode)

```
SearchCard ─► useSearch.submit(q)
   ├─ findDossier(q)  (utils/dossiers.ts)  hit ─► useDossierFlow.investigate(id) ─► ReportPanel
   └─ no hit ─► matchDemoRecords (utils/demoSearch.ts) ─► SuggestPanel (list / did-you-mean / record / empty)
```

Voice: mic button → `useVoiceSearch` (Web Speech API) → confirm panel → `onSearch(text)`.

### 4.4 Sample report journey

```
investigate(id)  store/report.view = investigating ─(~4.7 s)─► preview ─Unlock─► checkout ─Pay─► full
ReportPanel reads store/report.view
   investigating → InvestigationSteps (useStepProgress)
   preview/full  → useDossierHtml → _api/samples.getDossierHtml → public/samples/<id>.json
                 → ShadowReport mounts the pre-rendered HTML in a shadow root
```

`ShadowReport` also handles clicks inside the report: guide links (`useGuide`), reply links (opens `ReplyModal`).

### 4.5 Checkout (sample reports)

`Unlock` → `useStartCheckout(id)` (hooks/useCheckout.ts) builds a quote from `samples/<id>.json → quotes[country]`
(`utils/quote.ts`), stores it in `store/checkout`, opens `payModal`. `PayModal` + `useCheckout`:

- billing country changed → re-quote with a banner; lock expired (30 min) → re-quote; bad e-mail/phone → inline error;
- success → `paid(contact)`, `store/report.view = full`, modal closes.
  Buyer country comes from `useBuyerCountry` (remembered choice → network guess when live → browser region).

### 4.6 Live mode (`NEXT_PUBLIC_DEMO_MODE=false`)

`useSearch.startLive` → `_api/research.startInvestigation` → `POST /api/investigate`. On HTTP 428 `challenge` it solves
`utils/proofOfWork.ts` and retries → `window.location = /r/<ref>` (Express page; its paid checkout is NOT in this app).
Restore (`useRestore`), dispute and reply (`useReportForms`) post to `/api/research/recover`, `/api/dispute`,
`/api/developer-response`.

### 4.6b Source consent and live search candidates

- Visit source: `utils/visitSource.ts` keeps the first page's UTM + referrer in `sessionStorage('sk_src')`, only where
  allowed. `useConsent` asks first (banner `#sourceChoice`) when `/api/source-consent` says `required` (EEA/UK/CH/unknown),
  then shows the data notice. The backend-served checkout page reads these same keys.
- Candidates: when `/api/search/config` returns `on`, `useSearch.showCandidates` posts `/api/search/candidates` and shows up
  to five projects; "None of these" opens `RememberForm`; "Research anyway" starts the investigation as typed.

### 4.7 Dialogs

`store/modal.openId` is the single source of truth. `components/ui/Modal.tsx` shows a dialog when `openId === id` and
uses `useModalA11y` (focus trap, Esc, restores focus, hides `#landing` from screen readers).
Add a dialog: add its id to `ModalId` in `store/modal.ts`, render `<Modal id=...>` in `HomeModals.tsx`, open it with
`useModalStore().open(id)`.

### 4.8 Admin

```
/admin ─► RequireAdminSession (guards/) ─ no session ─► LoginScreen ─ useAdminLogin ─► _api/admin.checkCredentials
                                       └ session ────► Dashboard ─ useAdminDashboard ─► _api/admin.loadDashboard
```

- **Live**: Basic-auth header kept in memory only (`store/adminSession`), all calls to `/api/admin/*`.
- **Demo**: "Open the demo dashboard" reads `public/admin/demo-data.json`; resolve/approve actions mutate it in memory.
- A 401 anywhere signs out. Each panel failing is shown in a banner, not fatal.
- Cards are in `(admin)/admin/components/`; numbers/targets logic is in `utils/adminMetrics.ts` and `constants/admin.ts`.

### 4.8b Marketing numbers and Marketing desk (admin, live only)

- `/admin/marketing` (`(admin)/admin/marketing/`): weekly numbers per market, early warnings, Phase 1 gate, repeat/change/stop,
  ranking, and the input forms (spend, AI-answer checks, effort, settings). Logic: `hooks/useMarketingDashboard.ts`,
  pure view helpers `utils/marketingView.ts`, API `app/_api/marketing.ts`.
- `/admin/social` (`(admin)/admin/social/`): the social marketing desk: status, next-24-hours queue with veto, weekly pack
  (plan, build, read sample, PIN approval), facts keeper, pauses and incidents, audit chain. Hooks `useSocialDesk`,
  `useWeeklyPack`, `useFactsDesk`; API `app/_api/social.ts`.
- Both use `app/_api/desk.ts` (`deskCall`: never throws, returns `{ok, error, status}`), share `DeskShell` (sign-in guard +
  nav) and the CSS module `admin/styles/desk.module.scss`. They need the live backend; demo mode shows a message.

### 4.9 Doc pages

`DocPage` (title, `DraftBanner`, `DocNav`) wraps each page's text. The draft banner and red `[... to be filled in]`
markers disappear once `constants/business.ts` is filled (legal name, address, phone, support e-mail, grievance officer).
Nav entries: `constants/navigation.ts`.

## 5. Hooks cheat-sheet

| Hook                                                    | Does                                                              |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| `useSearch`                                             | search box state machine (demo matching, dossier hit, live start) |
| `useVoiceSearch`                                        | microphone permission and speech-to-text flow                     |
| `useMarketSelection`                                    | selected market/city from the store                               |
| `useDossierFlow` / `useDossierHtml` / `useStepProgress` | sample report journey and loading                                 |
| `useStartCheckout` / `useCheckout` / `useCountdown`     | quote, price lock, re-quote, simulated payment                    |
| `useBuyerCountry`                                       | buyer's country and the list of sellable countries                |
| `useRestore` / `useDisputeForm` / `useReplyForm`        | modal forms                                                       |
| `useGuide`                                              | open/download/share the free guide                                |
| `useLanguageSwitch` / `useT` / `useLang`                | language cookie + translation access                              |
| `useModalA11y` / `useOutsideClick` / `useConsent`       | dialog accessibility, click-away, consent banner                  |
| `useAdminLogin` / `useAdminDashboard`                   | admin sign-in and data loading                                    |

## 6. "I need to change X" → go here

| Task                                | File                                                                                                 |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Add/rename a market, its cities     | `constants/markets.ts` (+ flag in `constants/flags.ts`, order in `MARKET_ORDER`)                     |
| Add a language                      | `i18n/languages.ts` (`LANGUAGES`, `MARKET_LANGUAGES`) + `i18n/messages/<code>.json`                  |
| Edit or add a UI string             | wrap in `t('English text')`; add the translation to each `messages/*.json` (English text is the key) |
| Change prices tables on /pricing    | `app/(site)/pricing/data/priceBook.ts` (generated from `tools/build_price_book.js`)                  |
| Change sample report content/prices | `public/samples/<id>.json`, index in `constants/samples.ts`                                          |
| Add a sample report                 | new `public/samples/<id>.json`, PDF in `public/sample-reports/`, entry in `constants/samples.ts`     |
| Fill in company details             | `constants/business.ts`                                                                              |
| Terms / Privacy / Methodology text  | `constants/terms.ts`, `components/content/*Content.tsx` (shared by pages and modals)                 |
| Home copy, links, stats, footer     | `constants/home.ts` (typed in `types/home.ts`); the markup is in `(home)/components/<section>/`      |
| Brand colours/fonts                 | edit `brand/tokens.json`, run `npm run tokens` (regenerates `src/styles/_theme.scss`), commit it     |
| New backend route to proxy          | `rewrites()` in `next.config.ts`                                                                     |
| New API call                        | function in `app/_api/<area>.ts` using `http()`; call it from a hook, never a component              |
| Demo records for search             | `constants/demoRecords.ts`                                                                           |
| Admin panel numbers/targets         | `constants/admin.ts` (`TARGETS`), `utils/adminMetrics.ts`                                            |
| Env flags                           | `configs/env.ts` (`IS_DEMO`, `API_ORIGIN`, `SITE_URL`)                                               |

## 7. Debugging guide

| Symptom                        | Look at                                                                                                         |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Page text in wrong language    | cookie `sk_lang`; `i18n/server.ts: getLang`; missing key falls back to English                                  |
| Language switch does nothing   | `useLanguageSwitch` (cookie + `router.refresh`); is the page dynamic? (home reads cookies)                      |
| Market click ignored           | `store/preferences.ts`, `MarketPicker.tsx`                                                                      |
| Search shows nothing           | `useSearch.ts` → `utils/demoSearch.ts` → `SuggestPanel.tsx`; `view.mode` tells which branch ran                 |
| Report area blank after search | `store/report.view`; `/samples/<id>.json` loads? (Network tab); `ReportPanel.tsx`                               |
| Checkout price wrong / missing | `useStartCheckout` (country → `quotes[iso]`), `store/buyer.ts`, `useBuyerCountry`                               |
| Dialog won't open/close        | `store/modal.openId`; `Modal.tsx`; is the id in `ModalId`?                                                      |
| Live search fails              | `/api/investigate` via proxy (`API_ORIGIN`, backend running?); `_api/research.ts`; 428 → `utils/proofOfWork.ts` |
| `/r/<ref>` 404                 | proxy rule in `next.config.ts`; backend must serve it                                                           |
| Admin login loops              | `store/adminSession`; 401 from `/api/admin/*`; credentials set on the server                                    |
| Styling glitch on home         | the classes are on the element itself; check the component, and `components/ui/{Button,Field,Modal}`            |
| Build fails on SCSS            | a stray `}` or a selector without a body in a legacy partial (browsers ignore these, Sass does not)             |
| Brand colours not updating     | run `npm run tokens`; CI uses the committed `_theme.scss`                                                       |

## 8. Conventions

- Components: PascalCase files; hooks `useXxx.ts`; utils/constants camelCase.
- Server components are the default; add `"use client"` only for state, effects or event handlers.
- No inline styles. Tailwind first, SCSS only for structural or repeated rules.
  - **Tailwind** (default, with responsive `sm:`/`md:`/`lg:` classes; breakpoints are 600/900/1200px): layout, spacing, colour, type, state. Colours come from the brand tokens through `src/styles/tailwind.css` (`bg-navy`, `text-slate`, `border-rule`, `text-disputed`...). The admin console has its own theme in `admin/styles/console.css`.
  - **SCSS** for prose rules on plain tags (`DocPage.module.scss`), the raw-tag rules inside the desks (`desk.module.scss`), the colour variables in `admin.scss`, and nothing on the home page. The desks' and dashboard's shared looks are Tailwind class constants in `admin/styles/ui.ts`.
  - Unlayered CSS beats Tailwind utilities. Wrap any global rule that a utility may need to override in `@layer base`.
  - `(home)`, `(report)`, `(site)` and `(admin)` all use Tailwind. The home page has no SCSS.
- Strings go through `t()`. Data in `constants/`. Network in `app/_api/`.
- SCSS: use nesting, the shared variables/mixins (`src/styles/`, top of `admin.scss`) and `@each` maps instead of repeating rules.

## 9. Commands

```bash
npm run dev            # dev server (runs `tokens` first)
npm run build          # production build
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
npm run format         # Prettier write   (format:check = CI check)
npm run tokens         # regenerate src/styles/_theme.scss from the brand folder
```

CI (`.github/workflows/ci.yml`): `format:check` → `lint` → `typecheck`, then `build`.

## 10. Known gaps

- `/r/<ref>` (live report + Razorpay checkout) is still served by Express.
- Classic research flow, "How we grade evidence" page, and doc-page translations are not ported.
- Live paths (search, restore, dispute, reply, admin sign-in) were written but not tested against a running backend.
