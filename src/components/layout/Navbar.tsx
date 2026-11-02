"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartButton } from "@/components/cart/CartDrawer";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/lib/restaurant";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reserve", label: "Reserve" },
  { href: "/contact", label: "Contact" },
] as const;

const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent("Assalam o Alaikum, I would like to place an order from City Top.")}`;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border/80 bg-bg/95 backdrop-blur-md"
          : "border-transparent bg-bg/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-[4.25rem] md:px-6">
        <Logo size="sm" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm tracking-wide transition-colors",
                  active
                    ? "text-gold"
                    : "text-muted hover:text-ivory",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <CartButton />
          <Button href={whatsappUrl} size="sm" target="_blank" rel="noopener noreferrer">
            Order Now
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <CartButton />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm p-2 text-ivory"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,320px)] flex-col border-l border-border bg-surface px-6 py-8 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo size="sm" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 text-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map(({ href, label }) => {
                  const active =
                    href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "rounded-sm px-3 py-3 text-lg font-display tracking-wide",
                        active ? "text-gold" : "text-ivory",
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto pt-8">
                <Button
                  href={whatsappUrl}
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
