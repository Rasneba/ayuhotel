import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink-950 text-cream-50">
      <Image src={IMG.gardens} alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 to-ink-950" />
      <div className="container-x relative py-32 text-center">
        <p className="eyebrow eyebrow-center justify-center">Error 404</p>
        <h1 className="display-xl mt-6">This door leads nowhere</h1>
        <p className="mx-auto mt-5 max-w-md text-cream-200/70">
          The page you are looking for has checked out. Let us guide you back to the lobby.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-gold">Return home</Link>
          <Link href="/booking" className="btn-outline-light">Book a stay</Link>
        </div>
      </div>
    </main>
  );
}
