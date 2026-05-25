import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/landing/site-header";

export const metadata: Metadata = {
  title: "MedSync - Logiciel de cabinet medical",
  description:
    "MedSync aide les cabinets medicaux a gerer agenda, dossiers patients, ordonnances PDF, paiements et mise en route accompagnee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          <SiteHeader />
          <div aria-hidden="true" className="h-20" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
