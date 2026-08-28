import "@/app/ui/global.css";

import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

const title = "Acme Dashboard";
const description =
  "The official Next.js Course Dashboard, built with App Router.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://nextjs-learn-dashboard-steel.vercel.app"),
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1686,
        height: 882,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
