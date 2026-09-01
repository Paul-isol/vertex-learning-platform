# Implementation prompt: Google OAuth Integration

## Goal

Add Google OAuth provider to Vertex authentication using Better Auth, allowing learners to sign in or sign up seamlessly with their Google accounts on `/sign-in` and `/sign-up`.

## Skills and docs read

- `AGENTS.md` — §5 structure, §7 decisions (Better-Auth, keep browsing public, gate protected features, user id keys learner state), §12 (secret key server-only), §13 checks.
- `.agents/skills/better-auth-best-practices/SKILL.md` — `socialProviders: { google: { clientId, clientSecret } }`.
- `.agents/skills/create-auth/SKILL.md` — Social OAuth integration, `signIn.social({ provider: "google", callbackURL })`.
- `.agents/skills/better-auth-security-best-practices/SKILL.md` — OAuth state parameter storage, PKCE protection, token handling.
- `https://better-auth.com/docs/authentication/google` — Google OAuth credentials, redirect URIs (`http://localhost:3000/api/auth/callback/google`), client `signIn.social`.

## Code inspected

- `lib/auth.ts` — Server auth configuration with Better Auth, PostgreSQL Pool, and `nextCookies`.
- `lib/auth-client.ts` — Client auth client exposing `signIn`.
- `app/sign-in/page.tsx` & `app/sign-up/page.tsx` — Current sign-in and sign-up pages.
- `.env` & `.env.example` — Environment variables configuration.

## Decisions and assumptions

1. **Provider Configuration (`lib/auth.ts`)**:
   - Add `socialProviders` with `google` using `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
   - Ensure the server runs smoothly in development even if credentials have placeholder values or are added later.
2. **Client Authentication Flow**:
   - Use `signIn.social({ provider: "google", callbackURL })` from `@/lib/auth-client`.
   - Respect the `callbackURL` query parameter so users return to their intended destination (e.g. `/my-learning` or course lesson) after OAuth redirect.
3. **UI Integration**:
   - Add a "Continue with Google" button on both `app/sign-in/page.tsx` and `app/sign-up/page.tsx`.
   - Follow the Vertex design aesthetic with clear visual hierarchy: Google SVG icon, clean bordered card button, and an "or continue with email" divider.
4. **Environment Variables**:
   - Document `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.example`.
   - Add placeholder keys in `.env` for easy configuration.

## Files to touch

- [MODIFY] `lib/auth.ts` — Add `socialProviders.google` configuration.
- [MODIFY] `app/sign-in/page.tsx` — Add Google sign-in button and OAuth handler.
- [MODIFY] `app/sign-up/page.tsx` — Add Google sign-up button and OAuth handler.
- [MODIFY] `.env.example` — Document `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- [MODIFY] `.env` — Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` variables.

## Requirements

1. Configure `socialProviders.google` in `lib/auth.ts`.
2. Add Google OAuth trigger on `/sign-in` and `/sign-up`.
3. Support redirect preservation via `callbackURL`.
4. Update `.env` and `.env.example`.

## Security considerations

- OAuth Client Secret stays strictly on the server (`lib/auth.ts`) and is never exposed to the client.
- Better Auth automatically applies PKCE and secure state cookies to prevent CSRF during OAuth handshakes.
- Validated redirect URLs prevent open redirects.

## Acceptance criteria

- `socialProviders.google` is configured in `lib/auth.ts`.
- Sign In and Sign Up pages render "Continue with Google" button with Google icon.
- Clicking "Continue with Google" triggers `signIn.social({ provider: "google", callbackURL })`.
- Types check, lint check, and production build pass with 0 errors.

## Checks to run

- `npx tsc --noEmit` — TypeScript compilation check.
- `npm run lint` — ESLint validation.
- `npm run build` — Next.js production build verification.

## Manual test steps

1. Navigate to `http://localhost:3000/sign-in` — observe "Continue with Google" button and "Or continue with email" divider.
2. Navigate to `http://localhost:3000/sign-up` — observe "Continue with Google" button.
3. When `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are configured in Google Cloud Console with redirect URI `http://localhost:3000/api/auth/callback/google`, clicking the button redirects to Google's consent screen and logs the user in upon completion.
