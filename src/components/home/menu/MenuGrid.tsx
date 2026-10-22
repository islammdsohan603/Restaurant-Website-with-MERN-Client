"use client";

import { AnimatePresence, motion } from "motion/react";
import MenuCard from "./MenuCard";
import type { MenuItem } from "../../db/MenuData";

type MenuGridProps = {
  items: MenuItem[];
  onAddToOrder?: (item: MenuItem) => void;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    transition: {
      duration: 0.2,
    },
  },
};

export default function MenuGrid({ items, onAddToOrder }: MenuGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="min-w-0"
          >
            <MenuCard item={item} onAddToOrder={onAddToOrder} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
