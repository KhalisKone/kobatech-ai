import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KOBATECH AI",
  description: "De l'idée à la réalisation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
