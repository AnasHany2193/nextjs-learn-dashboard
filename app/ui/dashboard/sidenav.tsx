import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import NavLinks from "@/app/ui/dashboard/nav-links";
import AcmeLogo from "@/app/ui/acme-logo";
import LocaleSwitcher from "@/app/ui/locale-switcher";
import {
  NavLinksSkeleton,
  LocaleSwitcherSkeleton,
} from "@/app/ui/skeletons";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "../../../auth";

export default async function SideNav() {
  const t = await getTranslations("Nav");
  const locale = await getLocale();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between gap-2 md:flex-col">
        <Suspense fallback={<NavLinksSkeleton />}>
          <NavLinks />
        </Suspense>

        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className="md:w-full">
          <Suspense fallback={<LocaleSwitcherSkeleton />}>
            <LocaleSwitcher />
          </Suspense>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: `/${locale}` });
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">{t("signOut")}</div>
          </button>
        </form>
      </div>
    </div>
  );
}
