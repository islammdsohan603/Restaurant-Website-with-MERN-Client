"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiArrowUpRight, FiMenu } from "react-icons/fi";
import MobailMenu from "../common/MobailMenu";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Menu", href: "/menu" },
  { name: "Experiences", href: "/experiences" },
  { name: "Contact", href: "/contact" },
];

export type NavLink = (typeof navLinks)[number];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="navbar-enter sticky top-0 z-50 border-b border-white/10 bg-[#0d0817]/95 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[86px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[96px] lg:px-10 xl:px-16"
        >
          {/* Brand */}
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Ember and Olive home"
            className="navbar-item-enter group flex shrink-0 items-center gap-3"
            style={{ animationDelay: "0ms" }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B8955A]/70 bg-white/5 font-serif text-2xl italic text-[#D0B477] transition-transform duration-500 group-hover:rotate-[-8deg] sm:h-[54px] sm:w-[54px] sm:text-[27px]">
              E<span className="-ml-1">O</span>
            </span>

            <span className="flex flex-col">
              <span className="whitespace-nowrap font-serif text-lg leading-tight tracking-[0.07em] text-white sm:text-xl xl:text-[26px]">
                EMBER <span className="text-[#D0B477]">&</span> OLIVE
              </span>

              <span className="mt-1.5 text-[9px] tracking-[0.18em] text-white/65 sm:text-[11px] sm:tracking-[0.22em]">
                GASTRONOMY & HEARTH
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`navbar-item-enter group relative whitespace-nowrap py-3 text-sm font-medium tracking-wide transition-colors duration-300 xl:text-base ${
                    isActive
                      ? "text-[#D0B477]"
                      : "text-white/80 hover:text-[#D0B477]"
                  }`}
                  style={{ animationDelay: `${100 + index * 90}ms` }}
                >
                  {link.name}

                  <span
                    className={`absolute bottom-1 left-0 h-px bg-[#D0B477] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Reservation Button */}
          <Link
            href="/reservations"
            className="navbar-item-enter group hidden items-center gap-2.5 border border-[#B8955A] bg-[#B8955A] px-5 py-3.5 text-sm font-semibold tracking-wide text-[#0d0817] transition-colors duration-300 hover:border-[#D0B477] hover:bg-[#D0B477] lg:inline-flex xl:px-6 xl:text-base"
            style={{ animationDelay: "550ms" }}
          >
            Reserve a Table
            <FiArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

          {/* Mobile & Tablet Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-[#D0B477] transition-colors hover:border-[#B8955A] hover:bg-white/10 lg:hidden"
          >
            <FiMenu size={27} />
          </button>
        </nav>
      </header>

      <MobailMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
};

export default Navbar;
