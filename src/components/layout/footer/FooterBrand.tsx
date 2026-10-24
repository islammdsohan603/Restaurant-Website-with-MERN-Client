import Link from "next/link";

export default function FooterBrand() {
  return (
    <div className="max-w-[300px]">
      <Link
        href="/"
        aria-label="Ember and Olive home"
        className="group inline-flex items-center gap-4"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#B8955A]/70 bg-white/[0.03] font-serif text-2xl italic text-[#D0B477] transition-colors duration-300 group-hover:border-[#D0B477]">
          E<span className="-ml-1">O</span>
        </span>

        <span className="flex flex-col">
          <span className="font-serif text-xl tracking-[0.15em] text-[#F5F0E8] sm:text-2xl">
            EMBER <span className="text-[#D0B477]">&</span>
          </span>
          <span className="font-serif text-xl tracking-[0.15em] text-[#F5F0E8] sm:text-2xl">
            OLIVE
          </span>
        </span>
      </Link>

      <p className="mt-7 text-sm leading-7 text-[#B7B1A7]">
        An elevated exploration of wood-fired gastronomy and ancestral
        Mediterranean olive groves, curated for discerning palates in the heart
        of Mayfair.
      </p>
    </div>
  );
}
