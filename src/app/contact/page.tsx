import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Contact",
  description: `Find ${restaurant.name}, opening hours, and get in touch.`,
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent("Assalam o Alaikum, I have a question about City Top.")}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeading
        eyebrow="Visit Us"
        title="Contact & Location"
        description="Reach out for catering, large groups, or any questions about dining at City Top."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="surface-card space-y-5 rounded-md p-6">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-medium text-ivory">Address</p>
                <p className="mt-1 text-sm text-muted">{restaurant.address}</p>
                <p className="text-sm text-muted">{restaurant.city}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-medium text-ivory">Phone</p>
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                  className="mt-1 block text-sm text-muted hover:text-gold"
                >
                  {restaurant.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-medium text-ivory">Opening Hours</p>
                <ul className="mt-1 space-y-1 text-sm text-muted">
                  {restaurant.hours.map((h) => (
                    <li key={h.day}>
                      <span className="text-ivory/80">{h.day}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button href={whatsappUrl} variant="primary" className="w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </div>

          <div className="overflow-hidden rounded-md border border-border">
            <iframe
              title="City Top location map"
              src={restaurant.mapEmbedUrl}
              className="h-72 w-full grayscale-[30%] contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="surface-card rounded-md p-6 md:p-8">
          <h2 className="font-display text-2xl text-ivory">Send a Message</h2>
          <p className="mt-2 text-sm text-muted">
            We typically respond within a few hours during service.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
