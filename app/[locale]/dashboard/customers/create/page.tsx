import { getTranslations } from "next-intl/server";

import Form from "@/app/ui/customers/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page() {
  const t = await getTranslations("Customers");

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("title"), href: "/dashboard/customers" },
          {
            label: t("create"),
            href: "/dashboard/customers/create",
            active: true,
          },
        ]}
      />

      <Form />
    </main>
  );
}
