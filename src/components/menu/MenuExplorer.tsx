"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { FoodCard } from "@/components/menu/FoodCard";
import { MenuBook } from "@/components/menu/MenuBook";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type MenuExplorerProps = {
  items: MenuItem[];
  categories: MenuCategory[];
  initialCategory?: string;
};

export function MenuExplorer({
  items,
  categories,
  initialCategory,
}: MenuExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">(
    initialCategory ?? "all",
  );

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.sortOrder - b.sortOrder),
    [categories],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchCat =
        category === "all" || item.categorySlug === category;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        (item.description?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, query, category]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-6">
      <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-bg/95 px-4 py-4 backdrop-blur-md md:top-[4.25rem] md:-mx-6 md:px-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes…"
              className="w-full rounded-sm border border-border bg-surface py-2.5 pl-10 pr-4 text-sm text-ivory placeholder:text-muted focus:border-gold/50 focus:outline-none"
              aria-label="Search menu"
            />
          </div>
          <MenuBook items={items} categories={categories} />
        </div>
        <div className="scrollbar-clip">
          <div
            className="scrollbar-hide flex gap-2 overflow-x-auto overscroll-x-contain"
            role="tablist"
            aria-label="Menu categories"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              type="button"
              role="tab"
              aria-selected={category === "all"}
              onClick={() => setCategory("all")}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
                category === "all"
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-border text-muted hover:border-gold/30 hover:text-ivory",
              )}
            >
              All
            </button>
            {sortedCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={category === cat.slug}
                onClick={() => setCategory(cat.slug)}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors",
                  category === cat.slug
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-border text-muted hover:border-gold/30 hover:text-ivory",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted">
          No dishes match your search. Try another category or keyword.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <Reveal key={item.id} delay={(index % 6) * 0.04}>
              <FoodCard item={item} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
