import Image from "next/image";
import { whatsappLink } from "@/lib/hotel";
import { IMG } from "@/lib/images";
import Reveal from "@/components/ui/Reveal";
import { ArrowUpRight, Check, Clock } from "@/components/ui/Icons";

const TREATMENTS = [
  { name: "Signature Rift Valley Massage", duration: "90 min", price: "$75" },
  { name: "Ethiopian Coffee Body Polish", duration: "60 min", price: "$55" },
  { name: "Deep Tissue Recovery", duration: "60 min", price: "$60" },
  { name: "Botanical Facial", duration: "60 min", price: "$58" },
  { name: "Hot Volcanic Stone Ritual", duration: "75 min", price: "$70" },
  { name: "Couples' Sunset Ritual", duration: "120 min", price: "$160" },
];

const FACILITIES = [
  "Finnish sauna & eucalyptus steam room",
  "Six treatment suites & a couples' suite",
  "Relaxation lounge with herbal teas",
  "24-hour fitness centre with Technogym",
  "Outdoor pool & children's pool",
  "Yoga on the lawn, Saturdays at 7 AM",
];

export default function Spa() {
  return (
    <section id="spa" className="scroll-mt-24 overflow-hidden bg-cream-50 py-24 lg:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:items-center">
        {/* Copy */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <Reveal>
            <span className="eyebrow">Ayu Wellness & Spa</span>
            <h2 className="display-lg mt-5 text-ink-900">Rituals of restoration</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-500 sm:text-base">
              Drawing on Ethiopia&apos;s ancient traditions — coffee, honey, frankincense and volcanic stone —
              our therapists craft treatments that slow time. Begin in the sauna, drift through the steam room,
              and finish on the relaxation terrace as the light turns gold over the valley.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8 grid gap-3 sm:grid-cols-2">
            {FACILITIES.map((f) => (
              <p key={f} className="flex items-start gap-3 text-sm text-ink-600">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-700">
                  <Check size={12} />
                </span>
                {f}
              </p>
            ))}
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-400">Treatment menu</p>
            <ul className="mt-4 divide-y divide-ink-900/10 border-y border-ink-900/10">
              {TREATMENTS.map((t) => (
                <li key={t.name} className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:bg-cream-100/80">
                  <div className="flex min-w-0 items-baseline gap-3">
                    <span className="font-display text-lg text-ink-900 transition-colors group-hover:text-gold-700">{t.name}</span>
                    <span className="hidden text-[11px] uppercase tracking-widest text-ink-400 sm:inline">{t.duration}</span>
                  </div>
                  <span className="flex-1 border-b border-dotted border-ink-900/20" aria-hidden />
                  <span className="font-display text-lg text-ink-900">{t.price}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260} className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href={whatsappLink("Hello Ayu Wellness & Spa, I would like to book a treatment.")}
              target="_blank"
              rel="noreferrer"
              className="btn-dark"
            >
              Book a treatment <ArrowUpRight size={16} />
            </a>
            <span className="flex items-center gap-2 text-sm text-ink-500">
              <Clock size={16} className="text-gold-600" /> Daily 9:00 AM – 9:00 PM
            </span>
          </Reveal>
        </div>

        {/* Collage */}
        <div className="order-1 lg:order-2 lg:col-span-6">
          <Reveal direction="right" className="relative mb-10 grid grid-cols-5 gap-4 lg:mb-0">
            <div className="img-zoom relative col-span-3 aspect-[3/4] overflow-hidden rounded-[2rem]">
              <Image src={IMG.spaLying} alt="Guest resting in a spa treatment suite" fill sizes="(min-width:1024px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="col-span-2 flex flex-col gap-4">
              <div className="img-zoom relative aspect-square overflow-hidden rounded-[1.5rem]">
                <Image src={IMG.spaFacial} alt="Botanical facial treatment" fill sizes="(min-width:1024px) 18vw, 36vw" className="object-cover" />
              </div>
              <div className="img-zoom relative flex-1 overflow-hidden rounded-[1.5rem]">
                <Image src={IMG.spaBack} alt="Signature massage" fill sizes="(min-width:1024px) 18vw, 36vw" className="object-cover" />
              </div>
            </div>
            <div className="glass-light absolute -bottom-6 left-6 rounded-2xl px-5 py-4 text-ink-900 animate-float sm:left-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-700">Most loved</p>
              <p className="mt-1 font-display text-xl">Coffee Body Polish</p>
              <p className="text-xs text-ink-500">Fresh-ground Sidamo beans & wild honey</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
