import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import AcmeLogo from "@/app/ui/acme-logo";
import LoginForm from "@/app/ui/login-form";
import LocaleSwitcher from "@/app/ui/locale-switcher";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Login");

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex justify-end">
          <Suspense>
            <LocaleSwitcher />
          </Suspense>
        </div>
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>

        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-900">
          <p className="font-medium">{t("demoAccount")}</p>
          <p className="mt-1">user@nextmail.com &middot; 123456</p>
        </div>
      </div>
    </main>
  );
}
