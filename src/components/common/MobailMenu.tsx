"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowDownRight, FiArrowUpRight, FiX } from "react-icons/fi";

type NavLink = {
  name: string;
  href: string;
};

type MobailMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
};

const menuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const MobailMenu = ({ isOpen, onClose, links }: MobailMenuProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-[60] lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
        aria-label="Close navigation menu"
        tabIndex={-1}
      />

      {/* Drawer */}
      <motion.aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        variants={menuVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="exit"
        className="absolute right-0 top-0 flex h-full w-[min(88%,420px)] flex-col overflow-y-auto border-l border-[#C5A46D]/20 bg-[#11110F] px-6 pb-8 pt-6 text-[#F7F2E8] sm:px-9"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            onClick={onClose}
            className="font-serif text-lg tracking-[0.13em]"
          >
            EMBER <span className="text-[#C5A46D]">&</span> OLIVE
          </Link>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9, rotate: 90 }}
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#C5A46D] transition-colors hover:border-[#C5A46D]"
            aria-label="Close navigation menu"
          >
            <FiX size={23} />
          </motion.button>
        </div>

        {/* Small heading */}
        <motion.div variants={linkVariants} className="mb-7 mt-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#C5A46D]">
            Discover our world
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            A taste of <span className="italic">something</span> special.
          </h2>
        </motion.div>

        {/* Navigation links */}
        <div className="flex flex-col">
          {links.map((link, index) => (
            <motion.div key={link.href} variants={linkVariants}>
              <Link
                href={link.href}
                onClick={onClose}
                className="group flex items-center justify-between border-b border-white/10 py-5 transition-colors hover:text-[#C5A46D]"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-[#777344]">
                    0{index + 1}
                  </span>
                  <span className="font-serif text-2xl tracking-wide sm:text-3xl">
                    {link.name}
                  </span>
                </span>

                <FiArrowDownRight
                  size={20}
                  className="text-[#C5A46D] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Reservation CTA */}
        <motion.div variants={linkVariants} className="mt-8">
          <Link
            href="/reservations"
            onClick={onClose}
            className="group flex min-h-14 items-center justify-between bg-[#C5A46D] px-5 py-4 text-[#11110F] transition-colors duration-300 hover:bg-[#D5B985]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Reserve a Table
            </span>
            <FiArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </motion.div>

        {/* Drawer footer */}
        <motion.div variants={linkVariants} className="mt-auto pt-10">
          <div className="mb-4 h-px w-12 bg-[#C5A46D]" />
          <p className="font-serif text-lg italic text-[#B5B0A4]">
            Gastronomy & Hearth
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
            Thoughtfully crafted. Slowly savoured.
          </p>
        </motion.div>
      </motion.aside>
    </motion.div>
  );
};

export default MobailMenu;
