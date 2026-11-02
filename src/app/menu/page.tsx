import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { flaggedMenuItems } from "@/data/menu-items";
import { getCategories, getMenuItems } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore the complete City Top menu — mutton, chicken, Shanwari kitchen, Bar B.Q, rice, Chinese, and more.",
};

type MenuPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  const [categories, items] = await Promise.all([
    getCategories(),
    getMenuItems(),
  ]);

  return (
    <div className="pt-10 md:pt-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Our Menu"
          title="Taste of City Top"
          description="Every item digitized from our printed menu with handwritten prices. Full and half portions shown where available."
        />
        {flaggedMenuItems.length > 0 && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
            {flaggedMenuItems.length === 1
              ? "1 item marked for price confirmation (unclear or missing on the printed menu)."
              : `${flaggedMenuItems.length} items marked for price confirmation (unclear or missing on the printed menu).`}
          </p>
        )}
      </div>
      <MenuExplorer
        items={items}
        categories={categories}
        initialCategory={params.category}
      />
    </div>
  );
}
