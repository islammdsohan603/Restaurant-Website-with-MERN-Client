"use client";

import { motion, useReducedMotion } from "motion/react";
import PhilosophyImage from "./PhilosophyImage";
import PhilosophyContent from "./PhilosophyContent";

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.08,
    },
  },
};

export default function PhilosophySection() {
  const reduceMotion = useReducedMotion();

  const imageVariants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      x: reduceMotion ? 0 : -35,
      y: reduceMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: reduceMotion ? 1 : 0,
      x: reduceMotion ? 0 : 35,
      y: reduceMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_45%,rgba(184,149,90,0.055),transparent_42%)]"
      />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 sm:gap-12 sm:px-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-12 lg:px-12 xl:gap-16 xl:px-16"
      >
        <motion.div variants={imageVariants} className="min-w-0">
          <PhilosophyImage />
        </motion.div>

        <motion.div variants={contentVariants} className="min-w-0">
          <PhilosophyContent />
        </motion.div>
      </motion.div>
    </section>
  );
}
