"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowDownRight, FiArrowUpRight, FiX } from "react-icons/fi";
import type { NavLink } from "../layout/Navbar";

type MobailMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
};

gsap.registerPlugin(useGSAP);

export default function MobailMenu({
  isOpen,
  onClose,
  links,
}: MobailMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenuRef = useRef<() => void>(() => {});

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return;

      closeMenuRef.current = contextSafe(() => {
        const overlay = menuRef.current;
        const drawer =
          overlay?.querySelector<HTMLElement>("[data-menu-drawer]");

        if (!overlay || !drawer) {
          onClose();
          return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          onClose();
          return;
        }

        gsap.killTweensOf([overlay, drawer]);
        gsap
          .timeline({ onComplete: onClose })
          .to(drawer, { x: "100%", duration: 0.3, ease: "power2.in" })
          .to(overlay, { autoAlpha: 0, duration: 0.2 }, "-=0.1");
      });

      return () => {
        closeMenuRef.current = () => {};
      };
    },
    { scope: menuRef },
  );
  const closeMenu = () => closeMenuRef.current();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenuRef.current();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useGSAP(
    () => {
      const overlay = menuRef.current;
      const drawer = overlay?.querySelector<HTMLElement>("[data-menu-drawer]");
      const items = overlay?.querySelectorAll<HTMLElement>("[data-menu-item]");

      if (!overlay || !drawer || !items) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(overlay, { autoAlpha: isOpen ? 1 : 0 });
        gsap.set(drawer, { x: isOpen ? 0 : "100%" });
        gsap.set(items, { autoAlpha: 1, y: 0 });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (!isOpen) {
          gsap.set(overlay, { autoAlpha: 0 });
          gsap.set(drawer, { x: "100%" });
          gsap.set(items, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.2, ease: "power2.out" },
        );
        gsap.fromTo(
          drawer,
          { x: "100%" },
          { x: 0, duration: 0.4, ease: "power3.out" },
        );
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.06,
            delay: 0.12,
            ease: "power2.out",
          },
        );
      });

      return () => media.revert();
    },
    { scope: menuRef, dependencies: [isOpen], revertOnUpdate: true },
  );

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-[60] lg:hidden ${
        isOpen ? "" : "pointer-events-none invisible"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        onClick={closeMenu}
        aria-label="Close navigation overlay"
        tabIndex={isOpen ? 0 : -1}
        className="absolute inset-0 h-full w-full bg-black/55 backdrop-blur-[3px]"
      />

      <aside
        id="mobile-navigation"
        data-menu-drawer
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute right-0 top-0 flex h-full w-[min(88%,420px)] flex-col overflow-y-auto border-l border-[#B8955A]/30 bg-[#11110F] px-6 pb-8 pt-6 text-white shadow-2xl sm:px-9"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link
            href="/"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
            className="font-serif text-lg tracking-[0.08em]"
          >
            EMBER <span className="text-[#B8955A]">&</span> OLIVE
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            tabIndex={isOpen ? 0 : -1}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#D0B477] hover:border-[#B8955A] hover:bg-white/5"
          >
            <FiX size={23} />
          </button>
        </div>

        <div data-menu-item className="mb-6 mt-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D0B477]">
            Discover our world
          </p>

          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
            A taste of <span className="italic text-[#B8955A]">something</span>{" "}
            special.
          </h2>

          <p className="mt-3 max-w-xs text-sm leading-6 text-[#B7B1A7]">
            Thoughtfully crafted dishes, made to be slowly savoured.
          </p>
        </div>

        <div className="flex flex-col">
          {links.map((link, index) => (
            <div key={link.href} data-menu-item>
              <Link
                href={link.href}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                className="group flex items-center justify-between border-b border-white/10 py-4 hover:text-[#D0B477]"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-[#B8955A]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="font-serif text-2xl tracking-wide">
                    {link.name}
                  </span>
                </span>

                <FiArrowDownRight size={20} className="text-[#B8955A]" />
              </Link>
            </div>
          ))}
        </div>

        <div data-menu-item className="mt-7">
          <Link
            href="/reservations"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
            className="group flex min-h-14 items-center justify-between bg-[#B8955A] px-5 py-4 text-[#11110F] hover:bg-[#D0B477]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em]">
              Reserve a Table
            </span>

            <FiArrowUpRight size={20} />
          </Link>
        </div>

        <div data-menu-item className="mt-auto pt-9">
          <div className="mb-4 h-px w-12 bg-[#B8955A]" />

          <p className="font-serif text-lg italic text-[#D0B477]">
            Gastronomy & Hearth
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#9E988D]">
            Thoughtfully crafted. Slowly savoured.
          </p>
        </div>
      </aside>
    </div>
  );
}
