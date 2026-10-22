import { motion } from "motion/react";

export default function MenuHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
    >
      <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D6B77D] sm:text-[10px]">
        The Epicurean Journey
      </p>

      <h2
        id="menu-heading"
        className="font-serif text-3xl tracking-[-0.04em] text-[#F5F0E8] sm:text-4xl"
      >
        Find Your Flavor
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-[#AAA59B] sm:text-sm">
        An evolving dialogue between fire, season and simplicity. Discover the
        ingredients, precision and craftsmanship behind each plate.
      </p>
    </motion.div>
  );
}
