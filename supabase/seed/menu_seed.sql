-- Seed City Top menu categories.
-- Run after 001_city_top_schema.sql. Re-run safely by clearing first if needed.

insert into public.menu_categories (slug, name, description, sort_order) values
  ('mutton-dishes', 'Mutton Dishes', 'Slow-cooked mutton karahi, handi, and classic curries.', 1),
  ('chicken-dishes', 'Chicken Dishes', 'Signature karahi, handi, and desi chicken specialties.', 2),
  ('vegetable-daal', 'Vegetable & Daal', 'Comforting dals and fresh vegetable preparations.', 3),
  ('soup', 'Soup', 'Warm bowls of chicken soups, full or half.', 4),
  ('chinese-dishes', 'Chinese Dishes', 'Indo-Chinese classics with bold sauces.', 5),
  ('rice-specialities', 'Rice Specialities', 'Biryani, fried rice, and fragrant rice plates.', 6),
  ('sea-food', 'Sea Food', 'Crispy and grilled fish favorites.', 7),
  ('hot-cold-beverages', 'Hot & Cold Beverages', 'Tea, coffee, soft drinks, and water.', 8),
  ('bar-bq', 'Bar B.Q', 'Live fire tikka, boti, kabab, and platters.', 9),
  ('shanwari-kitchen', 'City Top Special Shanwari Kitchen', 'Peshawari and Shanwari karahi traditions.', 10),
  ('special-items', 'Special Items', 'House specialties beyond the everyday menu.', 11),
  ('snacks', 'Snacks', 'Crispy starters and shareable bites.', 12),
  ('salads', 'Salads', 'Fresh salads and raita to balance the spice.', 13),
  ('fresh-from-clay-oven', 'Fresh From Clay Oven', 'Hot naan, roti, and tandoori breads.', 14),
  ('desserts', 'Desserts', 'Sweet finishes from cream to kheer.', 15),
  ('breakfast', 'Breakfast', 'Morning plates to start the day.', 16),
  ('palaoo', 'Palaoo', 'Rich palaoo and egg fried rice.', 17)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order;

-- Tip: Prefer importing items via the dashboard or a one-off script from src/data/menu-items.ts.
-- The Next.js app ships a complete local menu fallback so the site works before seeding items.
