export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ayuinternationhotel.netlify.app";

export const HOTEL = {
  name: "Ayu International Hotel",
  shortName: "Ayu",
  tagline: "Where the Rift Valley meets refined hospitality",
  description:
    "A five-star sanctuary in the heart of Adama, Ethiopia. 86 rooms and suites, an outdoor pool, award-winning dining, a serene spa and banquet venues for up to 400 guests — 75 minutes from Addis Ababa Bole International Airport.",
  founded: 1995,
  roomCount: 86,
  rating: 4.8,
  address: {
    street: "Addis Ababa – Adama Road, Kebele 05",
    city: "Adama (Nazret)",
    region: "Oromia",
    country: "Ethiopia",
    postalCode: "1000",
  },
  geo: { lat: 8.5413, lng: 39.2705 },
  phone: "+251 22 111 2345",
  phoneHref: "tel:+251221112345",
  mobile: "+251 911 234 567",
  whatsapp: "251911234567",
  email: "reservations@ayuinternationalhotel.com",
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  social: {
    facebook: "https://facebook.com/ayuinternationalhotel",
    instagram: "https://instagram.com/ayuinternationalhotel",
    x: "https://x.com/ayuhotel",
    tiktok: "https://tiktok.com/@ayuinternationalhotel",
    tripadvisor: "https://tripadvisor.com",
  },
} as const;

export const NAV_LINKS = [
  { label: "Rooms", href: "/#rooms" },
  { label: "Dining", href: "/#dining" },
  { label: "Spa", href: "/#spa" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Offers", href: "/#offers" },
  { label: "Contact", href: "/#contact" },
] as const;

export function whatsappLink(message?: string): string {
  const text =
    message ??
    `Hello ${HOTEL.name}, I would like to make a reservation. Could you please share availability?`;
  return `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${HOTEL.geo.lat},${HOTEL.geo.lng}`;
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${HOTEL.geo.lat},${HOTEL.geo.lng}&z=14&output=embed`;
