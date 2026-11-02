# City Top — Restaurant Website

Premium Pakistani restaurant website built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Motion**.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.local.example` to `.env.local` and add your Supabase project keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Without these keys the site still runs using the local digitized menu. Reservation and contact forms validate and respond, but persist to Supabase only when configured.

## Database

1. Create a Supabase project.
2. Run `supabase/migrations/001_city_top_schema.sql` in the SQL editor.
3. Optionally seed categories/items from `supabase/seed/menu_seed.sql` (or manage via the dashboard).

RLS allows public read of menu data and public insert of reservations / contact inquiries.

## Menu source

Menu items and prices were digitized from City Top printed menu photographs in `menu-source/`. Items with unclear handwritten prices are flagged `needsConfirmation` in `src/data/menu-items.ts`.

### Needs confirmation

| Item | Note |
| --- | --- |
| Fried Fish | Tape covered price; not confirmed |
| Grilled Fish | Tape covered price; not confirmed |
| Nestle Raita | Price unclear / crossed out |
| Omelette / Egg Fry | No handwritten price |
| Jam, Butter, Slices & Tea | No handwritten price |

## Configurable restaurant details

Update `src/lib/restaurant.ts` for address, phone, WhatsApp, hours, and map embed.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
