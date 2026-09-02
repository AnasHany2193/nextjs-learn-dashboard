import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import { authConfig, localeOf, localizedPath, stripLocale } from "./auth.config";

const handleLocale = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

// auth.config.ts's `authorized()` callback is NOT auto-enforced once
// auth() is composed with another middleware (below). Its return value
// is only honored by the bare `export default auth` form. So the
// dashboard check is applied explicitly here, on req.auth, before
// handing off to next-intl's locale handler.
export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const locale = localeOf(req.nextUrl.pathname);
  const path = stripLocale(req.nextUrl.pathname);
  const dashboardPath = localizedPath("/dashboard", locale);
  const loginPath = localizedPath("/login", locale);
  const isOnDashboard = path.startsWith(dashboardPath);

  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/${locale}${loginPath}`, req.nextUrl));
  }

  if (path === loginPath && isLoggedIn) {
    return NextResponse.redirect(
      new URL(`/${locale}${dashboardPath}`, req.nextUrl),
    );
  }

  return handleLocale(req);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|query|seed|.*\\..*).*)"],
};
