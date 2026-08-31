import { Metadata } from "next";
import { Suspense } from "react";

import { lusitana } from "@/app/ui/fonts";
import { fetchCustomersPages } from "../../lib/data";

import Search from "../../ui/search";
import { CustomersTableSkeleton } from "../../ui/skeletons";

import Pagination from "../../ui/pagination";
import CustomersTable from "@/app/ui/customers/table";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>

      <Search placeholder="Search customers..." />

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
