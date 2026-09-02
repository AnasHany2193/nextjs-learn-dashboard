"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useActionState } from "react";

import { updateCustomer, CustomerState } from "../../lib/actions";
import { Button } from "@/app/ui/button";
import AvatarPicker from "./avatar-picker";
import { Customer } from "../../lib/definitions";

export default function EditCustomerForm({ customer }: { customer: Customer }) {
  const t = useTranslations("Customers");
  const initialState: CustomerState = { message: null, errors: {} };

  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  const [state, formAction] = useActionState(
    updateCustomerWithId,
    initialState,
  );

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {t("nameLabel")}
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={customer.name}
              placeholder={t("namePlaceholder")}
              className="peer block w-full rounded-md border border-gray-200 py-2 ps-4 text-sm outline-2 placeholder:text-gray-500"
              required
              aria-describedby="name-error"
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.name &&
              state?.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            {t("emailLabel")}
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={customer.email}
              placeholder={t("emailPlaceholder")}
              className="peer block w-full rounded-md border border-gray-200 py-2 ps-4 text-sm outline-2 placeholder:text-gray-500"
              required
              aria-describedby="email-error"
            />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.email &&
              state?.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Customer Avatar */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium">
            {t("pictureLabel")}
          </label>
          <AvatarPicker
            defaultValue={customer.image_url}
            name="imageUrl"
            error={state?.errors?.imageUrl}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          {t("cancel")}
        </Link>
        <Button type="submit">{t("edit")}</Button>
      </div>
    </form>
  );
}
