import { IBM_Plex_Sans_Arabic, Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  weight: ["400", "500", "600"],
  subsets: ["arabic"],
});

// used by app/[locale]/layout.tsx
export const bodyFont = (locale: string) =>
  locale === "ar" ? plexArabic : inter;
