"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Testimonial } from "../../db/TestimonialData";
import TestimonialCard from "./TestimonialCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TestimonialsSection({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const items = testimonials.slice(0, 3);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          })
          .from("[data-t-head]", {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.12,
          })
          .from(
            "[data-t-card]",
            {
              autoAlpha: 0,
              y: 50,
              duration: 0.8,
              stagger: 0.15,
              clearProps: "transform",
            },
            "-=0.3",
          );
      });
    },
    { scope: sectionRef, dependencies: [items.length] },
  );

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-[#0E0E0C] py-16 text-[#F5F0E8] sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-12 text-center">
          <p
            data-t-head
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E5C17F]"
          >
            Critical Acclaim
          </p>
          <h2
            id="testimonials-heading"
            data-t-head
            className="font-serif text-3xl tracking-[-0.02em] text-[#F5F0E8] sm:text-4xl"
          >
            An Experience Worth Returning For
          </h2>
        </div>

        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {items.map((item) => (
            <div key={item.id} data-t-card className="h-full">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
