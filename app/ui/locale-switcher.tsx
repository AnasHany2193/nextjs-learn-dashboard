"use client";

import { useLocale } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // locale-free
  const params = useParams(); // keeps [id] segments
  const searchParams = useSearchParams();

  function switchTo(nextLocale: string) {
    const query = Object.fromEntries(searchParams.entries());
    router.replace(
      // @ts-expect-error -- params is a generic Record here, but pathname
      // is one of next-intl's known routes; this mirrors next-intl's own
      // typed-routing example for a locale switcher.
      { pathname, params, query },
      { locale: nextLocale },
    );
  }

  return (
    <div className="flex gap-1 text-sm h-full">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale}
          className={
            l === locale
              ? "rounded-md bg-sky-100 px-2 py-1 font-medium text-blue-600 flex-1"
              : "rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100 flex-1"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
