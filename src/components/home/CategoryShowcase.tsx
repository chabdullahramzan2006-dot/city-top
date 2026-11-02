import Link from "next/link";
import Image from "next/image";
import type { MenuCategory } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { getFoodImage } from "@/data/food-images";

const categoryImageKey: Record<string, string> = {
  "mutton-dishes": "mutton-karahi",
  "chicken-dishes": "chicken-karahi",
  "vegetable-daal": "daal",
  soup: "soup",
  "chinese-dishes": "chowmein",
  "rice-specialities": "biryani",
  "sea-food": "fish",
  "hot-cold-beverages": "tea",
  "bar-bq": "platter",
  "shanwari-kitchen": "shanwari-mutton",
  "special-items": "chef-special",
  snacks: "snacks",
  salads: "salad",
  "fresh-from-clay-oven": "naan",
  desserts: "dessert",
  breakfast: "breakfast",
  palaoo: "biryani",
};

type CategoryShowcaseProps = {
  categories: MenuCategory[];
};

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const sorted = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);
  const highlight = sorted.slice(0, 8);

  return (
    <section className="border-y border-border bg-surface/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="From Our Kitchen"
          title="Browse by Category"
          description="From mutton karahi and Shanwari specialties to clay-oven naan and chilled beverages — explore the full spread."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlight.map((cat, index) => {
            const imageKey = categoryImageKey[cat.slug] ?? "chef-special";
            return (
              <Reveal key={cat.id} delay={index * 0.05}>
                <Link
                  href={`/menu?category=${cat.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-sm"
                >
                  <Image
                    src={getFoodImage(imageKey)}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-display text-lg text-ivory">{cat.name}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-muted">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
