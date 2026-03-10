import type { Metadata } from "next";
import { AppBar } from "@/components/layout/AppBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Checkout flow assignment built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppBar />
        {children}
      </body>
    </html>
  );
}
