import "@/app/ui/global.css";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { hasLocale, NextIntlClientProvider } from "next-intl";

import { getMessages, getTimeZone, getTranslations } from "next-intl/server";

import { bodyFont } from "@/app/ui/fonts";
import { routing } from "@/i18n/routing";

// Cache Components requires at least one value for every root param so
// it can prerender a shell and check the shell is non-empty. Returning
// [] now errors instead of deferring every path to the first visit.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: { template: `%s | ${t("title")}`, default: t("title") },
    description: t("description"),
    metadataBase: new URL("https://nextjs-learn-dashboard-steel.vercel.app"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: ["/opengraph-image.png"],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", "x-default": "/en" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr";

  // Temporary. Whichever await blocks will now point here, and
  // --debug-prerender will name the line instead of the provider.
  //
  // `now` is deliberately not hoisted here: getNow() would resolve to a
  // live new Date(), which is synchronous IO the prerender rejects with no
  // escape hatch. i18n/request.ts caches a build-time `now` in the request
  // config instead, so the provider's own internal await resolves from
  // that cache rather than a fresh clock read.
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  return (
    <html lang={locale} dir={dir}>
      <body className={`${bodyFont(locale).className} antialiased`}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone={timeZone}
          // getFormats() isn't a public next-intl/server export (only
          // getFormatter, the runtime formatter, is). i18n/request.ts
          // returns no custom `formats` key, so an empty object skips
          // the provider's internal await and is behaviorally identical.
          formats={{}}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
