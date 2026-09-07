import { getTranslations } from "next-intl/server";

import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EditInvoiceSkeleton } from "@/app/ui/skeletons";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<EditInvoiceSkeleton />}>
      <EditInvoice params={props.params} />
    </Suspense>
  );
}

async function EditInvoice({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // awaited inside the boundary

  const [invoice, customers, t] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
    getTranslations("Invoices"),
  ]);

  if (!invoice) notFound();

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
