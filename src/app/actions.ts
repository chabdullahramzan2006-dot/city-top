"use server";

import { isSupabaseConfigured } from "@/lib/env";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { contactSchema, reservationSchema } from "@/lib/validations";

export type ActionResult = {
  ok: boolean;
  message: string;
};

export async function submitReservation(
  raw: unknown,
): Promise<ActionResult> {
  const parsed = reservationSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid reservation details",
    };
  }

  const data = parsed.data;

  if (!isSupabaseConfigured()) {
    return {
      ok: true,
      message:
        "Reservation received. Connect Supabase env vars to store bookings permanently.",
    };
  }

  const supabase = await createServerClient();
  if (!supabase) {
    return { ok: false, message: "Unable to connect to booking service." };
  }

  const { error } = await supabase.from("reservations").insert({
    name: data.name,
    phone: data.phone,
    reservation_date: data.date,
    reservation_time: data.time,
    guests: data.guests,
    special_requests: data.specialRequests || null,
  });

  if (error) {
    return {
      ok: false,
      message: "Could not save reservation. Please try again or call us.",
    };
  }

  return {
    ok: true,
    message: "Your table request has been submitted. We will confirm shortly.",
  };
}

export async function submitContact(raw: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid contact details",
    };
  }

  const data = parsed.data;

  if (!isSupabaseConfigured()) {
    return {
      ok: true,
      message:
        "Message received. Connect Supabase env vars to store inquiries permanently.",
    };
  }

  const supabase = await createServerClient();
  if (!supabase) {
    return { ok: false, message: "Unable to connect to contact service." };
  }

  const { error } = await supabase.from("contact_inquiries").insert({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    message: data.message,
  });

  if (error) {
    return {
      ok: false,
      message: "Could not send message. Please try again later.",
    };
  }

  return {
    ok: true,
    message: "Thank you. Our team will get back to you soon.",
  };
}
