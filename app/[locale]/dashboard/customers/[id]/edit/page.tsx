import { getTranslations } from "next-intl/server";

import Form from "@/app/ui/customers/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCustomerById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

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
            href: { pathname: "/dashboard/customers/[id]/edit", params: { id } },
            active: true,
          },
        ]}
      />
      <Form customer={customer} />
    </main>
  );
}
