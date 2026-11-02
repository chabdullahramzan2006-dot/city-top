export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Confirm with restaurant";
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
