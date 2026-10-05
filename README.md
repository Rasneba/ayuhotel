# Ayu International Hotel — website

The official website of **Ayu International Hotel**, 10 Kebele, Gurmu Woreda,
Adama (Nazret), Ethiopia — a Next.js 16 application with a booking flow,
availability and pricing, guest reviews and a contact form, backed by
PostgreSQL through Drizzle ORM.

## Getting started

```bash
npm install
cp .env.example .env        # then set DATABASE_URL
npm run dev                 # http://localhost:3000
```

`DATABASE_URL` is only required for the database-backed features (bookings,
new reviews, contact messages). Without it the site still renders, using the
room and review content bundled in `src/db/seed-data.ts`, and availability is
calculated from those bundled rates. Booking submission and the contact form
then reply with a message asking the guest to call or use WhatsApp.

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npx drizzle-kit push  # apply the schema in src/db/schema.ts
```

## Project layout

```
src/app          routes: home, /rooms, /rooms/[slug], /booking, confirmation, API routes
src/components   home sections, gallery, booking flow, layout (navbar, footer, logo)
src/db           Drizzle schema, connection, first-run bootstrap, seed content
src/lib          company details, image catalogue, pricing, dates, queries
public/images    the hotel's own photography (see docs/CONTENT-SOURCES.md)
scripts          helper for re-collecting material from the live site
```

## Editing the content

| What | Where |
| --- | --- |
| Phones, e-mail, address, check-in times, navigation | `src/lib/hotel.ts` |
| Room types, rates, amenities, guest reviews | `src/db/seed-data.ts` |
| Photographs and gallery captions | `public/images` + `src/lib/images.ts` |
| Promo codes and tax/service rates | `src/lib/pricing.ts` |

Please keep the content factual — the site deliberately publishes the hotel's
real facilities, rates and photography, and cites where each came from in
[`docs/CONTENT-SOURCES.md`](docs/CONTENT-SOURCES.md).
