import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { lusitana } from "@/app/ui/fonts";
import { fetchCustomersPages } from "@/app/lib/data";

import Search from "@/app/ui/search";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";

import Pagination from "@/app/ui/pagination";
import CustomersTable from "@/app/ui/customers/table";
import { CreateCustomer } from "@/app/ui/customers/buttons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Customers");
  return { title: t("title") };
}

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const t = await getTranslations("Customers");
  const searchParams = await props.searchParams;

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        {t("title")}
      </h1>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={t("search")} />
        <CreateCustomer />
      </div>

      {/* key remounts the boundary so the skeleton shows on every new query */}
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
