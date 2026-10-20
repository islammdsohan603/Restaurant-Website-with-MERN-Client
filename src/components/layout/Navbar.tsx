"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiMenu } from "react-icons/fi";
import MobailMenu from "../common/MobailMenu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Menu", href: "/menu" },
  { name: "Experiences", href: "/experiences" },
  { name: "Contact", href: "/contact" },
];

const navbarVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const entranceVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : navbarVariants;

  const childVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      }
    : itemVariants;

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={entranceVariants}
        className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#11110F]/95 text-[#F7F2E8] backdrop-blur-xl"
      >
        <nav
          className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:h-[90px] lg:px-10 xl:px-16"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <motion.div variants={childVariants}>
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="group flex shrink-0 items-center gap-3"
              aria-label="Ember and Olive home"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A46D]/50 text-[#C5A46D] transition duration-500 group-hover:rotate-[-12deg] group-hover:border-[#C5A46D] sm:h-12 sm:w-12">
                <span className="font-serif text-2xl italic">E</span>
                <span className="-ml-1 font-serif text-2xl italic">O</span>
              </span>

              <span className="flex flex-col">
                <span className="font-serif text-lg leading-tight tracking-[0.12em] sm:text-xl xl:text-2xl">
                  EMBER <span className="text-[#C5A46D]">&</span> OLIVE
                </span>
                <span className="mt-1 text-[9px] tracking-[0.2em] text-[#B5B0A4] sm:text-[10px] sm:tracking-[0.25em]">
                  GASTRONOMY & HEARTH
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation: visible from 1024px */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <motion.div key={link.href} variants={childVariants}>
                  <Link
                    href={link.href}
                    className={`group relative whitespace-nowrap py-3 text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-300 xl:text-[15px] xl:tracking-[0.12em] ${
                      isActive
                        ? "text-[#C5A46D]"
                        : "text-[#D6D2C9] hover:text-[#C5A46D]"
                    }`}
                  >
                    {link.name}

                    <motion.span
                      className="absolute bottom-1 left-0 h-px bg-[#C5A46D]"
                      initial={false}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />

                    {!isActive && (
                      <span className="absolute bottom-1 left-0 h-px w-0 bg-[#C5A46D] transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Reservation CTA: desktop */}
          <motion.div variants={childVariants} className="hidden lg:block">
            <Link
              href="/reservations"
              className="group inline-flex items-center gap-3 border border-[#C5A46D]/70 px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 hover:bg-[#C5A46D] hover:text-[#11110F] xl:px-5 xl:text-sm"
            >
              Reserve a Table
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>

          {/* Mobile + tablet menu: below 1024px */}
          <motion.button
            type="button"
            variants={childVariants}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            className="flex h-12 w-12 items-center justify-center border border-white/15 text-[#C5A46D] transition-colors duration-300 hover:border-[#C5A46D] lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <FiMenu size={27} />
          </motion.button>
        </nav>
      </motion.header>

      {/* Animated mobile / tablet drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <MobailMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            links={navLinks}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
