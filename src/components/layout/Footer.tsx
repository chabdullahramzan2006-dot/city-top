import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { restaurant } from "@/lib/restaurant";

const footerLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reserve", label: "Reservations" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <Logo size="md" className="mb-4" />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            {restaurant.description}
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg text-gold">Explore</h3>
          <ul className="space-y-2">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-muted transition-colors hover:text-ivory"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg text-gold">Visit Us</h3>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {restaurant.address}
                <br />
                {restaurant.city}
              </span>
            </li>
            <li>
              <a
                href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-ivory"
              >
                <Phone className="h-4 w-4 text-gold" />
                {restaurant.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${restaurant.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-ivory"
              >
                <Mail className="h-4 w-4 text-gold" />
                {restaurant.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg text-gold">Hours</h3>
          <ul className="space-y-2 text-sm text-muted">
            {restaurant.hours.map(({ day, time }) => (
              <li key={day}>
                <span className="text-ivory/90">{day}</span>
                <br />
                {time}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-4 text-sm">
            <a
              href={restaurant.social.facebook}
              className="text-muted transition-colors hover:text-gold"
            >
              Facebook
            </a>
            <a
              href={restaurant.social.instagram}
              className="text-muted transition-colors hover:text-gold"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted md:flex-row md:px-6">
          <p>© {year} {restaurant.name}. All rights reserved.</p>
          <p>Authentic Pakistani cuisine · Karahi · Bar B.Q · Shanwari</p>
        </div>
      </div>
    </footer>
  );
}
