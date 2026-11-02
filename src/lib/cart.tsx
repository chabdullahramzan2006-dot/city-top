"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MenuItem } from "@/lib/types";

export type CartPortion = "full" | "half" | "single";

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  imageKey: string;
  portion: CartPortion;
  unitPrice: number;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (item: MenuItem, portion?: CartPortion) => void;
  updateQty: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "city-top-cart-v1";

function resolvePortion(
  item: MenuItem,
  preferred?: CartPortion,
): { portion: CartPortion; unitPrice: number } | null {
  if (preferred === "half" && item.priceHalf != null) {
    return { portion: "half", unitPrice: item.priceHalf };
  }
  if (preferred === "full" && item.priceFull != null) {
    return { portion: "full", unitPrice: item.priceFull };
  }
  if (item.priceFull != null && item.priceHalf != null) {
    return { portion: "full", unitPrice: item.priceFull };
  }
  if (item.priceFull != null) {
    return { portion: "single", unitPrice: item.priceFull };
  }
  if (item.priceHalf != null) {
    return { portion: "half", unitPrice: item.priceHalf };
  }
  return null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const addItem = useCallback((item: MenuItem, preferred?: CartPortion) => {
    const resolved = resolvePortion(item, preferred);
    if (!resolved) return;

    const key = `${item.id}:${resolved.portion}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, quantity: l.quantity + 1 } : l,
        );
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          name: item.name,
          imageKey: item.imageKey,
          portion: resolved.portion,
          unitPrice: resolved.unitPrice,
          quantity: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.key === key ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = lines.reduce(
      (sum, l) => sum + l.unitPrice * l.quantity,
      0,
    );
    return {
      lines,
      count,
      subtotal,
      addItem,
      updateQty,
      removeLine,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
    };
  }, [lines, isOpen, addItem, updateQty, removeLine, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function portionLabel(portion: CartPortion): string {
  if (portion === "full") return "Full";
  if (portion === "half") return "Half";
  return "Standard";
}
