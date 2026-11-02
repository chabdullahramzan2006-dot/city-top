"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/lib/restaurant";
import { getFoodImage } from "@/data/food-images";

const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent("Assalam o Alaikum, I would like to order from City Top.")}`;

export function Hero() {
  const heroImage = getFoodImage("gallery3");

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={heroImage}
          alt="Sizzling Pakistani karahi at City Top"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/75 to-bg/30" />
      <div className="absolute inset-0 bg-linear-to-r from-bg/90 via-bg/40 to-transparent" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 md:px-6 md:pb-24">
        <motion.p
          className="font-display mb-2 text-5xl tracking-wide text-gradient-gold md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          City Top
        </motion.p>
        <motion.h1
          className="font-display max-w-3xl text-2xl leading-snug text-ivory md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          Welcome to City Top
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-lg text-muted md:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
        >
          {restaurant.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34 }}
        >
          <Button href="/menu" size="lg">
            Explore Menu
          </Button>
          <Button href="/reserve" variant="outline" size="lg">
            Book a Table
          </Button>
          <Button
            href={whatsappUrl}
            variant="ghost"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
