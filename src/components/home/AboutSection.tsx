import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/lib/restaurant";
import { getFoodImage } from "@/data/food-images";

export function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-6 md:gap-16">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm md:aspect-square">
          <Image
            src={getFoodImage("gallery1")}
            alt="City Top dining room"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Our Story"
            title="A Dining House Rooted in Pakistani Tradition"
            description={restaurant.description}
          />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-muted leading-relaxed">
            <p>
              At City Top, we honour the rhythms of a classic Pakistani kitchen —
              slow-simmered handi, wok-hot karahi, and live-fire Bar B.Q prepared
              to order. Whether you are gathering family for biryani or sharing a
              Shanwari karahi with friends, every plate is meant to feel generous
              and familiar.
            </p>
            <p>
              Our team blends time-tested recipes with attentive service, so your
              evening feels unhurried: fresh naan from the clay oven, chilled
              beverages on the table, and flavours that stay with you long after
              the last bite.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <Button href="/reserve" variant="outline">
              Plan Your Visit
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
