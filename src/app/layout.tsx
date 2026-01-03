import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Stock",
  description: "Sistema de controle de estoque",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
