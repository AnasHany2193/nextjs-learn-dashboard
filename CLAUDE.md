# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this repo is

The Next.js Learn dashboard, finished, then extended with self-directed chapters (16 and up) that go past where the course stops. Each chapter is a branch plus a written record under `docs/`. It is a learning repo: the write-up is part of the deliverable, not an afterthought.

## Commands

**pnpm only.** Never npm or yarn. `.npmrc` sets `ignore-workspace=true` and `pnpm-workspace.yaml` declares a single-package workspace, so npm commands will misbehave.

```bash
pnpm dev                      # Turbopack dev server
pnpm build                    # production build, doubles as the type check
pnpm build --debug-prerender  # adds file:line stacks to prerender failures
pnpm lint                     # eslint-config-next core-web-vitals
npx tsc --noEmit              # types alone, without a full build
```

There is **no test suite**. Verification is `pnpm build` plus exercising the running app.

Two dev-only route handlers exist and are deliberately excluded from the proxy matcher: `GET /seed` creates tables and loads `app/lib/placeholder-data.ts`; `GET /query` is a scratch SQL endpoint. Neither lives under `[locale]`.

Requires `.env.local` with `POSTGRES_URL` (Neon) and `AUTH_SECRET`. See `.env.example`. Demo login is `user@nextmail.com` / `123456`, printed on the login page itself.

## Architecture

### `i18n/routing.ts` is the single source of truth

Locales, prefix strategy, and the `pathnames` map all live in one `defineRouting` call. Arabic gets **real translated slugs**, not an Arabic label on an English URL: `/ar/لوحة-التحكم/الفواتير`, not `/ar/dashboard/invoices`. Anything that needs the locale list (`generateStaticParams`, `auth.config.ts` helpers) derives it from `routing.locales` rather than restating it.

Adding a route means adding it to `pathnames` in both locales. Forgetting to is not a type error, it is a 404 under `/ar` only.

### Typed pathnames change how you write links

`i18n/navigation.ts` re-exports `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` from `createNavigation(routing)`. **Import navigation from `@/i18n/navigation`, never from `next/link` or `next/navigation`.** A plain `next/link` bypasses slug resolution and produces a URL that does not exist in Arabic.

Because `pathnames` is typed, `href` no longer accepts an interpolated string. Three forms are in use:

```tsx
href="/dashboard/customers"                                        // static
href={{ pathname: "/dashboard/customers/[id]/edit", params: { id } }} // dynamic
href={{ pathname, query }}                                          // with search params
```

`app/ui/breadcrumbs.tsx` types its prop as `React.ComponentProps<typeof Link>["href"]` rather than `string`, for the same reason.

### `proxy.ts` is the only real auth boundary

Next 16 renamed `middleware.ts` to `proxy.ts`. next-intl has no matching entrypoint, so `createMiddleware` is still imported from `next-intl/middleware` inside a file called `proxy.ts`. That is correct, not a leftover.

Two traps here, both of which produced live auth bypasses and both of which passed `tsc` and `pnpm build`:

1. **`authorized()` in `auth.config.ts` is not enforced.** Its return value is only honored by the bare `export default auth` form. Composing `auth((req) => ...)` with another middleware silently drops it. Enforcement lives in `proxy.ts`, which checks `req.auth` directly. The callback is kept only because `NextAuthConfig` requires the shape, and it carries a comment saying so.
2. **`req.nextUrl.pathname` arrives percent-encoded.** `routing.pathnames` holds literal Unicode, so comparing the two silently never matches. `stripLocale()` and `localeOf()` in `auth.config.ts` call `decodeURIComponent` once so every caller gets a real string. Do not compare a raw pathname against a pathname map entry.

`localizedPath()` resolves `/dashboard` and `/login` per locale, because those English paths do not exist under `/ar`.

### Data and mutations

`app/lib/data.ts` is the only place that reads from Postgres, `app/lib/actions.ts` the only place that writes. Actions use `useActionState`, so every `prevState` is typed `State | undefined` and read with optional chaining. `revalidatePath("/[locale]/...", "page")` uses the literal segment so both locales are invalidated at once.

`deleteCustomer` counts invoices and refuses rather than orphaning rows, because the schema has no foreign key to do it.

### Styling and RTL

Tailwind 3.4 with **logical properties only**: `ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-`, `text-start`, `rounded-s-`/`rounded-e-`. There are zero physical-direction utilities left in the tree; do not reintroduce one. The `rtl:` variant exists for the handful of cases logical properties cannot express (`space-x-reverse`, icon flips) and is used five times total.

`messages/en.json` and `messages/ar.json` must stay at exact key parity. Arabic plurals need all six ICU categories (zero, one, two, few, many, other), not just one/other.

## Conventions

**Verify against the running system, not by reading code.** Both auth bypasses above looked correct on review and passed every static check. They were found by making a real request and being surprised. After touching `proxy.ts`, `auth.config.ts`, or the root layout, load the app logged out and confirm the redirect.

**Check the installed version, not memory.** Read `node_modules/next/dist/docs/` for framework questions and the actual package source for library behavior. `package.json` carets do not tell you what is installed.

**Branch per chapter**, named to match its `docs/` folder one-to-one: `chapter-17-i18n-rtl` pairs with `docs/chapter-17-i18n-rtl/`. `course-complete` is the frozen pre-chapter baseline.

**`docs/` is a GitHub Pages site**, not internal notes. Each chapter is a self-contained `index.html` sharing one stylesheet, with OG tags, canonical, and JSON-LD. Adding a chapter means updating `docs/index.html` (card plus the `blogPost` array) and `docs/sitemap.xml`.

**Never use an em dash (—) or en dash (–)** anywhere: code, comments, commit messages, docs, chat. A plain hyphen in compound words and flags is fine.

**Do not run `git commit`.** Hand over a ready-to-use conventional-commit message instead, one per logical change, matching the existing log style (`type(scope): lowercase imperative`).
