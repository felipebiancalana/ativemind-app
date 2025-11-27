import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App Saúde Fitness",
  description: "Aplicativo de saúde e fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
