"use client";

import Image from "next/image";
import { Flame, Plus, ShoppingCart } from "lucide-react";
import type { MenuItem } from "@/lib/types";
import { getFoodImage } from "@/data/food-images";
import { formatPrice, cn } from "@/lib/utils";
import { useCart, type CartPortion } from "@/lib/cart";

type FoodCardProps = {
  item: MenuItem;
  className?: string;
};

function priceLine(item: MenuItem): string {
  if (item.priceLabel) return item.priceLabel;
  if (item.priceFull != null && item.priceHalf != null) {
    return `Full ${formatPrice(item.priceFull)} · Half ${formatPrice(item.priceHalf)}`;
  }
  if (item.priceFull != null) return formatPrice(item.priceFull);
  if (item.priceHalf != null) return `Half ${formatPrice(item.priceHalf)}`;
  if (item.needsConfirmation) return "Price on request";
  return formatPrice(null);
}

export function FoodCard({ item, className }: FoodCardProps) {
  const src = getFoodImage(item.imageKey);
  const unavailable = item.isAvailable === false;
  const { addItem } = useCart();
  const canAdd = !unavailable && (item.priceFull != null || item.priceHalf != null);
  const hasBoth = item.priceFull != null && item.priceHalf != null;

  const onAdd = (portion?: CartPortion) => {
    addItem(item, portion);
  };

  return (
    <article
      className={cn(
        "surface-card group flex h-full flex-col overflow-hidden rounded-sm transition-colors hover:border-gold/35",
        unavailable && "opacity-60",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={src}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {item.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-sm bg-accent/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-ivory">
            <Flame className="h-3 w-3" />
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-snug text-ivory">
            {item.name}
          </h3>
        </div>
        {item.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {item.description}
          </p>
        )}
        <p className="mt-3 text-sm font-medium text-gold">{priceLine(item)}</p>
        {item.confirmationNote && (
          <p className="mt-1 text-xs text-muted">{item.confirmationNote}</p>
        )}

        <div className="mt-auto pt-4">
          {!canAdd ? (
            <p className="text-xs text-muted">Ask staff for current price</p>
          ) : hasBoth ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onAdd("half")}
                className="inline-flex items-center justify-center gap-1 rounded-sm border border-border px-3 py-2 text-xs font-medium text-ivory transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Plus className="h-3.5 w-3.5" />
                Half
              </button>
              <button
                type="button"
                onClick={() => onAdd("full")}
                className="inline-flex items-center justify-center gap-1 rounded-sm bg-gold px-3 py-2 text-xs font-medium text-bg transition-colors hover:bg-gold-muted"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Full
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAdd()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-3 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-gold-muted"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
