import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export function HomeGallery() {
  const preview = galleryImages.slice(0, 6);

  return (
    <section className="border-t border-border bg-surface/40 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Ambience & Plates"
          title="A Glimpse Inside"
          description="Warm lighting, sizzling karahi, and the buzz of a full dining room — see why evenings at City Top feel special."
          align="center"
        />

        <Reveal className="mt-12">
          <GalleryGrid images={preview} columns={3} />
        </Reveal>

        <Reveal className="mt-10 text-center">
          <Button href="/gallery" variant="outline">
            View Full Gallery
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
