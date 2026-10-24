"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const header = headerRef.current;
      const items = header?.querySelectorAll<HTMLElement>("[data-navbar-item]");

      if (!header || !items?.length || !contextSafe) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline()
          .from(header, {
            autoAlpha: 0,
            y: -14,
            duration: 0.55,
            ease: "power3.out",
          })
          .from(
            items,
            {
              autoAlpha: 0,
              y: -8,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.25",
          );
      });

      const setScrolledStyle = contextSafe((scrolled: boolean) => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        gsap.to(header, {
          backgroundColor: scrolled
            ? "rgba(17, 17, 15, 0.9)"
            : "rgba(17, 17, 15, 0.95)",
          backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
          borderColor: scrolled ? "rgba(184, 149, 90, 0.32)" : "transparent",
          duration: reducedMotion ? 0 : 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      setScrolledStyle(window.scrollY > 50);

      ScrollTrigger.create({
        start: 50,
        onEnter: () => setScrolledStyle(true),
        onLeaveBack: () => setScrolledStyle(false),
      });

      return () => media.revert();
    },
    { scope: headerRef },
  );

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-transparent bg-[#11110F]/95 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-none"
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[90px] lg:px-10 xl:px-16"
        >
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Ember and Olive home"
            data-navbar-item
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B8955A]/70 bg-white/5 font-serif text-2xl italic text-[#D0B477] sm:h-[52px] sm:w-[52px]">
              E<span className="-ml-1">O</span>
            </span>

            <span className="flex flex-col">
              <span className="whitespace-nowrap font-serif text-base tracking-[0.07em] text-white sm:text-xl xl:text-[25px]">
                EMBER <span className="text-[#D0B477]">&</span> OLIVE
              </span>

              <span className="mt-1 text-[9px] tracking-[0.15em] text-white/65 sm:text-[10px] sm:tracking-[0.22em]">
                GASTRONOMY & HEARTH
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.map((link, index) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  data-navbar-item
                  className={`group relative whitespace-nowrap py-3 text-sm font-medium tracking-wide transition-colors xl:text-base ${
                    isActive
                      ? "text-[#D0B477]"
                      : "text-white/80 hover:text-[#D0B477]"
                  }`}
                  style={{ animationDelay: `${100 + index * 90}ms` }}
                >
                  {link.name}

                  <span
                    className={`absolute bottom-1 left-0 h-px bg-[#D0B477] transition-[width] duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <Link
            href="/reservations"
            data-navbar-item
            className="group hidden items-center gap-2 border border-[#B8955A] bg-[#B8955A] px-4 py-3 text-sm font-semibold text-[#11110F] transition-colors hover:border-[#D0B477] hover:bg-[#D0B477] lg:inline-flex xl:px-6"
          >
            Reserve a Table
            <FiArrowUpRight size={18} aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-[#D0B477] transition-colors hover:border-[#B8955A] hover:bg-white/10 lg:hidden"
          >
            <FiMenu size={25} />
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
}
