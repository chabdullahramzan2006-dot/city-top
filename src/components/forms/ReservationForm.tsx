"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  reservationSchema,
  type ReservationFormValues,
} from "@/lib/validations";
import { submitReservation } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-ivory placeholder:text-muted focus:border-gold/50 focus:outline-none";

export function ReservationForm() {
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
      specialRequests: "",
    },
  });

  const onSubmit = async (values: ReservationFormValues) => {
    setFeedback(null);
    const result = await submitReservation(values);
    setFeedback(result);
    if (result.ok) reset({ guests: 2, specialRequests: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-sm border border-border bg-surface/60 p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="res-name" className="mb-1.5 block text-sm text-muted">
            Full name
          </label>
          <input
            id="res-name"
            type="text"
            autoComplete="name"
            className={cn(inputClass, errors.name && "border-accent/60")}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-accent">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="res-phone" className="mb-1.5 block text-sm text-muted">
            Phone
          </label>
          <input
            id="res-phone"
            type="tel"
            autoComplete="tel"
            className={cn(inputClass, errors.phone && "border-accent/60")}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-accent">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="res-date" className="mb-1.5 block text-sm text-muted">
            Date
          </label>
          <input
            id="res-date"
            type="date"
            className={cn(inputClass, errors.date && "border-accent/60")}
            {...register("date")}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-accent">{errors.date.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="res-time" className="mb-1.5 block text-sm text-muted">
            Time
          </label>
          <input
            id="res-time"
            type="time"
            className={cn(inputClass, errors.time && "border-accent/60")}
            {...register("time")}
          />
          {errors.time && (
            <p className="mt-1 text-xs text-accent">{errors.time.message}</p>
          )}
        </div>
        <div className="sm:col-span-2 sm:max-w-xs">
          <label htmlFor="res-guests" className="mb-1.5 block text-sm text-muted">
            Guests
          </label>
          <input
            id="res-guests"
            type="number"
            min={1}
            max={40}
            className={cn(inputClass, errors.guests && "border-accent/60")}
            {...register("guests")}
          />
          {errors.guests && (
            <p className="mt-1 text-xs text-accent">{errors.guests.message}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="res-notes" className="mb-1.5 block text-sm text-muted">
            Special requests (optional)
          </label>
          <textarea
            id="res-notes"
            rows={3}
            className={cn(inputClass, "resize-y")}
            placeholder="High chair, birthday setup, dietary notes…"
            {...register("specialRequests")}
          />
          {errors.specialRequests && (
            <p className="mt-1 text-xs text-accent">
              {errors.specialRequests.message}
            </p>
          )}
        </div>
      </div>

      {feedback && (
        <p
          className={cn(
            "text-sm",
            feedback.ok ? "text-gold" : "text-accent",
          )}
          role="status"
        >
          {feedback.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Request Reservation"}
      </Button>
    </form>
  );
}
