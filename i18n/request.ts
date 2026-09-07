import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { cacheLife } from "next/cache";
import { routing } from "./routing";

/**
 * Root params are how this app stays prerenderable: they are known at
 * build time, so reading the locale costs nothing.
 *
 * They are not available in a Server Action, and that is permanent. An
 * action is not tied to a route, so there is no single correct value to
 * hand back and Next throws rather than guess.
 *
 * Fall back to the locale header next-intl's proxy sets on every matched
 * request. It costs a headers() call, but only in the action phase, which
 * is dynamic already. Rendering never reaches this branch, so the
 * prerender work from step 02 stays intact.
 */
async function resolveLocale(fromHeader: Promise<string | undefined>) {
  try {
    return await rootLocale();
  } catch {
    return await fromHeader;
  }
}

async function loadMessages(locale: string) {
  "use cache";
  cacheLife("max");

  return (await import(`../messages/${locale}.json`)).default;
}

async function getBuildTime() {
  "use cache";
  cacheLife("max");

  return new Date();
}

export default getRequestConfig(async ({ locale: override, requestLocale }) => {
  const requested = override ?? (await resolveLocale(requestLocale));
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
    now: await getBuildTime(),
  };
});
