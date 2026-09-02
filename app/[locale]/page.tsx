import NextLink from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { Link } from "@/i18n/navigation";
import { lusitana } from "@/app/ui/fonts";
import AcmeLogo from "@/app/ui/acme-logo";
import LocaleSwitcher from "@/app/ui/locale-switcher";
import styles from "@/app/ui/home.module.css";

export default async function Page() {
  const t = await getTranslations("Home");

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mb-2 flex justify-end">
        <LocaleSwitcher />
      </div>
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className={styles.shape} />

          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>{t("welcome")}</strong> {t("intro")}{" "}
            {/* External link -- no locale to carry, plain next/link is correct */}
            <NextLink
              href="https://nextjs.org/learn/"
              className="text-blue-500"
            >
              {t("courseLink")}
            </NextLink>
            {t("broughtToYou")}
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>{t("login")}</span>{" "}
            <ArrowRightIcon className="w-5 md:w-6 rtl:rotate-180" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            loading="eager"
            className="hidden md:block"
            alt={t("heroDesktopAlt")}
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            loading="eager"
            className="block md:hidden"
            alt={t("heroMobileAlt")}
          />
        </div>
      </div>
    </main>
  );
}
