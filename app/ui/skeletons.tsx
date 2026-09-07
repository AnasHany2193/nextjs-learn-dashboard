import { useTranslations } from "next-intl";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ms-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ms-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="me-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ms-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 ps-6 pe-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 ps-6 pe-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="me-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  const t = useTranslations("Invoices");

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-start text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:ps-6">
                  {t("tableCustomer")}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t("tableEmail")}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t("tableAmount")}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t("tableDate")}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t("tableStatus")}
                </th>
                <th
                  scope="col"
                  className="relative pb-4 ps-3 pe-6 pt-2 sm:pe-6"
                >
                  <span className="sr-only">{t("editSr")}</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function CustomersRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 ps-6 pe-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100" />
          <div className="h-6 w-24 rounded bg-gray-100" />
        </div>
      </td>

      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100" />
      </td>

      {/* Invoices */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100" />
      </td>

      {/* Pending */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100" />
      </td>

      {/* Paid */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100" />
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap py-3 ps-6 pe-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100" />
          <div className="h-[38px] w-[38px] rounded bg-gray-100" />
        </div>
      </td>
    </tr>
  );
}

export function CustomersMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="me-2 h-8 w-8 rounded-full bg-gray-100" />
          <div className="h-6 w-16 rounded bg-gray-100" />
        </div>

        <div className="h-6 w-16 rounded bg-gray-100" />
      </div>

      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100" />
          <div className="mt-2 h-6 w-24 rounded bg-gray-100" />
        </div>

        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100" />
          <div className="h-10 w-10 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

// Mirrors NavLinks' three link buttons: `grow` so they share the mobile
// top bar evenly; `md:flex-none` matches the real Link's own class, but
// width still comes from the parent's default `align-items: stretch` in
// its md:flex-col layout, same as the real links, so no fixed width here.
export function NavLinksSkeleton() {
  return (
    <>
      <div className="h-[48px] grow rounded-md bg-gray-100 md:flex-none" />
      <div className="h-[48px] grow rounded-md bg-gray-100 md:flex-none" />
      <div className="h-[48px] grow rounded-md bg-gray-100 md:flex-none" />
    </>
  );
}

// Mirrors LocaleSwitcher's own root: one h-7 pill per locale, sized to the
// real buttons' text-sm + py-1, sharing the row with flex-1 the same way.
export function LocaleSwitcherSkeleton() {
  return (
    <div className="flex h-full min-w-[78px] gap-1 text-sm">
      <div className="h-7 flex-1 rounded-md bg-gray-100" />
      <div className="h-7 flex-1 rounded-md bg-gray-100" />
    </div>
  );
}

// Shared by both invoice forms: CreateInvoiceForm and EditInvoiceForm render
// the identical three fields, differing only in the values filled into them,
// which a skeleton never shows anyway. One shape, two names, so a field
// added to either form only has to be added to the skeleton once.
function InvoiceFormSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden`}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <div className="mb-2 h-4 w-32 rounded-md bg-gray-100" />
          <div className="h-10 w-full rounded-md bg-gray-100" />
        </div>
        {/* Invoice Amount */}
        <div className="mb-4">
          <div className="mb-2 h-4 w-24 rounded-md bg-gray-100" />
          <div className="h-10 w-full rounded-md bg-gray-100" />
        </div>
        {/* Invoice Status */}
        <div className="mb-2 h-4 w-20 rounded-md bg-gray-100" />
        <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
          <div className="flex gap-4">
            <div className="h-8 w-24 rounded-full bg-gray-100" />
            <div className="h-8 w-20 rounded-full bg-gray-100" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <div className="h-10 w-24 rounded-lg bg-gray-100" />
        <div className="h-10 w-28 rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}

export function EditInvoiceSkeleton() {
  return <InvoiceFormSkeleton />;
}

export function CreateInvoiceSkeleton() {
  return <InvoiceFormSkeleton />;
}

// Shared by both customer forms, for the same reason. Name and email are
// each a label bar plus an input-height box; AvatarPicker's closed trigger
// is that same full-width, input-height shape too (a 24px circle, a label
// and a chevron inside one bordered bar), so it reuses the block rather
// than needing its own size.
function CustomerFormSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden`}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <div className="mb-2 h-4 w-24 rounded-md bg-gray-100" />
          <div className="h-10 w-full rounded-md bg-gray-100" />
        </div>
        {/* Customer Email */}
        <div className="mb-4">
          <div className="mb-2 h-4 w-24 rounded-md bg-gray-100" />
          <div className="h-10 w-full rounded-md bg-gray-100" />
        </div>
        {/* Customer Avatar */}
        <div className="mb-4">
          <div className="mb-2 h-4 w-20 rounded-md bg-gray-100" />
          <div className="h-10 w-full rounded-md bg-gray-100" />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <div className="h-10 w-24 rounded-lg bg-gray-100" />
        <div className="h-10 w-24 rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}

export function EditCustomerSkeleton() {
  return <CustomerFormSkeleton />;
}

export function CreateCustomerSkeleton() {
  return <CustomerFormSkeleton />;
}

export function CustomersTableSkeleton() {
  const t = useTranslations("Customers");

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile */}
          <div className="md:hidden">
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
            <CustomersMobileSkeleton />
          </div>

          {/* Desktop */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-start text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:ps-6">
                  {t("tableName")}
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  {t("tableEmail")}
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  {t("tableInvoices")}
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  {t("tablePending")}
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  {t("tablePaid")}
                </th>

                <th scope="col" className="relative py-3 ps-6 pe-3">
                  <span className="sr-only">{t("editSr")}</span>
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              <CustomersRowSkeleton />
              <CustomersRowSkeleton />
              <CustomersRowSkeleton />
              <CustomersRowSkeleton />
              <CustomersRowSkeleton />
              <CustomersRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
