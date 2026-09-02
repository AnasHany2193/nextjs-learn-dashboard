"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useActionState } from "react";

import { deleteInvoice, InvoiceState } from "../../lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export function CreateInvoice() {
  const t = useTranslations("Invoices");

  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{t("create")}</span>{" "}
      <PlusIcon className="h-5 md:ms-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  const t = useTranslations("Invoices");

  return (
    <Link
      href={{ pathname: "/dashboard/invoices/[id]/edit", params: { id } }}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">{t("editSr")}</span>
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const t = useTranslations("Invoices");
  const initialState: InvoiceState = { message: null, errors: {} };
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const [state, formAction] = useActionState(deleteInvoiceWithId, initialState);

  return (
    <form action={formAction}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">{t("deleteSr")}</span>
        <TrashIcon className="w-5" />
      </button>
      <div aria-live="polite" aria-atomic="true">
        {state.message && (
          <p className="mt-2 whitespace-normal text-sm text-red-500">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
