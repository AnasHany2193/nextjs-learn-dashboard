import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { cacheLife } from "next/cache";
import { routing } from "./routing";

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

export default getRequestConfig(async () => {
  const requested = await rootLocale();
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
    now: await getBuildTime(),
  };
});
