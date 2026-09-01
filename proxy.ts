import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isProtectedPath =
    request.nextUrl.pathname.startsWith("/my-learning") ||
    request.nextUrl.pathname.startsWith("/profile");

  if (isProtectedPath && !sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackURL", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const proxy = middleware;

export const config = {
  matcher: ["/my-learning/:path*", "/profile/:path*"],
};
