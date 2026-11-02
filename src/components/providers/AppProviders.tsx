"use client";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/lib/cart";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
