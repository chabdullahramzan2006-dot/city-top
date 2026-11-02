import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={cn(centered && "text-center mx-auto max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-3xl md:text-4xl text-ivory tracking-tight",
          centered && "mx-auto",
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "gold-divider my-4 w-16",
          centered && "mx-auto",
        )}
      />
      {description && (
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </Reveal>
  );
}
