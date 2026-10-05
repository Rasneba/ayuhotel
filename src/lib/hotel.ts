/**
 * Company facts.
 *
 * Sourced from the hotel's own website (ayuinternationhotel.netlify.app) and
 * its verified public listing — see docs/CONTENT-SOURCES.md. Update the phones
 * and e-mail here if the front desk changes them; every page reads from here.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ayuinternationhotel.netlify.app";

export const HOTEL = {
  name: "Ayu International Hotel",
  shortName: "Ayu",
  tagline: "A premium hotel in the centre of Adama",
  description:
    "Ayu International Hotel sits in the heart of Adama (Nazret), Oromia — comfortable single, double, twin and deluxe rooms, an outdoor swimming pool, garden restaurant and bar, conference and banquet halls, sauna, gym and free parking and Wi-Fi, 45 minutes from Addis Ababa on the expressway.",
  founded: 1995,
  openHours: "Open 24 hours, every day",
  address: {
    street: "10 Kebele, Gurmu Woreda",
    city: "Adama (Nazret)",
    region: "Oromia",
    country: "Ethiopia",
    postalCode: "1000",
    landmark: "Beside the Aba Geda monument, at the centre of Adama",
  },
  geo: { lat: 8.549, lng: 39.2722 },
  plusCode: "G7R8+52H Adama",
  phone: "+251 91 149 1500",
  phoneHref: "tel:+251911491500",
  phoneAlt: "+251 93 010 6757",
  phoneAltHref: "tel:+251930106757",
  whatsapp: "251911491500",
  email: "ayuhotel@gmail.com",
  checkIn: "2:00 PM",
  checkOut: "12:00 PM",
  social: {
    // The hotel's own site publishes no working social profiles yet; add the
    // real ones here when the accounts are created.
    facebook: "",
    instagram: "",
    tiktok: "",
  },
} as const;

export const NAV_LINKS = [
  { label: "Rooms", href: "/#rooms" },
  { label: "Dining", href: "/#dining" },
  { label: "Wellness", href: "/#wellness" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Meetings", href: "/#events" },
  { label: "Contact", href: "/#contact" },
] as const;

export function whatsappLink(message?: string): string {
  const text =
    message ??
    `Hello ${HOTEL.name}, I would like to make a reservation. Could you please share availability?`;
  return `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  HOTEL.plusCode,
)}`;
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${HOTEL.plusCode}, ${HOTEL.address.city}, Ethiopia`,
)}&z=16&output=embed`;
