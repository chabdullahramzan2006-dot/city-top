import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Guest Voices"
          title="What Our Guests Say"
          description="Families, food lovers, and regulars who keep City Top at the heart of their celebrations."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <Reveal key={t.id} delay={index * 0.08}>
              <blockquote className="flex h-full flex-col rounded-sm border border-border bg-surface/80 p-6">
                <div className="mb-4 flex gap-0.5 text-gold" aria-label={`${t.rating} stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-border pt-4">
                  <cite className="not-italic font-display text-ivory">{t.name}</cite>
                  <p className="text-xs text-muted">{t.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
