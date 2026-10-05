/**
 * Central photo catalogue. All photography is served from the Pexels CDN
 * (free licence) and resized on the fly by the custom image loader.
 */
export type GalleryCategory = "Rooms" | "Exterior" | "Restaurant" | "Spa" | "Events";

export type Photo = {
  src: string;
  w: number;
  h: number;
  alt: string;
  category: GalleryCategory;
  caption: string;
};

export const pexels = (id: number, ext: "jpeg" | "png" = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}`;

/** Build a fixed-size (cropped) URL – handy for OG images and blur placeholders. */
export const pexelsCrop = (src: string, w: number, h: number) =>
  `${src}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  // Exterior / pool
  heroNight: pexels(12387870),
  heroMountain: pexels(9119725),
  heroDubai: pexels(7974839),
  poolArabian: pexels(7974836),
  resortPalms: pexels(3011575),
  resortGreece: pexels(24405882),
  resortTropical: pexels(37526152),
  rooftopPool: pexels(261102),
  // Lobby / public areas
  lobbyFoyer: pexels(14011664),
  lobbyReception: pexels(7821349),
  lobbyDesk: pexels(7821350),
  lobbyMinimal: pexels(35747340),
  lobbyPlant: pexels(14036253),
  lobbyHall: pexels(6758531),
  terraceSunset: pexels(24807134),
  deckSunset: pexels(24805069),
  terraceFlowers: pexels(17022997),
  terraceLounge: pexels(17023004),
  gym: pexels(35215412),
  gym2: pexels(35215421),
  // Landscape
  valleyLake: pexels(29184687),
  cliffTree: pexels(33337903),
  // Rooms
  roomClassic: pexels(7031731),
  roomTowels: pexels(2092060),
  roomDeluxe: pexels(6394550),
  roomChandelier: pexels(8082235),
  roomPremier: pexels(8082217),
  roomTwin: pexels(3688261),
  roomHousekeeping: pexels(6466496),
  roomExecutive: pexels(2725675),
  roomDoor: pexels(8134775),
  roomView: pexels(8134808),
  bathMarble: pexels(7166637),
  bathCity: pexels(8146150),
  bathMinimal: pexels(8089171),
  // Restaurant & food
  diningTables: pexels(20184687),
  diningWarm: pexels(29962487),
  diningWine: pexels(12181763),
  diningGlasses: pexels(8856555),
  diningSetting: pexels(20184692),
  diningCozy: pexels(32738698),
  diningChandelier: pexels(20184679),
  foodSpinach: pexels(19409040),
  foodFish: pexels(7243881),
  foodOctopus: pexels(37068830),
  foodSalad: pexels(16474891),
  foodPlate: pexels(15671411),
  foodDessert: pexels(34520947),
  coffeeEthiopia: pexels(30937097, "png"),
  coffeeSand: pexels(28554506),
  // Spa
  spaBack: pexels(9146378),
  spaMassage: pexels(6186738),
  spaLying: pexels(6076149),
  spaFacial: pexels(9335961),
  spaTable: pexels(9146373),
  spaFacial2: pexels(9335966),
  spaHands: pexels(6187653),
  spaFeet: pexels(6187855),
  // Events
  eventGold: pexels(34278804),
  eventFloral: pexels(30215011),
  eventHall: pexels(16985130),
  eventChandeliers: pexels(36028895),
  eventRomantic: pexels(16120230),
  eventSpacious: pexels(17023025),
} as const;

export const OG_IMAGE = pexelsCrop(IMG.heroNight, 1200, 630);

export const GALLERY: Photo[] = [
  // Exterior
  { src: IMG.heroNight, w: 7797, h: 5201, alt: "Illuminated outdoor pool lined with palms at night", category: "Exterior", caption: "The main pool at dusk" },
  { src: IMG.heroMountain, w: 6016, h: 4016, alt: "Pool terrace with Rift Valley mountain backdrop", category: "Exterior", caption: "Pool terrace facing the Rift Valley escarpment" },
  { src: IMG.resortPalms, w: 7952, h: 5304, alt: "Modern resort facade with pool and palm trees", category: "Exterior", caption: "Garden wing and lap pool" },
  { src: IMG.terraceSunset, w: 6720, h: 4480, alt: "Terrace lounge with sunset view", category: "Exterior", caption: "Sunset Terrace" },
  { src: IMG.lobbyFoyer, w: 7952, h: 5304, alt: "Grand marble foyer with chandelier and staircase", category: "Exterior", caption: "The Grand Foyer" },
  { src: IMG.lobbyDesk, w: 4000, h: 6000, alt: "Hotel reception desk with sculptural lighting", category: "Exterior", caption: "Reception, open 24 hours" },
  { src: IMG.poolArabian, w: 6000, h: 4000, alt: "Ambient-lit pool with arches at night", category: "Exterior", caption: "Night swim at the Arcade Pool" },
  { src: IMG.deckSunset, w: 6720, h: 4480, alt: "Wooden deck and tropical garden at golden hour", category: "Exterior", caption: "The Botanical Garden deck" },
  // Rooms
  { src: IMG.roomView, w: 7342, h: 4900, alt: "Presidential suite bedroom with panoramic windows", category: "Rooms", caption: "Ayu Presidential Suite" },
  { src: IMG.roomPremier, w: 7360, h: 4912, alt: "Premier room with chandelier and king bed", category: "Rooms", caption: "Premier Pool View Room" },
  { src: IMG.roomExecutive, w: 7952, h: 5304, alt: "Executive suite bedroom with warm ambient lighting", category: "Rooms", caption: "Executive Suite" },
  { src: IMG.roomTwin, w: 6048, h: 4032, alt: "Family suite with two queen beds", category: "Rooms", caption: "Family Suite — second bedroom" },
  { src: IMG.bathMarble, w: 7360, h: 4912, alt: "Marble bathroom with freestanding bathtub", category: "Rooms", caption: "Suite bathroom in Carrara marble" },
  { src: IMG.roomDeluxe, w: 7311, h: 4896, alt: "Deluxe king room with floral accent wall", category: "Rooms", caption: "Deluxe King Room" },
  { src: IMG.roomHousekeeping, w: 6720, h: 4480, alt: "Housekeeper arranging pillows on a suite bed", category: "Rooms", caption: "Turndown service, every evening" },
  { src: IMG.bathCity, w: 7360, h: 4912, alt: "Bathtub with floor-to-ceiling city views", category: "Rooms", caption: "Soaking tub with a view" },
  // Restaurant
  { src: IMG.diningTables, w: 5464, h: 8192, alt: "Elegantly set restaurant tables with striped chairs", category: "Restaurant", caption: "Sabisa Restaurant" },
  { src: IMG.diningWarm, w: 5149, h: 7720, alt: "Warmly lit restaurant with wooden tables", category: "Restaurant", caption: "Dinner service at Sabisa" },
  { src: IMG.foodOctopus, w: 7291, h: 4862, alt: "Grilled octopus plated on textured white ceramic", category: "Restaurant", caption: "Chef's tasting menu" },
  { src: IMG.diningWine, w: 6016, h: 4016, alt: "Wine bottle and glasses in warm light", category: "Restaurant", caption: "The Terrace Bar wine library" },
  { src: IMG.foodDessert, w: 6654, h: 4436, alt: "Modern plated dessert with chocolate and mango", category: "Restaurant", caption: "Pastry atelier" },
  { src: IMG.coffeeEthiopia, w: 4000, h: 6000, alt: "Traditional Ethiopian coffee service on woven cloth", category: "Restaurant", caption: "Buna ceremony at Buna Lounge" },
  { src: IMG.diningChandelier, w: 5464, h: 8192, alt: "Crystal chandelier above a dining room", category: "Restaurant", caption: "Private dining room" },
  { src: IMG.foodSalad, w: 5464, h: 8192, alt: "Gourmet salad with baked camembert", category: "Restaurant", caption: "Garden-to-table lunch" },
  // Spa
  { src: IMG.spaBack, w: 6000, h: 4000, alt: "Therapist performing a back massage", category: "Spa", caption: "Signature Rift Valley massage" },
  { src: IMG.spaLying, w: 4000, h: 6000, alt: "Guest resting on a spa treatment bed", category: "Spa", caption: "Treatment suite" },
  { src: IMG.spaFacial, w: 6000, h: 4000, alt: "Calming facial treatment", category: "Spa", caption: "Botanical facial" },
  { src: IMG.spaFeet, w: 4000, h: 6000, alt: "Foot massage in a tranquil spa", category: "Spa", caption: "Reflexology ritual" },
  { src: IMG.spaHands, w: 6000, h: 4000, alt: "Hands massaging a guest's back", category: "Spa", caption: "Deep tissue therapy" },
  { src: IMG.gym, w: 6768, h: 4512, alt: "Modern gym with treadmills and bikes", category: "Spa", caption: "24-hour fitness centre" },
  // Events
  { src: IMG.eventChandeliers, w: 4480, h: 6720, alt: "Banquet hall with chandeliers and round tables", category: "Events", caption: "Abyssinia Ballroom — 400 guests" },
  { src: IMG.eventGold, w: 6000, h: 4000, alt: "Wedding table with gold candelabra and white flowers", category: "Events", caption: "Wedding styling by our events team" },
  { src: IMG.eventFloral, w: 6240, h: 4160, alt: "Reception set-up with floral centrepieces", category: "Events", caption: "Gala dinner set-up" },
  { src: IMG.eventRomantic, w: 6534, h: 4356, alt: "Romantically lit wedding venue with florals", category: "Events", caption: "Garden pavilion wedding" },
  { src: IMG.eventSpacious, w: 6421, h: 4281, alt: "Spacious hall decorated for a reception", category: "Events", caption: "Conference & banquet floor" },
  { src: IMG.lobbyHall, w: 7360, h: 4912, alt: "Bright business centre lounge", category: "Events", caption: "Executive business lounge" },
];

export const GALLERY_CATEGORIES: Array<"All" | GalleryCategory> = [
  "All",
  "Rooms",
  "Exterior",
  "Restaurant",
  "Spa",
  "Events",
];
