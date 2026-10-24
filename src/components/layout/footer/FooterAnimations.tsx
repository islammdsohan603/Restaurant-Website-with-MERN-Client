"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FooterAnimationsProps = {
  children: ReactNode;
  className?: string;
};

export default function FooterAnimations({
  children,
  className,
}: FooterAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-footer-item]",
          container,
        );

        items.forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            },
          );
        });

        const links = gsap.utils.toArray<HTMLElement>(
          "[data-footer-link]",
          container,
        );

        links.forEach((link) => {
          gsap.fromTo(
            link,
            { autoAlpha: 0, x: -10 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.45,
              ease: "power2.out",
              scrollTrigger: {
                trigger: link,
                start: "top 95%",
                once: true,
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
