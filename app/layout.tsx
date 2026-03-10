import type { Metadata } from "next";
import { AppBar } from "@/components/layout/AppBar";
import { getCartDataSSR } from "@/lib/mockCart";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Checkout flow assignment built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartData = await getCartDataSSR();
  const cartCount = cartData.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <html lang="en">
      <body className="antialiased">
        <AppBar cartCount={cartCount} />
        {children}
      </body>
    </html>
  );
}
