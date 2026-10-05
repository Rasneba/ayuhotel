import { IMG } from "@/lib/images";
import { addDays, todayISO } from "@/lib/dates";
import type { NewReview, NewRoom, Room } from "./schema";

/**
 * Room inventory, amenities and rates.
 *
 * The amenity list and room sizes follow the property's published description
 * (queen beds, coffee maker, refrigerator, TV, safety box, air conditioning,
 * daily cleaning, en-suite bathrooms with hot water). Rates are indicative
 * rack rates in Ethiopian birr — update `priceCents` (santim, 1/100 birr)
 * whenever the front desk revises them.
 */

/** Static fallback used only if the database cannot be reached. */
export function fallbackRooms(): Room[] {
  return SEED_ROOMS.map((r, i) => ({
    ...r,
    id: i + 1,
    featured: r.featured ?? false,
    sortOrder: r.sortOrder ?? i + 1,
  }));
}

const BASE_AMENITIES = [
  "Air conditioning",
  "Satellite TV",
  "Free Wi-Fi",
  "Refrigerator & minibar",
  "Coffee & tea making facilities",
  "In-room safe",
  "En-suite bathroom with hot water",
  "Daily housekeeping",
  "Bedside telephone",
  "Work desk",
];

export const SEED_ROOMS: NewRoom[] = [
  {
    slug: "standard-single-room",
    name: "Standard Single Room",
    category: "Room",
    tagline: "A quiet, well-kept room for the single traveller.",
    description:
      "Our single rooms are the most requested on weeknights: a queen bed with fresh linen, air conditioning, a writing desk and an en-suite bathroom with bathtub and 24-hour hot water. All singles sit on the quieter, garden-facing side of the building, away from the main road.",
    priceCents: 240000,
    maxGuests: 1,
    sizeSqm: 30,
    bedType: "Queen bed",
    view: "Garden or courtyard view",
    amenities: [...BASE_AMENITIES, "Garden-facing side"],
    highlights: ["Quiet garden-facing side", "Bathtub with hot water", "Breakfast available"],
    images: [IMG.roomQueen, IMG.bathroomClassic, IMG.roomDetail],
    totalUnits: 12,
    featured: false,
    sortOrder: 1,
  },
  {
    slug: "standard-double-room",
    name: "Standard Double Room",
    category: "Room",
    tagline: "Comfortable double room in the centre of Adama.",
    description:
      "A relaxed double room with a queen bed, warm wood furniture, satellite television, refrigerator and air conditioning. Windows look over the courtyard garden, and the restaurant, bar and pool are all a short walk across the lawn.",
    priceCents: 290000,
    maxGuests: 2,
    sizeSqm: 30,
    bedType: "Queen bed",
    view: "Courtyard view",
    amenities: [...BASE_AMENITIES, "Seating corner"],
    highlights: ["Queen bed", "Refrigerator & minibar", "Steps from the pool and restaurant"],
    images: [IMG.roomDouble, IMG.bathroomTiled, IMG.roomDetail],
    totalUnits: 20,
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "standard-twin-room",
    name: "Standard Twin Room",
    category: "Room",
    tagline: "Two separate beds — ideal for friends and colleagues.",
    description:
      "Two single beds, each with its own bedside table and reading light, plus a spacious wardrobe, satellite TV and en-suite bathroom with bathtub. A firm favourite with colleagues travelling together for meetings in Adama.",
    priceCents: 310000,
    maxGuests: 2,
    sizeSqm: 32,
    bedType: "Two single beds",
    view: "Courtyard or garden view",
    amenities: [...BASE_AMENITIES, "Two beds with separate bedside lighting"],
    highlights: ["Twin beds", "Large wardrobe", "Good for colleagues sharing"],
    images: [IMG.roomTwin, IMG.bathroomClassic, IMG.roomDetail],
    totalUnits: 15,
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    category: "Room",
    tagline: "Our most spacious standard room, with a seating area.",
    description:
      "The deluxe rooms are the largest of our standard categories: a king bed, an armchair and coffee table for receiving guests, extra wardrobe space and a full en-suite bathroom. Request a garden-facing deluxe room for the quietest stay.",
    priceCents: 360000,
    maxGuests: 3,
    sizeSqm: 35,
    bedType: "King bed",
    view: "Garden view",
    amenities: [...BASE_AMENITIES, "Seating area with armchairs", "Extra wardrobe space"],
    highlights: ["King bed and seating area", "Garden-facing on request", "Extra space for longer stays"],
    images: [IMG.roomDeluxe, IMG.bathroomTiled, IMG.roomDetail],
    totalUnits: 10,
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "family-room",
    name: "Family Room",
    category: "Suite",
    tagline: "Room for the whole family, with the garden on the doorstep.",
    description:
      "Our family rooms combine a double bed with two singles and a sitting area, and open towards the courtyard garden where children can play safely while you keep an eye from the terrace. Cots are available on request.",
    priceCents: 460000,
    maxGuests: 5,
    sizeSqm: 45,
    bedType: "Double bed + two single beds",
    view: "Garden view",
    amenities: [
      ...BASE_AMENITIES,
      "Extra beds for children",
      "Baby cot on request",
      "Direct garden access",
    ],
    highlights: ["Sleeps up to five", "Baby cot on request", "Opens onto the garden"],
    images: [IMG.roomDeluxe, IMG.roomTwin, IMG.bathroomClassic],
    totalUnits: 6,
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    category: "Signature",
    tagline: "A separate sitting room for guests and business meetings.",
    description:
      "The Executive Suite is our signature accommodation: a king bedroom with a separate living room, dining table for small meetings, refrigerator and minibar, and two bathrooms. Airport pick-up from Bole and late check-out can be arranged with reception.",
    priceCents: 650000,
    maxGuests: 4,
    sizeSqm: 55,
    bedType: "King bed + sofa bed",
    view: "City and garden view",
    amenities: [
      ...BASE_AMENITIES,
      "Separate living and dining room",
      "Two bathrooms",
      "Airport pick-up arranged on request",
      "Late check-out on request",
    ],
    highlights: ["Separate living room", "Two bathrooms", "Space for small meetings"],
    images: [IMG.roomDeluxe, IMG.lobbyLounge, IMG.bathroomTiled],
    totalUnits: 2,
    featured: true,
    sortOrder: 6,
  },
];

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

/**
 * Guest feedback as published by the hotel itself — the two quotes shown on the
 * hotel's own website (Facebook feedback) plus a summary drawn from the
 * property's public TripAdvisor listing. Replace with verified in-house reviews
 * as they are collected.
 */
export const SEED_REVIEWS: NewReview[] = [
  {
    guestName: "Belay T.",
    country: "Ethiopia",
    rating: 5,
    title: "Good environment and a lovely pool",
    body: "I like the hotel — it has a good environment and a nice pool. The garden makes it feel quiet even though you are right in the centre of Adama.",
    stayType: "Family",
    createdAt: daysAgo(18),
  },
  {
    guestName: "Tarakegn A.",
    country: "Ethiopia",
    rating: 5,
    title: "Came for a meeting, stayed a regular",
    body: "I came to Ayu Hotel for a meeting and it turned out to be my favourite. The conference hall and the staff looking after us were excellent.",
    stayType: "Business",
    createdAt: daysAgo(36),
  },
  {
    guestName: "TripAdvisor guest",
    country: "Visiting Adama",
    rating: 4,
    title: "Big rooms and a garden restaurant",
    body: "The rooms are big, the beds comfortable, and there is a nice restaurant and garden at the back — quiet and away from the noise of the main avenue, although the front rooms do pick up some street noise.",
    stayType: "Business",
    createdAt: daysAgo(64),
  },
  {
    guestName: "Business traveller",
    country: "Ethiopia",
    rating: 4,
    title: "Central, easy parking, reliable hot water",
    body: "Well placed for the centre of Adama with private parking, a lift and 24-hour front desk. Ask for a room at the back of the building for the quietest sleep.",
    stayType: "Business",
    createdAt: daysAgo(92),
  },
];

/** A handful of forward bookings so availability feels alive. */
export function buildSeedBookings(roomIdBySlug: Record<string, number>) {
  const today = todayISO();
  const make = (
    slug: string,
    startOffset: number,
    nights: number,
    name: string,
    country: string,
    rateCents: number,
  ) => {
    const checkIn = addDays(today, startOffset);
    const checkOut = addDays(checkIn, nights);
    const roomTotal = rateCents * nights;
    const service = Math.round(roomTotal * 0.1);
    const vat = Math.round((roomTotal + service) * 0.15);
    return {
      reference: `AYU-${String(1000 + startOffset * 7 + nights).padStart(4, "0")}${slug.slice(0, 2).toUpperCase()}`,
      roomId: roomIdBySlug[slug],
      guestName: name,
      email: `${name.split(" ")[0].toLowerCase()}@example.com`,
      phone: "+251 900 000 000",
      country,
      checkIn,
      checkOut,
      adults: 2,
      children: 0,
      nights,
      nightlyRateCents: rateCents,
      roomTotalCents: roomTotal,
      discountLabel: null,
      discountCents: 0,
      serviceChargeCents: service,
      vatCents: vat,
      totalCents: roomTotal + service + vat,
      promoCode: null,
      specialRequests: null,
      status: "confirmed",
    };
  };

  return [
    make("standard-double-room", 3, 2, "Yonas Bekele", "Ethiopia", 290000),
    make("standard-double-room", 12, 1, "Elena Rossi", "Italy", 290000),
    make("standard-twin-room", 4, 3, "Omar Haddad", "Jordan", 310000),
    make("executive-suite", 5, 2, "Chen Lu", "China", 650000),
    make("executive-suite", 5, 3, "Peter Adeyemi", "Nigeria", 650000),
    make("family-room", 8, 2, "Sara Ahmed", "Ethiopia", 460000),
  ].filter((b) => b.roomId);
}
