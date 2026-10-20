"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiStar,
} from "react-icons/fi";

const HomePage = () => {
  return (
    <section className="relative min-h-[calc(100svh-86px)] overflow-hidden bg-[#11110F] text-[#F5F0E8]">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_35%,rgba(190,100,43,0.09),transparent_38%),radial-gradient(ellipse_at_15%_65%,rgba(130,116,73,0.07),transparent_32%)]"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-86px)] max-w-[1440px] items-center gap-12 px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1fr_0.94fr] lg:gap-14 lg:px-12 lg:pb-20 lg:pt-12 xl:gap-20 xl:px-16">
        {/* Left content */}
        <div className="hero-copy relative z-10 max-w-[590px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#B8955A]/20 bg-[#B8955A]/10 px-3.5 py-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D7A56D]" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D7B77D] sm:text-[10px]">
              Michelin Guide 2025 Recognized
            </span>
          </div>

          <h1 className="max-w-[600px] font-serif text-[clamp(3.3rem,6.3vw,5.7rem)] leading-[0.98] tracking-[-0.055em] text-[#F5F0E8]">
            A Better Meal Is
            <span className="mt-1 block italic text-[#E66A3C]">Waiting.</span>
          </h1>

          <p className="mt-7 max-w-[470px] text-sm leading-7 text-[#B7B1A7] sm:text-base sm:leading-8">
            Discover exceptional flavors, thoughtfully crafted dishes, and
            unforgettable dining experiences orchestrated by our culinary team.
            Every plate tells a story, every visit becomes a memory.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <Link
              href="/menu"
              className="group inline-flex min-h-[50px] items-center justify-center gap-3 rounded-sm bg-[#E96738] px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#17120F] shadow-[0_5px_25px_rgba(233,103,56,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F47A4B] hover:shadow-[0_9px_32px_rgba(233,103,56,0.28)]"
            >
              Explore Our Menu
              <FiArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/reservations"
              className="group inline-flex min-h-[50px] items-center justify-center gap-3 rounded-sm border border-[#5B4B36] bg-white/[0.02] px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#E8D6B8] transition-all duration-300 hover:-translate-y-1 hover:border-[#B8955A] hover:bg-[#B8955A]/10"
            >
              <FiCalendar size={15} />
              Reserve a Table
              <FiArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Rating section */}
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-white/[0.08] pt-6 sm:mt-10 sm:pt-7">
            <div className="flex -space-x-3">
              {["A", "M", "J", "S"].map((initial, index) => (
                <span
                  key={initial}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#11110F] bg-gradient-to-br from-[#A98460] to-[#49372C] font-serif text-xs text-white"
                  style={{ zIndex: 4 - index }}
                >
                  {initial}
                </span>
              ))}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#11110F] bg-[#29251F] text-[9px] font-semibold text-[#D7B77D]">
                +4k
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex gap-0.5 text-[#E8B86D]">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FiStar key={index} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#F5F0E8]">
                  4.9/5.0
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#9E988D]">
                Loved by food enthusiasts
              </p>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="hero-visual relative mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-0 lg:max-w-none">
          <div className="hero-image-float relative aspect-[4/4.7] overflow-hidden rounded-xl border border-white/10 bg-[#211A14] shadow-[0_25px_80px_rgba(0,0,0,0.38)] sm:aspect-[4/4.3] lg:aspect-[0.88/1]">
            <Image
              src="/chef.jpg"
              alt="A chef carefully preparing a signature fine-dining dish"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="hero-image object-cover object-[52%_center]"
            />

            {/* Image overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent" />

            {/* Top badge */}
            <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#11110F]/75 px-3 py-2 backdrop-blur-md sm:right-5 sm:top-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#F0E6D5] sm:text-[9px]">
                Tables Tonight: 24 Guests
              </span>
            </div>

            {/* Bottom dish card */}
            <div className="absolute bottom-4 left-4 right-4 max-w-[310px] rounded-lg border border-[#B8955A]/25 bg-[#171511]/90 p-4 shadow-xl backdrop-blur-xl sm:bottom-6 sm:left-6 sm:p-5">
              <div className="flex items-center gap-2 text-[#D7B77D]">
                <FiStar size={12} fill="currentColor" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.17em]">
                  Chef's Signature
                </span>
              </div>

              <h2 className="mt-2 font-serif text-xl text-[#F5F0E8] sm:text-2xl">
                Pan-Seared Scallop
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#BDB4A6]">
                Oscietra caviar, lemon balm & sea purslane emulsion.
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-[9px] uppercase tracking-[0.12em] text-[#9E988D]">
                  Seasonal tasting menu
                </span>
                <FiArrowUpRight size={16} className="text-[#D7B77D]" />
              </div>
            </div>
          </div>

          {/* Decorative accent */}
          <div
            aria-hidden="true"
            className="absolute -left-4 top-1/4 -z-10 h-20 w-20 border-l border-t border-[#B8955A]/25 sm:-left-6 sm:h-28 sm:w-28"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 -z-10 h-20 w-20 rounded-full border border-[#B8955A]/15 sm:-bottom-5 sm:-right-5 sm:h-28 sm:w-28"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#discover"
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-center lg:flex"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#A8A092]">
          Scroll to discover
        </span>
        <span className="h-7 w-px origin-top animate-pulse bg-gradient-to-b from-[#B8955A] to-transparent" />
      </a>
    </section>
  );
};

export default HomePage;
