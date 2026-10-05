import Image from "next/image";
import { whatsappLink } from "@/lib/hotel";
import { IMG } from "@/lib/images";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight, Clock, Coffee, Utensils, Wine } from "@/components/ui/Icons";

const VENUES = [
  {
    name: "Sabisa Restaurant",
    type: "All-day dining",
    hours: "6:30 AM – 11:00 PM",
    description:
      "Ethiopian classics and international favourites, a lavish breakfast buffet and a chef's tasting menu on Friday evenings.",
    image: IMG.diningTables,
    Icon: Utensils,
  },
  {
    name: "The Terrace Grill & Bar",
    type: "Poolside grill & cocktails",
    hours: "12:00 PM – 1:00 AM",
    description:
      "Charcoal grills, Rift Valley tilapia and a cocktail list built around Ethiopian honey wine. Live jazz on Thursdays.",
    image: IMG.diningWine,
    Icon: Wine,
  },
  {
    name: "Buna Lounge",
    type: "Coffee house & patisserie",
    hours: "7:00 AM – 10:00 PM",
    description:
      "A daily traditional coffee ceremony at 4 PM, single-origin Yirgacheffe and Sidamo roasts, and house-made pastries.",
    image: IMG.coffeeEthiopia,
    Icon: Coffee,
  },
];

const SIGNATURES = [
  { name: "Doro Wat with injera", note: "Slow-cooked berbere chicken", price: "ETB 650", image: IMG.foodPlate },
  { name: "Grilled Rift Valley tilapia", note: "Charred lemon, awaze butter", price: "ETB 780", image: IMG.foodOctopus },
  { name: "Lamb tibs, rosemary jus", note: "Highland lamb, caramelised shallots", price: "ETB 720", image: IMG.foodSpinach },
  { name: "Yirgacheffe mousse", note: "Dark chocolate, coffee caramel", price: "ETB 380", image: IMG.foodDessert },
];

export default function Dining() {
  return (
    <section id="dining" className="relative scroll-mt-24 overflow-hidden bg-ink-900 py-24 text-cream-50 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-gold-500/10 blur-[140px]"
      />
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              tone="dark"
              eyebrow="Restaurant & Dining"
              title="Culinary journeys, from the Rift Valley to the world"
              description="Three distinctive venues, one philosophy: ingredients from Oromia's farms and lakes, prepared with craft and served with Ethiopian generosity."
            />
          </div>
          <Reveal delay={150} className="lg:col-span-5 lg:justify-self-end">
            <a
              href={whatsappLink("Hello Ayu International Hotel, I would like to reserve a table at the restaurant.")}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-light"
            >
              Reserve a table <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        {/* Venues */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VENUES.map((v, i) => (
            <Reveal key={v.name} delay={i * 120} className="h-full">
              <article className="card-hover group relative flex h-full min-h-[520px] flex-col justify-end overflow-hidden rounded-[1.5rem]">
                <div className="img-zoom absolute inset-0">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/10 transition-opacity duration-700 group-hover:from-ink-950" />
                <div className="relative p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/50 bg-ink-950/50 text-gold-400 backdrop-blur">
                    <v.Icon size={20} />
                  </span>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-400">{v.type}</p>
                  <h3 className="mt-2 font-display text-3xl text-cream-50">{v.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-200/75">{v.description}</p>
                  <p className="mt-4 flex items-center gap-2 text-[12px] font-medium text-cream-100/70">
                    <Clock size={14} className="text-gold-400" /> {v.hours}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Signatures */}
        <Reveal className="mt-20 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <span className="eyebrow">Chef&apos;s signatures</span>
            <h3 className="display-md mt-4 text-cream-50">Tastes of the highlands</h3>
            <p className="mt-4 text-sm leading-relaxed text-cream-200/65">
              Executive Chef Dawit Alemu pairs heritage recipes with modern technique. Menus change with the
              harvest; these four never leave.
            </p>
          </div>
          <ul className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10">
            {SIGNATURES.map((dish) => (
              <li key={dish.name} className="group flex items-center gap-5 py-4 transition-colors hover:bg-white/[0.03]">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={dish.image} alt={dish.name} fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl text-cream-50">{dish.name}</p>
                  <p className="text-sm text-cream-200/60">{dish.note}</p>
                </div>
                <span className="font-display text-lg text-gold-400">{dish.price}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
