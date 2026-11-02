export type PriceFlag = "needs_confirmation" | null;

export interface MenuItem {
  id: string;
  name: string;
  categorySlug: string;
  description?: string;
  priceFull: number | null;
  priceHalf: number | null;
  /** Size-based pricing (e.g. S/M/L) when Full/Half does not apply */
  priceLabel?: string;
  imageKey: string;
  featured?: boolean;
  needsConfirmation?: boolean;
  confirmationNote?: string;
  isAvailable?: boolean;
}

export interface MenuCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
}

export interface ReservationInput {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}
