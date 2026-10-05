# Content & photography sources

All copy, contact details and photographs in this site come from the company
itself. Nothing is stock or template material.

## Where the material came from

| Source | What was taken |
| --- | --- |
| `https://ayuinternationhotel.netlify.app` (home, `/about-us`, `/gallery`, `/contact`, `/table`, `/event`) | The hotel's own photographs of the building, garden, swimming pool, rooms, bathrooms, lobby and conference hall; trading name ("AYU INT HOTEL", "Ayu Int. Hotel"); tagline ("A premium hotel in Adama / Amazing Hotel in front at the center of Adama"); founding year (1995); the published line of facilities; the address (10 Kebele, Gurmu Woreda, Adama); the e-mail address `ayuhotel@gmail.com`; the two guest comments shown on the About page |
| The hotel's verified public listing (`hulunem.com/place/…/ayu-international-hotel`) | Verified telephone numbers `+251 91 149 1500` and `+251 93 010 6757`; plus code `G7R8+52H Adama` (map position); room description (30 m² singles, 25–35 m² doubles, queen beds, coffee maker, refrigerator, TV, safety box, air conditioning, daily cleaning); facility list |
| Public review listing for the property | The summary used in the "What guests tell us" section (big rooms, comfortable beds, garden restaurant, quiet at the back) |

A copy of every image and page pulled from the live site is kept out of the
repository — `scripts/collect-live-assets.mjs` can re-collect it from a machine
with internet access if the material ever needs refreshing.

## Files in `public/images`

| File | Subject |
| --- | --- |
| `hotel-exterior.webp` | The hotel from the garden, with the pool |
| `hotel-facade.webp` | Street elevation and front lawn |
| `hotel-gardens.webp` | Courtyard garden and fountain |
| `hotel-lawn.webp` | Garden lawn and walkways |
| `hotel-entrance.webp` | Entrance canopy on the Adama road |
| `hotel-courtyard.webp` | Guest wings around the courtyard |
| `hotel-pool.webp` | The outdoor swimming pool |
| `adama-abageda-statue.webp` | Aba Geda monument, next to the hotel |
| `room-double.webp`, `room-twin.webp`, `room-deluxe.webp`, `room-queen.webp`, `room-detail.webp` | Guest rooms |
| `bathroom-classic.webp`, `bathroom-tiled.webp` | En-suite bathrooms |
| `lobby-lounge.webp` | Lobby lounge and staircase |
| `meeting-hall.webp` | Conference and banquet hall |
| `og-ayu-hotel.jpg` | Social-sharing card (1200 × 630) |

## Images that were removed

The site as first committed used stock photography from the Pexels CDN and a
set of template pictures copied onto the old site. All of it was deleted and
replaced with the hotel's own photos, including:

- every Pexels image referenced by `src/lib/images.ts` (rooms, spa, dining,
  pools, ballrooms, terraces);
- `img/gallery_2.jpg` — a stock pool in Sharm el-Sheikh;
- `img/gallery_3.jpg` — a stock bedroom photograph;
- `img/gallery_4.jpg` — a stock resort pool;
- `img/dd.jpg` — the Dubai Frame, a landmark in the United Arab Emirates;
- `img/rift-valley-hotel_*` — another property's photograph;
- the "Red Cayenne Restaurant" logo and the template `logo-1.png`.

## Keeping it up to date

- **Company details** (name, phones, e-mail, address, geo, check-in times):
  `src/lib/hotel.ts`.
- **Rooms, rates and amenities**: `src/db/seed-data.ts` — rates are indicative
  rack rates in santim (1/100 birr); confirm them with the front desk.
- **Guest feedback**: `SEED_REVIEWS` in the same file.

_Last refreshed: October 2026._
