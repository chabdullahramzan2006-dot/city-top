-- City Top restaurant schema
-- Run in Supabase SQL editor or via CLI after linking a project.

create extension if not exists "pgcrypto";

create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories (id) on delete cascade,
  slug text not null unique,
  name text not null,
  description text,
  price_full numeric(10, 2),
  price_half numeric(10, 2),
  image_url text,
  image_key text,
  is_featured boolean not null default false,
  is_available boolean not null default true,
  needs_confirmation boolean not null default false,
  confirmation_note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  reservation_date date not null,
  reservation_time text not null,
  guests int not null check (guests > 0 and guests <= 40),
  special_requests text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'new'
    check (status in ('new', 'read', 'resolved')),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  rating int not null check (rating between 1 and 5),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists menu_items_category_id_idx on public.menu_items (category_id);
create index if not exists menu_items_featured_idx on public.menu_items (is_featured);
create index if not exists reservations_date_idx on public.reservations (reservation_date);

alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.reservations enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.reviews enable row level security;

-- Public read for menu & published reviews
create policy "Public can read categories"
  on public.menu_categories for select
  to anon, authenticated
  using (true);

create policy "Public can read available menu items"
  on public.menu_items for select
  to anon, authenticated
  using (is_available = true);

create policy "Public can read published reviews"
  on public.reviews for select
  to anon, authenticated
  using (is_published = true);

-- Anyone can submit reservations & contact forms
create policy "Anyone can create reservations"
  on public.reservations for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can create contact inquiries"
  on public.contact_inquiries for insert
  to anon, authenticated
  with check (true);

-- No public select/update/delete on submissions by default
