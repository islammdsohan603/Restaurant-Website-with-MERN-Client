"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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
      const refreshFrame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const items = container.querySelectorAll<HTMLElement>(
          "[data-footer-item]",
        );

        if (!items.length) return;

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: container,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      return () => {
        cancelAnimationFrame(refreshFrame);
        media.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
