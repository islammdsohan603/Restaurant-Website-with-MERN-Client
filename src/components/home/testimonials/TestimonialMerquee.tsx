"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import type { Testimonial } from "../../db/TestimonialData";
import TestimonialCard from "./TestimonialCard";

gsap.registerPlugin(useGSAP);

type Props = {
  items: Testimonial[];
  secondsPerCard?: number; // বড় হলে ধীরে চলবে
};

export default function TestimonialMarquee({
  items,
  secondsPerCard = 7,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // কার্ড কম হলে বড় স্ক্রিনে ফাঁকা যাবে, তাই ৮টার কম হলে দ্বিগুণ করা হচ্ছে
  const base =
    items.length > 0 && items.length < 8 ? [...items, ...items] : items;

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track || base.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ডান থেকে বামে: track = দুটো সমান group, -50% গেলে লুপ মিলে যায়
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: base.length * secondsPerCard,
          ease: "none",
          repeat: -1,
        });

        const stop = () =>
          gsap.to(tween, {
            timeScale: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        const go = () =>
          gsap.to(tween, {
            timeScale: 1,
            duration: 0.8,
            ease: "power2.inOut",
            overwrite: true,
          });

        wrap.addEventListener("pointerenter", stop);
        wrap.addEventListener("pointerleave", go);
        wrap.addEventListener("focusin", stop);
        wrap.addEventListener("focusout", go);

        // ট্যাব হাইড থাকলে অকারণে চলবে না
        const onVisibility = () =>
          document.hidden ? tween.pause() : tween.resume();
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
          wrap.removeEventListener("pointerenter", stop);
          wrap.removeEventListener("pointerleave", go);
          wrap.removeEventListener("focusin", stop);
          wrap.removeEventListener("focusout", go);
          document.removeEventListener("visibilitychange", onVisibility);
        };
      });
    },
    { scope: wrapRef, dependencies: [base.length, secondsPerCard] },
  );

  const group = (hidden: boolean) => (
    <div
      className="flex shrink-0 gap-5 pr-5 sm:gap-6 sm:pr-6"
      aria-hidden={hidden || undefined}
    >
      {base.map((item, i) => (
        <TestimonialCard
          key={`${hidden ? "dup" : "main"}-${item.id}-${i}`}
          item={item}
        />
      ))}
    </div>
  );

  return (
    <div
      ref={wrapRef}
      aria-label="Guest testimonials"
      className="overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
