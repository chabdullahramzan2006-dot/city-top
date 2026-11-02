import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(20, "Phone number is too long"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  guests: z.coerce.number().int().min(1).max(40),
  specialRequests: z.string().max(500).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;
