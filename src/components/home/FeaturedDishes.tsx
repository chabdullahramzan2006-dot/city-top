import type { MenuItem } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FoodCard } from "@/components/menu/FoodCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

type FeaturedDishesProps = {
  items: MenuItem[];
};

export function FeaturedDishes({ items }: FeaturedDishesProps) {
  const featured = items.filter((i) => i.featured).slice(0, 6);
  const display = featured.length > 0 ? featured : items.slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Chef's Selection"
          title="Signature Dishes"
          description="Karahi sizzling in cast iron, smoky Bar B.Q, and house favorites that guests return for again and again."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <FoodCard item={item} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <Button href="/menu" variant="outline">
            View Full Menu
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
