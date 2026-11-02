"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  id: string;
  title: string;
  src: string;
  alt: string;
};

type GalleryGridProps = {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
};

export function GalleryGrid({
  images,
  columns = 3,
  className,
}: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) =>
      i == null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i == null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, goPrev, goNext]);

  const colClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  const active = activeIndex != null ? images[activeIndex] : null;

  return (
    <>
      <div className={cn("grid gap-3 md:gap-4", colClass, className)}>
        {images.map((img, index) => (
          <button
            key={img.id}
            type="button"
            className="group relative aspect-[4/3] overflow-hidden rounded-sm text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-bg/0 transition-colors group-hover:bg-bg/20" />
            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-bg/90 to-transparent p-3 text-sm font-display text-ivory opacity-0 transition-opacity group-hover:opacity-100">
              {img.title}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && activeIndex != null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={close}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-sm p-2 text-muted hover:text-ivory"
              aria-label="Close"
              onClick={close}
            >
              <X className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-sm p-2 text-muted hover:text-gold md:left-6"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-2 text-muted hover:text-gold md:right-6"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <motion.figure
              className="relative max-h-[85vh] w-full max-w-5xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <figcaption className="mt-4 text-center font-display text-lg text-ivory">
                {active.title}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
