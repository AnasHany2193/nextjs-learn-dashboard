import { getTranslations } from "next-intl/server";

import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [invoice, customers, t] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
    getTranslations("Invoices"),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("title"), href: "/dashboard/invoices" },
          {
            label: t("edit"),
            href: { pathname: "/dashboard/invoices/[id]/edit", params: { id } },
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
