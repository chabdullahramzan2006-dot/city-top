"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const mobileMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex h-dvh w-screen flex-col bg-[#0c1410] lg:hidden"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border px-4">
              <Logo size="sm" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-ivory"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              className="flex min-h-0 flex-1 flex-col justify-center gap-2 overflow-y-auto px-4 py-6"
              aria-label="Mobile"
            >
              {navLinks.map(({ href, label }, index) => {
                const active =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-display block rounded-sm border px-4 py-4 text-center text-3xl tracking-wide",
                        active
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-border/60 text-ivory",
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="shrink-0 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button
                href={whatsappUrl}
                className="w-full"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Order Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full overflow-hidden border-b transition-colors duration-300",
          scrolled || open
            ? "border-border/80 bg-[#0c1410]/95 backdrop-blur-md"
            : "border-border/50 bg-[#0c1410]/92 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4 md:px-6">
          <div className="min-w-0 flex-1 overflow-hidden">
            <Logo size="sm" />
          </div>

          <nav
            className="hidden shrink-0 items-center gap-6 lg:flex xl:gap-8"
            aria-label="Main"
          >
            {navLinks.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "whitespace-nowrap text-sm tracking-wide transition-colors",
                    active ? "text-gold" : "text-muted hover:text-ivory",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <CartButton />
            <Button
              href={whatsappUrl}
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Now
            </Button>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
            <CartButton />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-ivory"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
