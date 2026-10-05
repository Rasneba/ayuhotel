import Image from "next/image";
import { whatsappLink } from "@/lib/hotel";
import { IMG } from "@/lib/images";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight, Clock, Coffee, Utensils, Wine } from "@/components/ui/Icons";

const VENUES = [
  {
    name: "Ayu Restaurant",
    type: "Ethiopian & continental",
    hours: "Breakfast, lunch & dinner",
    description:
      "The hotel restaurant serves traditional Ethiopian dishes — doro wat, kitfo, tibs and shiro — alongside pizza, grills, burgers and salads. Guests can eat indoors or at the tables set out in the back garden.",
    image: IMG.lawn,
    Icon: Utensils,
  },
  {
    name: "Garden Bar & Terrace",
    type: "Bar & outdoor seating",
    hours: "Afternoon until late",
    description:
      "Long drinks, Ethiopian beer, wine and freshly pressed juices, served at the outdoor tables overlooking the garden — the liveliest spot in the house in the evenings, with music at weekends.",
    image: IMG.gardens,
    Icon: Wine,
  },
  {
    name: "Buna Corner",
    type: "Coffee & light bites",
    hours: "From morning until evening",
    description:
      "Ethiopian coffee roasted and served the traditional way, plus macchiatos, teas and pastries. The easiest place to hold an informal meeting outside the conference rooms.",
    image: IMG.lobbyLounge,
    Icon: Coffee,
  },
];

const MENU = [
  { name: "Doro wat with injera", note: "Berbere chicken stew, the classic of the house" },
  { name: "Kitfo", note: "Minced beef, mitmita butter, kocho or injera" },
  { name: "Grilled tilapia", note: "From the Rift Valley lakes, with lemon and salad" },
  { name: "Lamb tibs", note: "Pan-seared with onion, rosemary and green chilli" },
  { name: "Pizza & burgers", note: "Stone-baked pizza and beef burgers, popular with families" },
  { name: "Ethiopian coffee ceremony", note: "Roasted, ground and poured at your table" },
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
              eyebrow="Restaurant & Bar"
              title="Where Adama comes to eat"
              description="Indoors, or out in the garden — the kitchen cooks Ethiopian classics and international comfort food all day, and the bar stays open late."
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
                    alt={`${v.name} — ${v.type} at Ayu International Hotel`}
                    fill
                    sizes="(min-width: 768px) 33vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/10 transition-opacity duration-700 group-hover:from-ink-950" />
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

        {/* Menu highlights */}
        <Reveal className="mt-20 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <span className="eyebrow">From the kitchen</span>
            <h3 className="display-md mt-4 text-cream-50">What guests order most</h3>
            <p className="mt-4 text-sm leading-relaxed text-cream-200/65">
              The menu covers Ethiopian favourites, grilled meats and fish, pizza and lighter dishes. Vegetarian
              and fasting platters are always available — simply ask the waiter. Menu prices are shown at the
              restaurant and charged in Ethiopian birr.
            </p>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10 lg:col-span-8">
            {MENU.map((dish) => (
              <li key={dish.name} className="flex items-baseline justify-between gap-6 py-4 transition-colors hover:bg-white/[0.03]">
                <span className="font-display text-xl text-cream-50">{dish.name}</span>
                <span className="text-right text-sm text-cream-200/60">{dish.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
