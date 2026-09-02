import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { cacheLife } from "next/cache";

async function loadMessages(locale: string) {
  "use cache";
  cacheLife("max");

  return (await import(`../messages/${locale}.json`)).default;
}

// next-intl only needs `now` for format.relativeTime, which this app never
// calls. A live new Date() is synchronous IO the prerender rejects outright
// (no Suspense or instant = false escape hatch), so cache a fixed build-time
// value instead -- getConfigNow() then resolves it from cached config rather
// than the root layout computing a live one on every render.
async function getBuildTime() {
  "use cache";
  cacheLife("max");

  return new Date();
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
    now: await getBuildTime(),
  };
});
