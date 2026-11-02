import { ChefHat, Flame, UtensilsCrossed, Wheat } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const specialties = [
  {
    icon: Flame,
    title: "Live Bar B.Q",
    text: "Tikka, seekh kabab, and mixed platters grilled over open flame — perfect for sharing.",
  },
  {
    icon: ChefHat,
    title: "Karahi & Handi",
    text: "Cast-iron karahi and clay handi preparations with rich desi masala and tender meat.",
  },
  {
    icon: Wheat,
    title: "Shanwari Kitchen",
    text: "Peshawari-inspired Shanwari karahi and regional favourites from our special section.",
  },
  {
    icon: UtensilsCrossed,
    title: "Clay-Oven Breads",
    text: "Naan, roti, and garlic naan baked fresh — the essential partner to every curry.",
  },
] as const;

export function Specialties() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="What We Do Best"
          title="House Specialties"
          description="Four pillars of the City Top experience — bold flavours, generous portions, and the comfort of authentic Pakistani hospitality."
          align="center"
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.08}>
              <div className="text-center md:text-left">
                <div className="mx-auto mb-4 inline-flex rounded-sm border border-gold/30 bg-bg p-3 text-gold md:mx-0">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-ivory">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
