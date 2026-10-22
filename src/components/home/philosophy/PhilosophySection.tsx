"use client";

import { motion, useReducedMotion } from "motion/react";
import PhilosophyImage from "./PhilosophyImage";
import PhilosophyContent from "./PhilosophyContent";

export default function PhilosophySection() {
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion ?? false;

  const imageVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : -35,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 35,
      y: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="relative overflow-hidden border-t border-white/[0.05] bg-[#11110F] py-16 text-[#F5F0E8] sm:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_45%,rgba(184,149,90,0.06),transparent_45%)]"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Equal-width image and content columns */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-1 md:gap-12 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left: Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="min-w-0 w-full"
          >
            <PhilosophyImage />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="min-w-0 w-full"
          >
            <PhilosophyContent />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
