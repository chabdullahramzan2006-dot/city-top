import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look inside City Top — interiors, karahi, BBQ, and family dining moments.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeading
        eyebrow="Gallery"
        title="Atmosphere & Flavors"
        description="From the dining room to sizzling karahi and live Bar B.Q — a glimpse of City Top."
      />
      <div className="mt-12">
        <GalleryGrid images={galleryImages} />
      </div>
    </div>
  );
}
