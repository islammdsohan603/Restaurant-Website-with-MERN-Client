"use client";

import { motion } from "motion/react";
import SpaceCard from "./SpaceCard";
import { spaces } from "../../db/SpaceDate";

export default function SpacesSection() {
  return (
    <section
      id="spaces"
      aria-labelledby="spaces-heading"
      className="relative overflow-hidden border-t border-white/[0.05] bg-[#11110F] py-20 text-[#F5F0E8] sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-linear(ellipse_at_50%_0%,rgba(184,149,90,0.07),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 grid gap-5 sm:mb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12"
        >
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B77D]">
              Atmospheric Spaces
            </p>

            <h2
              id="spaces-heading"
              className="font-serif text-3xl leading-tight tracking-[-0.035em] text-[#F2EEE7] sm:text-4xl lg:text-[42px]"
            >
              Every Table Has a Story.
            </h2>
          </div>

          <p className="max-w-[410px] text-sm leading-6 text-[#B0AAA0] lg:justify-self-end">
            Choose your ambiance across our historic townhouse, with each
            environment designed for a distinct dining experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5">
          {spaces.map((space, index) => (
            <SpaceCard key={space.id} space={space} index={index} />
          ))}
        </div>

        <div className="mt-10 h-px origin-left bg-linear-to-r from-[#B8955A]/40 via-white/[0.08] to-transparent sm:mt-12" />
      </div>
    </section>
  );
}
