import type { Metadata } from "next";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Reserve a Table",
  description: `Book your table at ${restaurant.name}.`,
};

export default function ReservePage() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(200,164,92,0.12), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
        <SectionHeading
          eyebrow="Reservations"
          title="Book a Table"
          description="Share your preferred date and time. Our team will confirm your booking shortly."
        />
        <div className="surface-card mt-10 rounded-md p-6 md:p-8">
          <ReservationForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Prefer to call?{" "}
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
            className="text-gold hover:underline"
          >
            {restaurant.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
