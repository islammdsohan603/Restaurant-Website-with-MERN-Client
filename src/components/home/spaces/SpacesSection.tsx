"use client";

import { motion, useReducedMotion } from "framer-motion";
import SpaceCard from "./SpaceCard";
import { spaces } from "./spacesDate";

export default function SpacesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="spaces"
      aria-labelledby="spaces-heading"
      className="relative overflow-hidden border-t border-white/[0.05] bg-[#11110F] py-20 text-[#F5F0E8] sm:py-24 lg:py-28"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,149,90,0.07),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Section heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-10 grid gap-5 sm:mb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-12"
        >
          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#D6B77D] sm:text-[10px]">
              Atmospheric Spaces
            </p>

            <h2
              id="spaces-heading"
              className="font-serif text-3xl leading-tight tracking-[-0.035em] text-[#F2EEE7] sm:text-4xl lg:text-[42px]"
            >
              Every Table Has a Story.
            </h2>
          </div>

          <p className="max-w-[410px] text-[13px] leading-6 text-[#B0AAA0] lg:justify-self-end lg:text-sm">
            Choose your ambiance across our four-story historic townhouse, each
            environment calibrated for distinct sensory experiences.
          </p>
        </motion.div>

        {/* Cards reveal from below when section enters viewport */}
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.13,
                delayChildren: reduceMotion ? 0 : 0.08,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-5"
        >
          {spaces.map((space, index) => (
            <SpaceCard key={space.id} space={space} index={index} />
          ))}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: reduceMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 h-px origin-left bg-gradient-to-r from-[#B8955A]/40 via-white/[0.08] to-transparent sm:mt-12"
        />
      </div>
    </section>
  );
}
