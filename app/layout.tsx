import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Footer, Navbar } from "@/src/components/layouts";
import { CarContextProvider } from "@/src/hooks/CarContext";
import CleanupLocalStorage from "@/src/components/localStorage/CleanupLocalStorage";
import SeoCarManufactures from "@/src/components/layouts/footer/SeoCarManufactures";
import HomeRevews from "@/src/components/trustmary/HomeRevews";

export const metadata: Metadata = {
  title: "MKB-Automobile",
  description: "Tout vos vehicule au meilleure prix",
  other: {
    "referrer": "no-referrer-when-downgrade",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="relative">
        <HomeRevews />
        <Navbar />
        <CleanupLocalStorage />
        <CarContextProvider>{children}</CarContextProvider>
        <SeoCarManufactures />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
