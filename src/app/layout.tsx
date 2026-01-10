import type { Metadata } from "next";
import "./globals.css";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { AuthProvider } from "@/contexts/AuthContext";

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
      <body>
        <AuthProvider>
          <ErrorProvider>
            {children}
          </ErrorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
