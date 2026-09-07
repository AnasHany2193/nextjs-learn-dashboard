import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { fetchInvoicesPages } from "@/app/lib/data";

import Search from "@/app/ui/search";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton, SearchSkeleton } from "@/app/ui/skeletons";

import Table from "@/app/ui/invoices/table";
import Pagination from "@/app/ui/pagination";
import { CreateInvoice } from "@/app/ui/invoices/buttons";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Invoices");
  return { title: t("title") };
}

export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const t = await getTranslations("Invoices");

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{t("title")}</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Suspense fallback={<SearchSkeleton />}>
          <Search placeholder={t("search")} />
        </Suspense>
        <CreateInvoice />
      </div>

      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesResults searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function InvoicesResults({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const params = await searchParams; // awaited inside the boundary
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
