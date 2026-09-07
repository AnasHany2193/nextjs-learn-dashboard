import { getTranslations } from "next-intl/server";

import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import { Suspense } from "react";
import { CreateInvoiceSkeleton } from "@/app/ui/skeletons";

export default async function Page() {
  const t = await getTranslations("Invoices");

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

      <Suspense fallback={<CreateInvoiceSkeleton />}>
        <CreateInvoiceForm />
      </Suspense>
    </main>
  );
}

async function CreateInvoiceForm() {
  const customers = await fetchCustomers();
  return <Form customers={customers} />;
}
