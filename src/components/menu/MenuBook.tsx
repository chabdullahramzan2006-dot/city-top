"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { getFoodImage } from "@/data/food-images";
import { formatPrice, cn } from "@/lib/utils";
import { useCart, type CartPortion } from "@/lib/cart";

type MenuBookProps = {
  items: MenuItem[];
  categories: MenuCategory[];
};

type BookPage = {
  category: MenuCategory;
  items: MenuItem[];
};

function itemPriceBits(item: MenuItem) {
  if (item.priceFull != null && item.priceHalf != null) {
    return `Full ${formatPrice(item.priceFull)} · Half ${formatPrice(item.priceHalf)}`;
  }
  if (item.priceFull != null) return formatPrice(item.priceFull);
  if (item.needsConfirmation) return "Price on request";
  return formatPrice(null);
}

export function MenuBook({ items, categories }: MenuBookProps) {
  const [showCover, setShowCover] = useState(false);
  const [opened, setOpened] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const { addItem } = useCart();

  const pages = useMemo<BookPage[]>(() => {
    const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
    return sorted
      .map((category) => ({
        category,
        items: items.filter((i) => i.categorySlug === category.slug),
      }))
      .filter((p) => p.items.length > 0);
  }, [categories, items]);

  const page = pages[pageIndex];
  const total = pages.length;

  const closeAll = () => {
    setOpened(false);
    setShowCover(false);
    setPageIndex(0);
  };

  const openBook = () => {
    setOpened(true);
    setPageIndex(0);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowCover(true)}
        className="group inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
      >
        <BookOpen className="h-4 w-4 transition-transform group-hover:scale-110" />
        Full Menu Book
      </button>

      <AnimatePresence>
        {showCover && !opened && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0"
              aria-label="Close menu book"
              onClick={closeAll}
            />
            <motion.button
              type="button"
              onClick={openBook}
              className="relative z-10 w-full max-w-sm cursor-pointer text-left"
              initial={{ rotateY: -12, scale: 0.92, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 180 }}
              style={{ transformStyle: "preserve-3d" }}
              aria-label="Open the City Top menu book"
            >
              <div className="relative overflow-hidden rounded-sm border border-gold/50 bg-linear-to-br from-[#1a2a20] via-[#0f1a14] to-[#0a100c] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div className="absolute inset-y-0 left-0 w-3 bg-linear-to-r from-black/50 to-transparent" />
                <div className="px-8 pb-10 pt-12">
                  <p className="text-xs uppercase tracking-[0.35em] text-gold/80">
                    City Top
                  </p>
                  <h3 className="font-display mt-4 text-4xl text-gradient-gold">
                    Menu Book
                  </h3>
                  <p className="mt-3 text-sm text-muted">
                    Tap the cover to open and browse every category page by page.
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm text-gold">
                    <BookOpen className="h-4 w-4" />
                    Click to open
                  </div>
                </div>
                <div className="relative h-40">
                  <Image
                    src={getFoodImage("mutton-karahi")}
                    alt=""
                    fill
                    className="object-cover opacity-70"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />
                </div>
              </div>
            </motion.button>
            <button
              type="button"
              onClick={closeAll}
              className="absolute right-4 top-4 z-20 rounded-sm border border-border bg-surface p-2 text-ivory"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {opened && page && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-3 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0"
              aria-label="Close open book"
              onClick={closeAll}
            />

            <motion.div
              key={page.category.slug}
              className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-gold/30 bg-[#f3ebe0] text-[#1a1612] shadow-2xl"
              initial={{ rotateY: -70, opacity: 0.4, transformOrigin: "left center" }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 40, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center justify-between border-b border-[#d9cbb8] bg-[#efe4d4] px-4 py-3 md:px-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a6f3d]">
                    City Top Menu · Page {pageIndex + 1} / {total}
                  </p>
                  <h3 className="font-display text-2xl text-[#1f1810] md:text-3xl">
                    {page.category.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeAll}
                  className="rounded-sm p-2 text-[#5c5348] hover:bg-black/5"
                  aria-label="Close book"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
                <ul className="divide-y divide-[#e2d5c2]">
                  {page.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-[#1f1810]">{item.name}</p>
                        {item.description && (
                          <p className="text-xs text-[#6b6258]">
                            {item.description}
                          </p>
                        )}
                        <p className="mt-1 text-sm font-semibold text-[#8a6f3d]">
                          {itemPriceBits(item)}
                        </p>
                      </div>
                      <BookAddButtons item={item} onAdd={addItem} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between border-t border-[#d9cbb8] bg-[#efe4d4] px-4 py-3 md:px-6">
                <button
                  type="button"
                  disabled={pageIndex === 0}
                  onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-sm border border-[#cbb89a] px-3 py-2 text-sm",
                    pageIndex === 0
                      ? "cursor-not-allowed opacity-40"
                      : "hover:bg-black/5",
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <p className="text-xs text-[#6b6258]">
                  Flip through categories
                </p>
                <button
                  type="button"
                  disabled={pageIndex >= total - 1}
                  onClick={() =>
                    setPageIndex((i) => Math.min(total - 1, i + 1))
                  }
                  className={cn(
                    "inline-flex items-center gap-1 rounded-sm border border-[#cbb89a] px-3 py-2 text-sm",
                    pageIndex >= total - 1
                      ? "cursor-not-allowed opacity-40"
                      : "hover:bg-black/5",
                  )}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BookAddButtons({
  item,
  onAdd,
}: {
  item: MenuItem;
  onAdd: (item: MenuItem, portion?: CartPortion) => void;
}) {
  const canAdd = item.priceFull != null || item.priceHalf != null;
  if (!canAdd) {
    return (
      <span className="text-xs text-[#8a6f3d]">Confirm price with staff</span>
    );
  }

  if (item.priceFull != null && item.priceHalf != null) {
    return (
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => onAdd(item, "half")}
          className="rounded-sm border border-[#cbb89a] px-2.5 py-1.5 text-xs font-medium hover:bg-[#1f1810] hover:text-[#f3ebe0]"
        >
          Add Half
        </button>
        <button
          type="button"
          onClick={() => onAdd(item, "full")}
          className="rounded-sm bg-[#1f1810] px-2.5 py-1.5 text-xs font-medium text-[#f3ebe0] hover:bg-[#3a3026]"
        >
          Add Full
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onAdd(item)}
      className="shrink-0 rounded-sm bg-[#1f1810] px-3 py-1.5 text-xs font-medium text-[#f3ebe0] hover:bg-[#3a3026]"
    >
      Add to Cart
    </button>
  );
}
