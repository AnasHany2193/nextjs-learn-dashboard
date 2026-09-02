import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",

  // Real Arabic slugs, not just an Arabic label on an English URL. The
  // internal key (left side) is what every Link href, redirect() call and
  // breadcrumb in the app already uses -- next-intl resolves it to the
  // right slug per locale, so none of that calling code changes.
  pathnames: {
    "/": "/",
    "/login": { en: "/login", ar: "/تسجيل-الدخول" },

    "/dashboard": { en: "/dashboard", ar: "/لوحة-التحكم" },

    "/dashboard/customers": {
      en: "/dashboard/customers",
      ar: "/لوحة-التحكم/العملاء",
    },
    "/dashboard/customers/create": {
      en: "/dashboard/customers/create",
      ar: "/لوحة-التحكم/العملاء/إنشاء",
    },
    "/dashboard/customers/[id]/edit": {
      en: "/dashboard/customers/[id]/edit",
      ar: "/لوحة-التحكم/العملاء/[id]/تعديل",
    },

    "/dashboard/invoices": {
      en: "/dashboard/invoices",
      ar: "/لوحة-التحكم/الفواتير",
    },
    "/dashboard/invoices/create": {
      en: "/dashboard/invoices/create",
      ar: "/لوحة-التحكم/الفواتير/إنشاء",
    },
    "/dashboard/invoices/[id]/edit": {
      en: "/dashboard/invoices/[id]/edit",
      ar: "/لوحة-التحكم/الفواتير/[id]/تعديل",
    },
  },
});
