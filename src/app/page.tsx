import type { Review, Room } from "@/db/schema";
import { fallbackRooms, SEED_REVIEWS } from "@/db/seed-data";
import { addDays, todayISO } from "@/lib/dates";
import { HOTEL, SITE_URL } from "@/lib/hotel";
import { OG_IMAGE } from "@/lib/images";
import { formatMoney } from "@/lib/pricing";
import { getReviewStats, getReviews, getRooms } from "@/lib/queries";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import RoomsSection from "@/components/home/RoomsSection";
import Dining from "@/components/home/Dining";
import Wellness from "@/components/home/Wellness";
import Gallery from "@/components/gallery/Gallery";
import Facilities from "@/components/home/Facilities";
import Reviews from "@/components/home/Reviews";
import Offers from "@/components/home/Offers";
import Location from "@/components/home/Location";
import Contact from "@/components/home/Contact";

export const dynamic = "force-dynamic";

/** Content bundled with the site — used whenever the database is unavailable. */
function fallbackReviews(): Review[] {
  return SEED_REVIEWS.map((r, i) => ({
    ...r,
    id: i + 1,
    approved: true,
    createdAt: r.createdAt ?? new Date(),
  }));
}

async function loadHomeData(): Promise<{
  rooms: Room[];
  reviews: Review[];
  stats: { average: number; total: number };
}> {
  try {
    const [rooms, reviews, stats] = await Promise.all([getRooms(), getReviews(12), getReviewStats()]);
    if (!rooms.length) throw new Error("no rooms in database");
    return { rooms, reviews, stats };
  } catch (error) {
    console.error("Home data unavailable, using bundled content", error);
    const rooms = fallbackRooms();
    const reviews = fallbackReviews();
    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);
    return { rooms, reviews, stats: { average, total: reviews.length } };
  }
}

export default async function HomePage() {
  const { rooms, reviews, stats } = await loadHomeData();
  const roomOptions = rooms.map((r) => ({
    slug: r.slug,
    name: r.name,
    maxGuests: r.maxGuests,
    priceCents: r.priceCents,
  }));
  const prices = rooms.map((r) => r.priceCents);
  const today = todayISO();
  const defaultStay = { checkIn: addDays(today, 1), checkOut: addDays(today, 3) };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: HOTEL.name,
    description: HOTEL.description,
    url: SITE_URL,
    image: `${SITE_URL}${OG_IMAGE}`,
    telephone: HOTEL.phone,
    email: HOTEL.email,
    foundingDate: String(HOTEL.founded),
    priceRange: prices.length
      ? `${formatMoney(Math.min(...prices))} - ${formatMoney(Math.max(...prices))}`
      : undefined,
    currenciesAccepted: "ETB",
    checkinTime: "14:00",
    checkoutTime: "12:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: HOTEL.address.street,
      addressLocality: HOTEL.address.city,
      addressRegion: HOTEL.address.region,
      postalCode: HOTEL.address.postalCode,
      addressCountry: "ET",
    },
    geo: { "@type": "GeoCoordinates", latitude: HOTEL.geo.lat, longitude: HOTEL.geo.lng },
    aggregateRating:
      stats.total > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: stats.average.toFixed(1),
            reviewCount: stats.total,
            bestRating: 5,
          }
        : undefined,
    amenityFeature: [
      "Outdoor swimming pool",
      "Sauna",
      "Massage",
      "Beauty salon",
      "Gymnasium",
      "Restaurant",
      "Bar",
      "Garden",
      "Conference and banquet halls",
      "Free Wi-Fi",
      "Free private parking",
      "Airport shuttle",
      "Business centre",
      "Lift",
      "Air conditioning",
      "Non-smoking rooms",
      "ATM",
      "24-hour front desk",
    ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    containsPlace: rooms.map((r) => ({
      "@type": "HotelRoom",
      name: r.name,
      description: r.tagline,
      occupancy: { "@type": "QuantitativeValue", maxValue: r.maxGuests },
      bed: { "@type": "BedDetails", typeOfBed: r.bedType },
      floorSize: { "@type": "QuantitativeValue", value: r.sizeSqm, unitCode: "MTK" },
      image: r.images[0],
      offers: {
        "@type": "Offer",
        price: (r.priceCents / 100).toFixed(2),
        priceCurrency: "ETB",
        url: `${SITE_URL}/rooms/${r.slug}`,
      },
    })),
  };

  return (
    <main id="main">
      <Hero rooms={roomOptions} defaultStay={defaultStay} />
      <About />
      <RoomsSection rooms={rooms} />
      <Dining />
      <Wellness />
      <Gallery />
      <Facilities />
      <Reviews reviews={reviews} stats={stats} />
      <Offers />
      <Location />
      <Contact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
