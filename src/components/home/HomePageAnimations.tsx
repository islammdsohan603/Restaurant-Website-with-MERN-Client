"use client";

import { type ReactNode, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type HomePageAnimationsProps = {
  children: ReactNode;
};

export default function HomePageAnimations({
  children,
}: HomePageAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) return;

      const copyItems = gsap.utils.toArray<HTMLElement>(
        "[data-hero-item]",
        root,
      );
      const visual = root.querySelector<HTMLElement>(".hero-visual");
      const dishCard = root.querySelector<HTMLElement>(".dish-card");

      // Start left-side content hidden and slightly to the left.
      gsap.set(copyItems, {
        autoAlpha: 0,
        x: -38,
      });

      // Start image hidden and slightly to the right.
      if (visual) {
        gsap.set(visual, {
          autoAlpha: 0,
          x: 55,
        });
      }

      const entrance = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      entrance.to(copyItems, {
        autoAlpha: 1,
        x: 0,
        duration: 0.85,
        stagger: 0.13,
        clearProps: "visibility",
      });

      if (visual) {
        entrance.to(
          visual,
          {
            autoAlpha: 1,
            x: 0,
            duration: 1.15,
            clearProps: "visibility",
          },
          0.15,
        );
      }

      // Infinite, subtle motion for the dish card.
      if (dishCard) {
        gsap.to(dishCard, {
          y: -7,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
