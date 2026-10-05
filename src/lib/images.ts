/**
 * Central photo catalogue.
 *
 * Every photograph in `public/images/` is the hotel's own material, published
 * on its official site (https://ayuinternationhotel.netlify.app) or on its
 * verified public listing, and re-encoded for the web. No stock photography is
 * used anywhere in this site — see docs/CONTENT-SOURCES.md for provenance.
 */
export type GalleryCategory =
  | "Rooms"
  | "Bathrooms"
  | "Exterior & Gardens"
  | "Pool"
  | "Facilities"
  | "Adama";

export type Photo = {
  src: string;
  w: number;
  h: number;
  alt: string;
  category: GalleryCategory;
  caption: string;
};

const local = (file: string) => `/images/${file}`;

export const IMG = {
  // Building & grounds
  exterior: local("hotel-exterior.webp"),
  facade: local("hotel-facade.webp"),
  gardens: local("hotel-gardens.webp"),
  lawn: local("hotel-lawn.webp"),
  entrance: local("hotel-entrance.webp"),
  courtyard: local("hotel-courtyard.webp"),
  pool: local("hotel-pool.webp"),
  statue: local("adama-abageda-statue.webp"),
  // Rooms
  roomDouble: local("room-double.webp"),
  roomTwin: local("room-twin.webp"),
  roomDeluxe: local("room-deluxe.webp"),
  roomQueen: local("room-queen.webp"),
  roomDetail: local("room-detail.webp"),
  // Bathrooms
  bathroomClassic: local("bathroom-classic.webp"),
  bathroomTiled: local("bathroom-tiled.webp"),
  // Public areas
  lobbyLounge: local("lobby-lounge.webp"),
  meetingHall: local("meeting-hall.webp"),
} as const;

export const OG_IMAGE = "/images/og-ayu-hotel.jpg";

export const GALLERY: Photo[] = [
  // Exterior & gardens
  {
    src: IMG.exterior,
    w: 1360,
    h: 1020,
    alt: "Ayu International Hotel seen across its garden and pool",
    category: "Exterior & Gardens",
    caption: "The hotel from the garden",
  },
  {
    src: IMG.facade,
    w: 1000,
    h: 750,
    alt: "Ayu International Hotel street facade with lawn in front",
    category: "Exterior & Gardens",
    caption: "Front elevation on the Adama road",
  },
  {
    src: IMG.gardens,
    w: 1360,
    h: 1020,
    alt: "Inner courtyard garden with paved walkways and flower beds",
    category: "Exterior & Gardens",
    caption: "The inner courtyard",
  },
  {
    src: IMG.lawn,
    w: 1300,
    h: 975,
    alt: "Green lawn and walkway in the hotel garden",
    category: "Exterior & Gardens",
    caption: "Garden lawn and walkways",
  },
  {
    src: IMG.entrance,
    w: 1360,
    h: 765,
    alt: "Entrance canopy and driveway of the hotel",
    category: "Exterior & Gardens",
    caption: "Arrival at the entrance canopy",
  },
  {
    src: IMG.courtyard,
    w: 480,
    h: 360,
    alt: "Guest wings arranged around the hotel courtyard",
    category: "Exterior & Gardens",
    caption: "Guest wings around the courtyard",
  },
  // Pool
  {
    src: IMG.pool,
    w: 1000,
    h: 750,
    alt: "Outdoor swimming pool surrounded by the hotel building",
    category: "Pool",
    caption: "The outdoor swimming pool",
  },
  // Rooms
  {
    src: IMG.roomDouble,
    w: 1000,
    h: 750,
    alt: "Double room with dark wood furniture at Ayu International Hotel",
    category: "Rooms",
    caption: "Double room",
  },
  {
    src: IMG.roomTwin,
    w: 1000,
    h: 750,
    alt: "Twin room with two single beds",
    category: "Rooms",
    caption: "Twin room",
  },
  {
    src: IMG.roomDeluxe,
    w: 1000,
    h: 750,
    alt: "Deluxe room with king bed and seating",
    category: "Rooms",
    caption: "Deluxe room",
  },
  {
    src: IMG.roomQueen,
    w: 1000,
    h: 750,
    alt: "Guest room with queen bed, desk and minibar",
    category: "Rooms",
    caption: "Queen room with work desk",
  },
  {
    src: IMG.roomDetail,
    w: 264,
    h: 532,
    alt: "Bedside table, wardrobe and reading light in a guest room",
    category: "Rooms",
    caption: "In-room detail",
  },
  // Bathrooms
  {
    src: IMG.bathroomClassic,
    w: 1000,
    h: 750,
    alt: "En-suite bathroom with bathtub, washbasin and tiled floor",
    category: "Bathrooms",
    caption: "En-suite with bathtub",
  },
  {
    src: IMG.bathroomTiled,
    w: 1000,
    h: 750,
    alt: "Fully tiled bathroom with bathtub and hot water",
    category: "Bathrooms",
    caption: "Tiled bathroom with hot water",
  },
  // Facilities
  {
    src: IMG.lobbyLounge,
    w: 1000,
    h: 750,
    alt: "Lobby lounge with seating, television and staircase",
    category: "Facilities",
    caption: "Lobby lounge",
  },
  {
    src: IMG.meetingHall,
    w: 600,
    h: 400,
    alt: "Conference and banquet hall set with round tables",
    category: "Facilities",
    caption: "Conference & banquet hall",
  },
  // Adama
  {
    src: IMG.statue,
    w: 1400,
    h: 1050,
    alt: "Aba Geda monument in Adama",
    category: "Adama",
    caption: "Aba Geda monument nearby",
  },
];

export const GALLERY_CATEGORIES: Array<"All" | GalleryCategory> = [
  "All",
  "Rooms",
  "Bathrooms",
  "Exterior & Gardens",
  "Pool",
  "Facilities",
  "Adama",
];
