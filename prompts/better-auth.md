# Implementation prompt: Better Auth Integration

## Goal

Integrate **Better Auth** as the authentication layer for Vertex using PostgreSQL (Neon database via `DB_URI`), Next.js App Router (Next.js 16), server-only auth configuration, client authentication helper with React hooks, authentication API route handler, proxy/middleware protection, auth UI pages (Sign In & Sign Up), and auth state integration into the site header.

## Skills and docs read

- `AGENTS.md` — §5 structure (Auth is Better-Auth, wired through Next.js middleware, secret key on server, publishable key to browser), §7 decisions (Better-Auth, keep browsing public, gate protected features, user id keys learner state), §12 (secret key server-only, private routes in middleware), §13 checks.
- `.agents/skills/better-auth-best-practices/SKILL.md` — Setup workflow, environment variables (`BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`), database configuration with PostgreSQL `pg.Pool`, core options, session management, Next.js handler.
- `.agents/skills/better-auth-security-best-practices/SKILL.md` — Secret management, rate limiting, CSRF protection, trusted origins, session security, cookie security.
- `.agents/skills/create-auth/SKILL.md` — Next.js App Router handler `app/api/auth/[...all]/route.ts`, client `lib/auth-client.ts`, server `lib/auth.ts`, schema migration.
- `.agents/skills/email-and-password-best-practices/SKILL.md` — Email & password setup, validation, callback URLs.
- `https://better-auth.com/docs/integrations/next` — Next.js 16 Proxy/middleware support, `toNextJsHandler`, `nextCookies` plugin.

## Code inspected

- `package.json` — Next.js `16.3.4`, React `19.2.8`, Tailwind CSS v4, Lucide icons.
- `.env` — Contains `DB_URI` pointing to Neon PostgreSQL.
- `app/layout.tsx` — Root layout with Playfair and Inter font definitions.
- `components/layout/site-header.tsx` — Site header with navigation links, notifications bell, and avatar profile link.
- `lib/utils.ts` — `cn` classnames utility.

## Decisions and assumptions

1. **Database Adapter**: Use PostgreSQL with `pg` / `Pool` connecting via `DB_URI` (or `DATABASE_URL`). Better Auth built-in Kysely PostgreSQL adapter will manage standard tables (`user`, `session`, `account`, `verification`).
2. **Auth Methods**: Email & Password authentication (`emailAndPassword: { enabled: true }`).
3. **Server Configuration (`lib/auth.ts`)**:
   - `betterAuth` instance with PostgreSQL database connection (`pg.Pool`).
   - `nextCookies()` plugin for seamless cookie handling in Next.js Server Actions / Route Handlers.
   - Secret configured via `BETTER_AUTH_SECRET` (fallback generated in dev if not set).
   - Base URL configured via `BETTER_AUTH_URL` or default `http://localhost:3000`.
4. **Client Configuration (`lib/auth-client.ts`)**:
   - `createAuthClient` from `better-auth/react`.
   - Export helper hooks and methods: `signIn`, `signUp`, `signOut`, `useSession`, `getSession`.
5. **Route Handler (`app/api/auth/[...all]/route.ts`)**:
   - Exposes `GET` and `POST` handlers created via `toNextJsHandler(auth)`.
6. **Middleware / Proxy (`proxy.ts`)**:
   - Protects `/my-learning`, `/profile`, and protected API routes by verifying authentication status.
   - Redirects unauthenticated users to `/sign-in` with a `callbackURL` redirect parameter.
7. **Auth UI (`app/sign-in/page.tsx` & `app/sign-up/page.tsx`)**:
   - Designed cleanly following Vertex's warm aesthetic (Playfair headings, neutral palette, primary accent, accessible forms).
   - Supports toggle between Sign In and Sign Up.
   - Full error feedback and loading states.
8. **Site Header Integration (`components/layout/site-header.tsx`)**:
   - Connects to client auth state via `useSession()`.
   - Displays user initials and dropdown / sign out action when logged in.
   - Displays "Sign In" CTA button when unauthenticated.
9. **Environment Configuration**:
   - Add `.env.example` documenting `DB_URI`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.
   - Update `.env` with `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`.

## Files to touch

- [NEW] `lib/auth.ts` — Server auth instance with Better Auth & Postgres Pool.
- [NEW] `lib/auth-client.ts` — Client auth hooks and actions.
- [NEW] `app/api/auth/[...all]/route.ts` — Next.js App Router API route handler.
- [NEW] `proxy.ts` — Route gating and authentication verification for protected paths.
- [NEW] `app/sign-in/page.tsx` — Sign-in UI page.
- [NEW] `app/sign-up/page.tsx` — Sign-up UI page.
- [NEW] `.env.example` — Canonical environment variable list.
- [MODIFY] `.env` — Add `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`.
- [MODIFY] `components/layout/site-header.tsx` — Dynamic authentication state & sign-in / user profile controls.
- [MODIFY] `package.json` — Add `better-auth` and `pg`, `@types/pg`.

## Requirements

1. Install `better-auth`, `pg`, `@types/pg`.
2. Generate schema and run migrations against Neon Postgres (`npx auth@latest migrate`).
3. Set up server-side auth in `lib/auth.ts` with secure secrets and cookies.
4. Set up client-side auth in `lib/auth-client.ts`.
5. Expose `/api/auth/[...all]` route handler.
6. Gate protected routes via Next.js 16 `proxy.ts`.
7. Build responsive, accessible Sign In and Sign Up pages styled with Vertex tokens.
8. Update `SiteHeader` with real session state.

## Security considerations

- **Secret Key**: `BETTER_AUTH_SECRET` is kept server-only and never exposed to the client.
- **CSRF & Cookies**: Keep CSRF validation active; secure cookies enabled in production.
- **Rate Limiting**: Enable Better Auth rate limiting for auth endpoints.
- **Route Protection**: Private routes validated server-side in proxy / server components.

## Acceptance criteria

- `GET /api/auth/ok` returns `{ "status": "ok" }`.
- Users can register a new account on `/sign-up`.
- Users can sign in with valid credentials on `/sign-in`.
- Users are redirected back to the intended page after signing in.
- Authenticated state renders avatar and user initials in `SiteHeader`.
- Unauthenticated state renders "Sign In" in `SiteHeader`.
- Users can sign out successfully.
- Protected routes (e.g. `/my-learning`) redirect to `/sign-in` when unauthenticated.
- `npm run build` and `npm run lint` pass with no errors.

## Checks to run

- `npm run lint` — ESLint validation.
- `npx tsc --noEmit` — TypeScript compilation check.
- `npm run build` — Next.js production build verification.
- `GET /api/auth/ok` verification.

## Manual test steps

1. Navigate to `http://localhost:3000` — observe "Sign In" button in header when logged out.
2. Click "Sign In" or navigate to `http://localhost:3000/sign-in` — see the sign-in form.
3. Click "Create an account" to switch to `http://localhost:3000/sign-up`.
4. Enter Name, Email, and Password, then submit — user is registered, session is established, and redirected to home/dashboard.
5. In the header, confirm the user's avatar/initials are displayed.
6. Navigate to `http://localhost:3000/my-learning` — confirm access is allowed.
7. Click profile/avatar and select Sign Out — confirm session ends and header reverts to "Sign In".
8. Try navigating to `http://localhost:3000/my-learning` while logged out — confirm redirection to `/sign-in?callbackURL=/my-learning`.
