"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowDownRight, FiArrowUpRight, FiX } from "react-icons/fi";
import type { NavLink } from "../layout/Navbar";

type MobailMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.06,
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25 },
  },
};

export default function MobailMenu({
  isOpen,
  onClose,
  links,
}: MobailMenuProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation overlay"
            className="absolute inset-0 h-full w-full bg-black/55 backdrop-blur-[3px]"
          />

          <motion.aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-0 flex h-full w-[min(88%,420px)] flex-col overflow-y-auto border-l border-[#B8955A]/30 bg-[#11110F] px-6 pb-8 pt-6 text-white shadow-2xl sm:px-9"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <Link
                href="/"
                onClick={onClose}
                className="font-serif text-lg tracking-[0.08em]"
              >
                EMBER <span className="text-[#B8955A]">&</span> OLIVE
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#D0B477] transition-colors hover:border-[#B8955A] hover:bg-white/5"
              >
                <FiX size={23} />
              </button>
            </div>

            <motion.div variants={itemVariants} className="mb-6 mt-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D0B477]">
                Discover our world
              </p>

              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                A taste of{" "}
                <span className="italic text-[#B8955A]">something</span>{" "}
                special.
              </h2>

              <p className="mt-3 max-w-xs text-sm leading-6 text-[#B7B1A7]">
                Thoughtfully crafted dishes, made to be slowly savoured.
              </p>
            </motion.div>

            <div className="flex flex-col">
              {links.map((link, index) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center justify-between border-b border-white/10 py-4 transition-colors hover:text-[#D0B477]"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-[#B8955A]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-serif text-2xl tracking-wide">
                        {link.name}
                      </span>
                    </span>

                    <FiArrowDownRight
                      size={20}
                      className="text-[#B8955A] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="mt-7">
              <Link
                href="/reservations"
                onClick={onClose}
                className="group flex min-h-14 items-center justify-between bg-[#B8955A] px-5 py-4 text-[#11110F] transition-colors duration-300 hover:bg-[#D0B477]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                  Reserve a Table
                </span>

                <FiArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-auto pt-9">
              <div className="mb-4 h-px w-12 bg-[#B8955A]" />

              <p className="font-serif text-lg italic text-[#D0B477]">
                Gastronomy & Hearth
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#9E988D]">
                Thoughtfully crafted. Slowly savoured.
              </p>
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
