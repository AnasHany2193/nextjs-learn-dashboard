import { getTranslations } from "next-intl/server";

import Form from "@/app/ui/customers/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCustomerById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EditCustomerSkeleton } from "@/app/ui/skeletons";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<EditCustomerSkeleton />}>
      <EditCustomer params={props.params} />
    </Suspense>
  );
}

async function EditCustomer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [customer, t] = await Promise.all([
    fetchCustomerById(id),
    getTranslations("Customers"),
  ]);

  if (!customer) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("title"), href: "/dashboard/customers" },
          {
            label: t("edit"),
            href: {
              pathname: "/dashboard/customers/[id]/edit",
              params: { id },
            },
            active: true,
          },
        ]}
      />
      <Form customer={customer} />
    </main>
  );
}
