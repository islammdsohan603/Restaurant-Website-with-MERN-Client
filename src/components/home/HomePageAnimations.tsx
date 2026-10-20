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

      try {
        gsap.set(copyItems, {
          autoAlpha: 0,
          x: -38,
        });

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
          clearProps: "transform,opacity,visibility",
        });

        if (visual) {
          entrance.to(
            visual,
            {
              autoAlpha: 1,
              x: 0,
              duration: 1.15,
              clearProps: "transform,opacity,visibility",
            },
            0.15,
          );
        }

        if (dishCard) {
          gsap.to(dishCard, {
            y: -7,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      } catch (error) {
        [...copyItems, ...(visual ? [visual] : [])].forEach((element) => {
          element.style.removeProperty("opacity");
          element.style.removeProperty("visibility");
          element.style.removeProperty("transform");
        });
        console.error("Failed to initialize home page animations.", error);
      }
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
