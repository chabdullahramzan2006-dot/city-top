import { Clock, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/lib/restaurant";

export function HomeContact() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Find Us"
            title="Visit City Top"
            description="Walk in for karahi and Bar B.Q, or reserve ahead for larger gatherings. We are ready to welcome you."
          />

          <Reveal className="space-y-6">
            <div className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-display text-ivory">Address</p>
                <p className="mt-1 text-muted">
                  {restaurant.address}
                  <br />
                  {restaurant.city}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-display text-ivory">Phone</p>
                <a
                  href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                  className="mt-1 block text-muted transition-colors hover:text-gold"
                >
                  {restaurant.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <p className="font-display text-ivory">Opening Hours</p>
                <ul className="mt-2 space-y-1 text-sm text-muted">
                  {restaurant.hours.map(({ day, time }) => (
                    <li key={day}>
                      <span className="text-ivory/80">{day}:</span> {time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/reserve">Book a Table</Button>
              <Button href="/contact" variant="outline">
                Send a Message
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
