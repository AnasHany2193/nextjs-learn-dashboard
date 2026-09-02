import { getTranslations } from "next-intl/server";

import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

export default async function Page() {
  const [customers, t] = await Promise.all([
    fetchCustomers(),
    getTranslations("Invoices"),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("title"), href: "/dashboard/invoices" },
          {
            label: t("create"),
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
