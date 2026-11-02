"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { submitContact } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-sm border border-border bg-surface px-4 py-2.5 text-sm text-ivory placeholder:text-muted focus:border-gold/50 focus:outline-none";

export function ContactForm() {
  const [feedback, setFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setFeedback(null);
    const result = await submitContact(values);
    setFeedback(result);
    if (result.ok) reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-sm border border-border bg-surface/60 p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm text-muted">
            Name
          </label>
          <input
            id="contact-name"
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
          <label htmlFor="contact-email" className="mb-1.5 block text-sm text-muted">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={cn(inputClass, errors.email && "border-accent/60")}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-accent">{errors.email.message}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-phone" className="mb-1.5 block text-sm text-muted">
            Phone (optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            {...register("phone")}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-1.5 block text-sm text-muted">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className={cn(inputClass, "resize-y", errors.message && "border-accent/60")}
            placeholder="Catering inquiry, feedback, or general question…"
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-accent">{errors.message.message}</p>
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
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
