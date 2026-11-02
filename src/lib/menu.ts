import { categories as localCategories } from "@/data/categories";
import { getFoodImage } from "@/data/food-images";
import { menuItems as localMenuItems } from "@/data/menu-items";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export async function getCategories(): Promise<MenuCategory[]> {
  const supabase = await createClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("menu_categories")
      .select("id, slug, name, description, sort_order")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        description: row.description ?? "",
        sortOrder: row.sort_order,
      }));
    }
  }

  return localCategories;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = await createClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("menu_items")
      .select(
        `
        id,
        slug,
        name,
        description,
        price_full,
        price_half,
        image_url,
        image_key,
        is_featured,
        is_available,
        needs_confirmation,
        confirmation_note,
        menu_categories ( slug )
      `,
      )
      .eq("is_available", true)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((row) => {
        const categoryRel = row.menu_categories as
          | { slug: string }
          | { slug: string }[]
          | null;
        const categorySlug = Array.isArray(categoryRel)
          ? categoryRel[0]?.slug
          : categoryRel?.slug;

        return {
          id: row.slug ?? row.id,
          name: row.name,
          categorySlug: categorySlug ?? "special-items",
          description: row.description ?? undefined,
          priceFull:
            row.price_full == null ? null : Number(row.price_full),
          priceHalf:
            row.price_half == null ? null : Number(row.price_half),
          imageKey: row.image_key ?? "chicken-karahi",
          featured: Boolean(row.is_featured),
          needsConfirmation: Boolean(row.needs_confirmation),
          confirmationNote: row.confirmation_note ?? undefined,
          isAvailable: row.is_available !== false,
        } satisfies MenuItem;
      });
    }
  }

  return localMenuItems;
}

export async function getFeaturedItems(limit = 6): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter((item) => item.featured).slice(0, limit);
}

export function resolveItemImage(item: MenuItem): string {
  return getFoodImage(item.imageKey);
}
