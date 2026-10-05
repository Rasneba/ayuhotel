import { IMG } from "@/lib/images";
import { addDays, todayISO } from "@/lib/dates";
import type { NewReview, NewRoom, Room } from "./schema";

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
  "High-speed Wi-Fi",
  "Individually controlled air conditioning",
  "Rain shower",
  "Nespresso machine & tea selection",
  "Minibar",
  "In-room safe",
  "Smart TV with streaming",
  "Blackout curtains",
  "Daily housekeeping & turndown",
  "24-hour room service",
];

export const SEED_ROOMS: NewRoom[] = [
  {
    slug: "classic-garden-room",
    name: "Classic Garden Room",
    category: "Room",
    tagline: "Calm, considered comfort overlooking the botanical gardens.",
    description:
      "Our Classic Garden Rooms are a study in quiet luxury. Hand-finished timber, soft linen and a palette drawn from the Rift Valley's volcanic soils frame a plush queen bed dressed in 400-thread-count Egyptian cotton. French doors open onto the hotel's acacia gardens, and the marble bathroom features a rain shower and locally crafted botanical amenities.",
    priceCents: 8900,
    maxGuests: 2,
    sizeSqm: 28,
    bedType: "Queen bed",
    view: "Garden view",
    amenities: [...BASE_AMENITIES, "Work desk with USB-C charging", "Pillow menu"],
    highlights: ["Garden-facing French doors", "Marble rain-shower bathroom", "Breakfast included"],
    images: [IMG.roomClassic, IMG.roomTowels, IMG.bathMinimal],
    totalUnits: 24,
    featured: false,
    sortOrder: 1,
  },
  {
    slug: "deluxe-king-room",
    name: "Deluxe King Room",
    category: "Room",
    tagline: "Generous space, a private balcony and a deep soaking tub.",
    description:
      "Light-filled and generously proportioned, the Deluxe King Room pairs a signature Ayu king bed with a private furnished balcony. Floor-to-ceiling glazing frames the city or garden, while the bathroom indulges with a deep soaking tub, separate rain shower and heated towel rails. An ideal base for longer stays in Adama.",
    priceCents: 11900,
    maxGuests: 3,
    sizeSqm: 34,
    bedType: "King bed",
    view: "City or garden view",
    amenities: [...BASE_AMENITIES, "Private furnished balcony", "Soaking bathtub", "Bathrobes & slippers", "Bluetooth speaker"],
    highlights: ["Private balcony", "Soaking tub & rain shower", "Complimentary minibar soft drinks"],
    images: [IMG.roomDeluxe, IMG.roomChandelier, IMG.bathMinimal],
    totalUnits: 18,
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "premier-pool-view",
    name: "Premier Pool View Room",
    category: "Room",
    tagline: "Wake to shimmering water and palm-lined terraces.",
    description:
      "Positioned on the upper floors of the Pool Wing, each Premier Room opens onto a sun-washed terrace with direct sightlines over the main pool and its illuminated palms. Inside, a sculptural chandelier, bespoke walnut joinery and a king or twin configuration make the room equally suited to couples and colleagues travelling together.",
    priceCents: 14900,
    maxGuests: 3,
    sizeSqm: 38,
    bedType: "King or twin beds",
    view: "Pool view",
    amenities: [...BASE_AMENITIES, "Pool-facing terrace", "Welcome fruit & Ethiopian honey", "Evening canapés at the Terrace Bar", "Priority pool cabana"],
    highlights: ["Pool-facing terrace", "Priority cabana reservations", "Evening canapés included"],
    images: [IMG.roomPremier, IMG.roomTowels, IMG.bathCity],
    totalUnits: 12,
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "family-suite",
    name: "Family Suite",
    category: "Suite",
    tagline: "Two bedrooms, a living room and room for everyone to unwind.",
    description:
      "Designed for families and small groups, the Family Suite comprises a king master bedroom, a twin second bedroom, two full bathrooms and a central living room with dining table and kitchenette. Children receive a welcome pack, and the suite sits steps from the children's pool and garden lawn.",
    priceCents: 18900,
    maxGuests: 5,
    sizeSqm: 56,
    bedType: "King + two single beds",
    view: "Garden view",
    amenities: [...BASE_AMENITIES, "Two bedrooms & two bathrooms", "Living room with dining table", "Kitchenette with microwave & fridge", "Children's welcome pack", "Baby cot on request"],
    highlights: ["Two separate bedrooms", "Kitchenette & dining area", "Kids' welcome pack"],
    images: [IMG.roomTwin, IMG.roomHousekeeping, IMG.bathMarble],
    totalUnits: 8,
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "executive-suite",
    name: "Executive Suite",
    category: "Suite",
    tagline: "A separate living room, lounge privileges and sweeping views.",
    description:
      "The Executive Suite offers a sophisticated residence for the discerning business traveller. A separate living room with a six-seat dining table doubles as a private meeting space, while the bedroom frames panoramic views of Adama and the mountains beyond. Guests enjoy Executive Lounge access, a one-way airport transfer and guaranteed late check-out.",
    priceCents: 23900,
    maxGuests: 3,
    sizeSqm: 64,
    bedType: "King bed",
    view: "Panoramic city & mountain view",
    amenities: [...BASE_AMENITIES, "Separate living & dining room", "Executive Lounge access", "One-way airport transfer", "Guaranteed 4 PM late check-out", "Pressing of two garments daily", "Marble bathroom with tub & rain shower"],
    highlights: ["Executive Lounge access", "Airport transfer included", "Late check-out guaranteed"],
    images: [IMG.roomExecutive, IMG.roomDoor, IMG.bathMarble],
    totalUnits: 6,
    featured: true,
    sortOrder: 5,
  },
  {
    slug: "presidential-suite",
    name: "Ayu Presidential Suite",
    category: "Signature",
    tagline: "The finest address in Adama — 128 square metres of private splendour.",
    description:
      "Occupying the entire top floor of the Garden Wing, the Ayu Presidential Suite is a residence of rare scale and privacy. A grand salon, formal dining room for eight, private study and master bedroom with dressing room unfold around a wraparound terrace with jacuzzi overlooking the Great Rift Valley. A dedicated butler, chauffeured transfers and in-suite check-in complete the experience.",
    priceCents: 45000,
    maxGuests: 4,
    sizeSqm: 128,
    bedType: "Super-king bed",
    view: "Rift Valley panorama",
    amenities: [...BASE_AMENITIES, "Dedicated butler service", "Private wraparound terrace with jacuzzi", "Formal dining room for eight", "Private study", "Dressing room", "Chauffeured airport transfers", "In-suite check-in & check-out", "Daily afternoon tea"],
    highlights: ["Private terrace & jacuzzi", "Dedicated butler", "Chauffeured transfers"],
    images: [IMG.roomView, IMG.roomChandelier, IMG.bathCity],
    totalUnits: 1,
    featured: true,
    sortOrder: 6,
  },
];

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

export const SEED_REVIEWS: NewReview[] = [
  {
    guestName: "Hanna Tesfaye",
    country: "Ethiopia",
    rating: 5,
    title: "The best hotel in Adama, by a distance",
    body: "We hosted our wedding reception in the Abyssinia Ballroom and the team handled 350 guests with absolute grace. The food, the lighting, the coordination — flawless. Our families are still talking about it.",
    stayType: "Event",
    createdAt: daysAgo(12),
  },
  {
    guestName: "Markus Keller",
    country: "Germany",
    rating: 5,
    title: "A genuine oasis after Addis",
    body: "Arrived after a long drive and was welcomed with cold towels and fresh juice. The Executive Suite was immaculate, the pool at night is stunning and the breakfast spread rivals anything in Europe.",
    stayType: "Business",
    createdAt: daysAgo(21),
  },
  {
    guestName: "Amina Yusuf",
    country: "Kenya",
    rating: 5,
    title: "Perfect family escape",
    body: "The Family Suite gave us real space. The kids lived in the pool while we rotated between the spa and the Terrace Bar. Staff remembered our names from day one. We will be back for Timket.",
    stayType: "Family",
    createdAt: daysAgo(34),
  },
  {
    guestName: "Daniel Okafor",
    country: "Nigeria",
    rating: 4,
    title: "Excellent conference venue",
    body: "Our regional summit ran for three days and the AV, catering and breakout rooms were all first class. Wi-Fi handled 200 delegates without a hiccup. Only wish the gym opened a little earlier.",
    stayType: "Business",
    createdAt: daysAgo(40),
  },
  {
    guestName: "Sophie Laurent",
    country: "France",
    rating: 5,
    title: "The coffee ceremony alone is worth the trip",
    body: "Every afternoon at Buna Lounge was a ritual we looked forward to. The spa's coffee scrub was heavenly and the Premier Room terrace was our favourite spot for sunset.",
    stayType: "Couple",
    createdAt: daysAgo(55),
  },
  {
    guestName: "Li Wei",
    country: "China",
    rating: 5,
    title: "Impeccable service, superb location",
    body: "Stayed for two weeks on a project nearby. The shuttle timing was always precise, laundry back the same day, and the chef happily adapted dishes. A true five-star standard.",
    stayType: "Business",
    createdAt: daysAgo(70),
  },
  {
    guestName: "Grace Mwangi",
    country: "Kenya",
    rating: 5,
    title: "Romantic and beautifully run",
    body: "Booked the Romance Escape for our anniversary. Rose petals, a private dinner by the pool and a couples' massage — every detail was considered. The Presidential Suite terrace at night is magical.",
    stayType: "Couple",
    createdAt: daysAgo(88),
  },
  {
    guestName: "James Whitaker",
    country: "United Kingdom",
    rating: 4,
    title: "Great base for the Rift Valley lakes",
    body: "Concierge arranged a superb day trip to Sodere and Lake Beseka. Rooms are large, beds are extremely comfortable and the pool is one of the best I have seen in Ethiopia.",
    stayType: "Solo",
    createdAt: daysAgo(101),
  },
  {
    guestName: "Fatima Al Mansoori",
    country: "United Arab Emirates",
    rating: 5,
    title: "World-class hospitality",
    body: "From the marble foyer to the turndown chocolates, Ayu feels like an international luxury brand with Ethiopian warmth. Sabisa's tasting menu was a highlight of our East Africa trip.",
    stayType: "Couple",
    createdAt: daysAgo(118),
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
    make("presidential-suite", 3, 3, "Yonas Bekele", "Ethiopia", 45000),
    make("presidential-suite", 12, 2, "Elena Rossi", "Italy", 45000),
    make("presidential-suite", 25, 4, "Omar Haddad", "Jordan", 45000),
    make("executive-suite", 5, 2, "Chen Lu", "China", 23900),
    make("executive-suite", 5, 3, "Peter Adeyemi", "Nigeria", 23900),
    make("family-suite", 8, 2, "Sara Ahmed", "Ethiopia", 18900),
  ].filter((b) => b.roomId);
}
