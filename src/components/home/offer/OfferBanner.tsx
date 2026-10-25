"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

import type { Offer } from "@/src/components/db/OfferData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function OfferBanner({ offer }: { offer: Offer }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          })
          .from("[data-offer-card]", {
            autoAlpha: 0,
            y: 40,
            scale: 0.98,
            duration: 0.9,
            clearProps: "transform",
          })
          .from(
            "[data-offer-item]",
            { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.1 },
            "-=0.5",
          )
          .from(
            "[data-offer-price]",
            { autoAlpha: 0, x: 24, duration: 0.7 },
            "-=0.5",
          )
          .from(
            "[data-offer-cta]",
            { autoAlpha: 0, scale: 0.85, duration: 0.6, ease: "back.out(2)" },
            "-=0.4",
          );

        // কার্ডের উপর হালকা শাইন ঘুরবে
        gsap.fromTo(
          "[data-offer-shine]",
          { xPercent: -120 },
          {
            xPercent: 220,
            duration: 2.2,
            ease: "power2.inOut",
            repeat: -1,
            repeatDelay: 4.5,
            delay: 1.5,
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Seasonal offer"
      className="relative overflow-hidden bg-[#11110F] px-5 py-12 text-[#F5F0E8] sm:px-8 sm:py-16 lg:px-12 xl:px-16"
    >
      <div
        data-offer-card
        className="relative mx-auto flex max-w-7xl flex-col gap-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-linear-to-br from-[#222220] to-[#1C1C1A] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
      >
        {/* Shine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            data-offer-shine
            className="absolute -top-1/2 left-0 h-[200%] w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-[#E5C17F]/[0.07] to-transparent"
          />
        </div>

        {/* Left */}
        <div className="relative max-w-[500px]">
          <span
            data-offer-item
            className="inline-flex items-center rounded-full border border-[#D0B477]/25 bg-[#D0B477]/10 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#E5C17F]"
          >
            {offer.badge}
          </span>

          <h2
            data-offer-item
            className="mt-4 font-serif text-2xl leading-tight tracking-[-0.02em] text-[#F5F0E8] sm:text-[28px]"
          >
            {offer.title}
          </h2>

          <p
            data-offer-item
            className="mt-3 text-[13px] leading-6 text-[#B0AAA0]"
          >
            {offer.description}
          </p>
        </div>

        {/* Right */}
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center lg:shrink-0 lg:gap-6">
          <div data-offer-price className="sm:text-right">
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#A8A092]">
              {offer.priceLabel}
            </p>
            <p className="mt-1 font-serif text-2xl text-[#E5C17F]">
              {offer.price} <span className="text-xl">{offer.priceSuffix}</span>
            </p>
          </div>

          <Link
            href={offer.ctaHref}
            data-offer-cta
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#E66A3C] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#11110F] transition-colors duration-300 hover:bg-[#F07A4D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5C17F] active:scale-95"
          >
            {offer.ctaLabel}
            <FiArrowUpRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
