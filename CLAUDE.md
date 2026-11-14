# ShelterKart web: rules for AI contributors

Read this before changing anything in `web/`. It tells you how to work so every change looks like it was written by one
person. `docs/ARCHITECTURE.md` explains how the app is built; this file explains how to work on it.
Paths are relative to `web/`.

## 0. The one rule

**Change only what the task needs.** No drive-by refactors, renames, reformatting of untouched files, dependency
bumps, or "while I'm here" fixes. If you spot something else worth fixing, mention it in your reply and leave it alone.
When a task is ambiguous, ask one short question instead of guessing wide.

## 1. Start of every task

1. **Sync first.** Before creating a branch, get the latest code from the default branch and branch from it:
   ```bash
   git fetch origin
   git checkout <default-branch>      # `master` today; confirm with: git remote show origin | grep "HEAD branch"
   git pull --ff-only origin <default-branch>
   git checkout -b feat-<short-name>  # only after the name is approved (see section 8)
   ```
   If the working tree has uncommitted changes, stop and tell the user; do not stash, discard or carry them silently.
2. **Read before writing.** Open the nearest existing feature (home, about, pricing, report) and copy its structure,
   naming and comment density. Search `components/ui/`, `components/layout/`, `hooks/`, `utils/` and `constants/` for
   something reusable before writing anything new.
3. **Plan small.** List the files you will add or touch. If a file is not on that list, do not edit it.

## 2. Architecture: four layers

Every feature is split into these layers. Dependencies point downward only: UI → hooks → state/service.

| Layer       | Lives in                                               | Job                                                                                                                                                           |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI**      | `app/**/page.tsx`, `app/**/components/`, `components/` | Render props and call hooks. No `fetch`, no business logic, no data tables.                                                                                   |
| **Hooks**   | `hooks/`                                               | Logic and state wiring for one concern (`useSearch`, `useCheckout`). Return what the UI needs.                                                                |
| **Service** | `services/`                                            | Typed client functions, one file per area, through `services/http.ts`. They call **our Next.js API routes** (`/api/...`), never the Express backend directly. |
| **State**   | `store/` (Zustand)                                     | State shared across components or routes only. Local UI state stays in `useState`.                                                                            |

Supporting folders (not layers): `constants/` (static data and copy), `types/`, `utils/` (pure functions), `configs/`, `i18n/`.

Rules:

- A component never calls `fetch` and never holds business rules. Put the call in `services/`, the logic in a hook.
- **API flow:** UI → hook → `services/` service → Next.js route handler (`app/api/<area>/route.ts`) → real Express backend.
  See section 2a.
- Static data and copy go in `constants/<feature>.ts`, typed in `types/<feature>.ts`. Components map over them.
- Server Components by default. Add `'use client'` only to interactive leaves (forms, toggles, filters) and keep
  those leaves small, so the surrounding page stays on the server.
- A purely static page (about, pricing) may have no hook, service or store. Do not invent layers it does not need,
  but never put logic in the UI to avoid creating one when it is needed.
- New global state needs a reason. Prefer props, then a hook, then a store.

### 2a. API flow (service layer and the Next.js backend)

```
component ─► hook ─► services/<area>.ts ─► app/api/<area>/route.ts ─► Express backend (API_ORIGIN)
   UI        logic   service layer     Next.js backend (server)      real server
```

- **The service layer talks only to our own Next.js API routes** (`/api/...`). It never knows the Express URL, and the
  browser never calls Express directly.
- **Route handlers are the only place that calls the real backend.** They live in `app/api/<area>/route.ts` (server
  only), read `API_ORIGIN` from `configs/`, forward the request through one shared server-side backend client, and
  return a clean typed response. Keep them thin: validate input, forward, map the result and the errors.
  Secrets, tokens and backend URLs stay here and never reach client code.
- **Folder rule:** route handlers live only under `app/api/` (for example `app/api/users/route.ts`); the one shared
  helper is `app/api/_lib/backend.ts` (`proxy`, `forward`), a private folder that is not routed. The service layer
  lives in `src/services/`, outside `app/`. Never put a `route.ts` in `services/` or a service file in `app/api/`, and do
  not use a `_api` folder (the underscore makes it private and unrouted).
- **Route handlers are real HTTP endpoints.** A `GET` handler can be opened in the browser (`/api/users`); the
  Next.js backend is not hidden from the client. So every handler validates its input and checks authorisation itself
  (admin routes verify the session), and never returns more than the UI needs. Do not rely on "only `fetch` can reach it".
- One area, one set of files: `types/<area>.ts` (request and response types shared by both sides),
  `services/<area>.ts` (client functions), `app/api/<area>/route.ts` (handler). Do not duplicate a type on each side.
- Errors: the handler returns a consistent error shape and the right status; the service function turns it into a typed
  result or a thrown error that the hook handles. Components only show the hook's state (loading, error, data).
- Server Components may call the shared server-side backend client directly instead of going through their own route
  (no extra hop), but client components and hooks always go through `services/`.
- **Adding a route:** create `app/api/<area>/route.ts` with `export const GET = forward;` (or `POST`) from
  `@/app/api/_lib/backend`; it forwards to the Express endpoint at the same path. Use `proxy(req, '/other/path')` when the
  paths differ, and write a real handler only when it must validate or reshape something. Admin calls already go
  through the catch-all `app/api/admin/[...path]/route.ts`.
- `next.config.ts` still rewrites `/api/:path*` to Express as a fallback for pages Express serves itself (`/r/...`) and
  its webhooks. A route handler at the same path wins over that rewrite. Do not remove the fallback until those
  endpoints have handlers too.

## 3. Modular structure

One folder per page, one component per section, one file per component:

```
app/(group)/<page>/
├─ page.tsx            assembles sections in reading order; no markup beyond a container
└─ components/         <Section>.tsx, each small and single-purpose (aim for under ~150 lines)
constants/<page>.ts    content and lists
types/<page>.ts        types for that content
```

- `page.tsx` stays thin: container, then `<HeroSection />`, `<NextSection />` ...
- If a component is used by two pages, move it to `components/ui/` (atoms) or `components/layout/` (frame), and update
  both callers in the same change. Page-specific pieces stay inside that page's `components/`.
- Reuse the shared pieces that exist: `Button` (+ `buttonVariants`), `Input`/`Textarea`/`Select`, `Modal`,
  `SectionHeading`, `Logo`, `ThemeToggle`, `Placeholder`, `ActionLink`. Never create a second button or input.
- Use `next/link` `Link` for navigation, never a bare `<a>` for internal routes.
- Imports use the `@/` alias, not long relative paths (a sibling `./` import inside one folder is fine).

## 4. DRY

- **Repeated markup is data plus `.map()`.** Two or more similar cards, rows, list items or links means one constant
  array and one `.map()` with a stable `key`. Do not paste the same block twice.
- **Repeated styling is a component or a shared class constant**, not copied class strings. If the same Tailwind string
  appears three times, extract a component (preferred) or a `const CARD = '...'` at the top of the file.
- **Repeated logic is a hook or a util.** Do not duplicate a fetch, a validator or a formatter.
- Do not abstract too early either: extract on the second or third real use, not for a single caller.

## 5. Styling: Tailwind only, light and dark from the start

- Tailwind utility classes only. **Do not add SCSS, CSS Modules or inline `style`** to new work. The legacy SCSS that
  remains (admin, doc `.prose`, `globals.scss`) is left as is unless the task is to migrate it. The only inline style
  allowed is a value that truly cannot be a class (a computed width percentage).
- No unnecessary classes: no defaults restated, no duplicated utilities, no wrapper `div` that adds nothing.
- Use palette classes (`slate`, `blue`, `emerald`, `rose`, `amber`, `violet`) and the semantic tokens (`bg-background`,
  `text-foreground`, `bg-primary`, `border-input`, `text-ink`). The `.dark` block in `styles/tailwind.css` remaps them,
  so most elements flip themes with no `dark:` prefix.
- **Every new page or section ships with light and dark styling, and you check both in the browser** before saying
  it is done. Specific cases:
  - Inverted pair like `bg-slate-900 text-white`: add `dark:bg-amber-400 dark:text-slate-950`.
  - A band that stays dark in both themes: fixed hex (`bg-[#0a1c33] text-[#fff]`), with an explicit text colour on
    headings inside it (global heading rules would otherwise win).
  - Never rely on `text-white` or `bg-white` meaning literal white in dark mode; both are remapped.
  - New colour needed in dark? Add its remap to the `:root.dark` block in `styles/tailwind.css`, not a one-off.
- **Mobile first and responsive.** Write the base class for phones, then add `sm:` (600px), `md:` (900px), `lg:`
  (1200px). Check 375px, a tablet width, 1280px and 1480px. No horizontal scroll at any width: tables go in an
  `overflow-x-auto` wrapper with a `min-w-*` table.
- **Width and scale:** page container is `mx-auto max-w-[1900px] px-4 md:px-8 xl:px-12`. Root font scaling
  (112.5% from 1280px, 125% from 1600px) is set on the route group's layout; do not re-implement it per page.
  Use `rem` based sizes so scaling works; avoid fixed `px` text sizes.
- Use logical properties for direction support (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`).
- Accessibility: real headings in order, `aria-label` on icon-only buttons, `aria-hidden` on decorative icons, visible
  focus, `alt` on images. Real logo files live in `public/logo/` (use the `Logo` component).

## 6. Copy and i18n

- English text is the translation key. In server components use `getT()`; in client components `useT()`. Do not
  hard-code user-facing strings in a way that bypasses `t()` on pages that already use it.
- Registered-business details come from `constants/business.ts` through `Placeholder`; never invent legal names,
  addresses or numbers. Content taken from a design image goes in `constants/` and is flagged to the user for review.

## 7. Code style

- TypeScript strict, no `any`, no unused code, no commented-out code. Match the surrounding comment density: short
  comments explaining _why_, none restating _what_.
- Prettier and ESLint are the formatter and linter. Run them only on files you touched, not the whole repo.
- Do not add dependencies without asking. Do not edit `package.json`, lockfiles, configs or `.env*` unless the task
  requires it.
- Do not touch `backend/`, `tools/`, `docs/` of other areas, or files outside `web/` unless asked.

## 8. Git workflow

- **Propose first.** Before creating a branch or committing, show the user the branch name and the commit message and
  wait for approval. Do not create the branch or put code on it first (work on the synced default branch or in the
  working tree until approved).
- Branch names: `feat-<name>`, `fix-<name>`, `chore-<name>`, lowercase with hyphens. One branch per task. Branch from
  the freshly pulled default branch (section 1), not from another feature branch, unless the user says it depends on
  that work.
- Commit messages: conventional style, `type(scope): summary`, then a short body of bullets saying what and why. End
  with the attribution line the harness tells you to use.
- Stage files by name (`git add <paths>`), never `git add -A`. Keep unrelated files (for example `todo.txt`) out.
- **Never push, open a PR, force-push or merge without an explicit yes** from the user, each time.
- Do not rewrite history that is already pushed.

## 9. Verify before you say "done"

Run these on the code you changed, and report the real result (including failures):

```bash
npx prettier --write <touched files>
npx tsc --noEmit
npx eslint src --quiet
```

Then look at it:

- Open the page in the dev server (`npm run dev`, or the already running port; the browser pane works) in **light and
  dark**, at **375px and desktop widths**. Check for no horizontal scroll, readable contrast, working interactions.
- If you could not verify something (a live backend path, another language, a width), say so plainly.

## 10. Definition of done

- [ ] Branch was created from the freshly pulled default branch, with an approved name.
- [ ] Only files needed for the task were changed.
- [ ] UI, hook, service and state responsibilities are in the right layer; no `fetch` or logic in components.
- [ ] New API calls go component → hook → `services/` → `app/api/` route → backend, with shared types and no backend URL in client code.
- [ ] Repeated markup is mapped from constants; shared components reused; nothing duplicated.
- [ ] Tailwind only; responsive from 375px to 1900px; light and dark both implemented and checked.
- [ ] Prettier, `tsc` and ESLint are clean on touched files.
- [ ] Commit message proposed and approved; nothing pushed without a yes.
- [ ] Reply states what changed, what was verified, what was not, and any follow-ups you noticed but did not do.
