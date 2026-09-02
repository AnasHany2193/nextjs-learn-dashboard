import type { NextAuthConfig } from "next-auth";
import { routing } from "./i18n/routing";

// req.nextUrl.pathname arrives percent-encoded at the middleware level
// ("/ar/%D9%84%D9%88..."), never auto-decoded the way a browser address
// bar shows it. routing.pathnames holds literal Arabic Unicode, so
// comparing against the raw pathname silently never matches -- decode
// once, here, so every caller gets a real Unicode string.
// "/ar/لوحة-التحكم/العملاء" => "/لوحة-التحكم/العملاء"
function stripLocale(pathname: string) {
  const decoded = decodeURIComponent(pathname);
  const segments = decoded.split("/");
  const maybeLocale = segments[1] as (typeof routing.locales)[number];

  if (routing.locales.includes(maybeLocale))
    return "/" + segments.slice(2).join("/");

  return decoded;
}

function localeOf(pathname: string) {
  const maybeLocale = decodeURIComponent(pathname).split(
    "/",
  )[1] as (typeof routing.locales)[number];

  return routing.locales.includes(maybeLocale)
    ? maybeLocale
    : routing.defaultLocale;
}

// Localized slugs mean "/dashboard" only exists under /en -- Arabic's real
// URL is "/لوحة-التحكم". Resolve the right one per locale instead of
// hardcoding the English word, or every redirect here 404s under /ar.
function localizedPath(key: "/dashboard" | "/login", locale: string) {
  const entry = routing.pathnames[key];
  return typeof entry === "string"
    ? entry
    : entry[locale as keyof typeof entry];
}

export { stripLocale, localeOf, localizedPath };

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // NOTE: this callback's return value is NOT auto-enforced. It only
    // gates automatically for the bare `export default auth` form. Once
    // auth() is composed with another middleware (proxy.ts wraps this
    // with next-intl's handler), nothing calls this, and its verdict is
    // silently ignored -- every dashboard route was reachable logged out.
    // The actual enforcement now lives in proxy.ts, which checks
    // req.auth directly. This callback is kept only because
    // NextAuthConfig expects the shape; it is not on the request path.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const locale = localeOf(nextUrl.pathname);
      const path = stripLocale(nextUrl.pathname);
      const isOnDashboard = path.startsWith(localizedPath("/dashboard", locale));

      if (isOnDashboard) return isLoggedIn;
      if (isLoggedIn) {
        return Response.redirect(
          new URL(`/${locale}${localizedPath("/dashboard", locale)}`, nextUrl),
        );
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
