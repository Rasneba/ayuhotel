import type { Review, Room } from "@/db/schema";
import { fallbackRooms } from "@/db/seed-data";
import { addDays, todayISO } from "@/lib/dates";
import { HOTEL, SITE_URL } from "@/lib/hotel";
import { OG_IMAGE } from "@/lib/images";
import { formatMoney } from "@/lib/pricing";
import { getReviewStats, getReviews, getRooms } from "@/lib/queries";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import RoomsSection from "@/components/home/RoomsSection";
import Dining from "@/components/home/Dining";
import Spa from "@/components/home/Spa";
import Gallery from "@/components/gallery/Gallery";
import Facilities from "@/components/home/Facilities";
import Reviews from "@/components/home/Reviews";
import Offers from "@/components/home/Offers";
import Location from "@/components/home/Location";
import Contact from "@/components/home/Contact";

export const dynamic = "force-dynamic";

async function loadHomeData(): Promise<{ rooms: Room[]; reviews: Review[]; stats: { average: number; total: number } }> {
  try {
    const [rooms, reviews, stats] = await Promise.all([getRooms(), getReviews(12), getReviewStats()]);
    return { rooms, reviews, stats };
  } catch (error) {
    console.error("Home data unavailable, using fallback content", error);
    return { rooms: fallbackRooms(), reviews: [], stats: { average: HOTEL.rating, total: 0 } };
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
    image: OG_IMAGE,
    telephone: HOTEL.phone,
    email: HOTEL.email,
    foundingDate: String(HOTEL.founded),
    priceRange: prices.length ? `${formatMoney(Math.min(...prices))} - ${formatMoney(Math.max(...prices))}` : undefined,
    checkinTime: "14:00",
    checkoutTime: "11:00",
    starRating: { "@type": "Rating", ratingValue: "5" },
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
        ? { "@type": "AggregateRating", ratingValue: stats.average.toFixed(1), reviewCount: stats.total, bestRating: 5 }
        : undefined,
    amenityFeature: [
      "Outdoor swimming pool",
      "Sauna",
      "Spa",
      "Fitness centre",
      "Restaurant",
      "Bar",
      "Free Wi-Fi",
      "Free parking",
      "Airport shuttle",
      "Business centre",
      "Banquet hall",
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
      offers: { "@type": "Offer", price: (r.priceCents / 100).toFixed(2), priceCurrency: "USD", url: `${SITE_URL}/rooms/${r.slug}` },
    })),
    sameAs: Object.values(HOTEL.social),
  };

  return (
    <main id="main">
      <Hero rooms={roomOptions} defaultStay={defaultStay} />
      <About />
      <RoomsSection rooms={rooms} />
      <Dining />
      <Spa />
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
