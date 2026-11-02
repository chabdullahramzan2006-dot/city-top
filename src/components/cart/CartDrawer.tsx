"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { portionLabel, useCart } from "@/lib/cart";
import { getFoodImage } from "@/data/food-images";
import { formatPrice } from "@/lib/utils";
import { restaurant } from "@/lib/restaurant";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    isOpen,
    closeCart,
    updateQty,
    removeLine,
    clear,
  } = useCart();

  const whatsappOrder = () => {
    const body = lines
      .map(
        (l) =>
          `• ${l.name} (${portionLabel(l.portion)}) x${l.quantity} — ${formatPrice(l.unitPrice * l.quantity)}`,
      )
      .join("\n");
    const text = encodeURIComponent(
      `Assalam o Alaikum, I would like to order from City Top:\n\n${body}\n\nTotal: ${formatPrice(subtotal)}`,
    );
    window.open(`https://wa.me/${restaurant.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[60] bg-black/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-border bg-bg shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <h2 className="font-display text-xl text-ivory">
                  Your Cart ({count})
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-sm p-2 text-muted hover:text-ivory"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted">
                  Your cart is empty. Add dishes from the menu.
                </p>
              ) : (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <li
                      key={line.key}
                      className="surface-card flex gap-3 rounded-sm p-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src={getFoodImage(line.imageKey)}
                          alt={line.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-ivory">
                          {line.name}
                        </p>
                        <p className="text-xs text-muted">
                          {portionLabel(line.portion)} ·{" "}
                          {formatPrice(line.unitPrice)}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-1 rounded-sm border border-border">
                            <button
                              type="button"
                              className="p-1.5 text-muted hover:text-ivory"
                              aria-label="Decrease"
                              onClick={() =>
                                updateQty(line.key, line.quantity - 1)
                              }
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-6 text-center text-sm">
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              className="p-1.5 text-muted hover:text-ivory"
                              aria-label="Increase"
                              onClick={() =>
                                updateQty(line.key, line.quantity + 1)
                              }
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLine(line.key)}
                            className="p-1.5 text-muted hover:text-accent"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="space-y-3 border-t border-border px-5 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium text-gold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <Button className="w-full" onClick={whatsappOrder}>
                  Order on WhatsApp
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="w-full text-center text-xs text-muted hover:text-ivory"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function CartButton() {
  const { count, toggleCart } = useCart();

  return (
    <button
      type="button"
      onClick={toggleCart}
      className="relative inline-flex items-center justify-center rounded-sm border border-border p-2 text-ivory transition-colors hover:border-gold/40 hover:text-gold"
      aria-label={`Open cart, ${count} items`}
    >
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-bg">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
