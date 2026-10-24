"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import MenuCard from "./MenuCard";
import type { MenuItem } from "../../db/MenuData";

type MenuGridProps = {
  items: MenuItem[];
  onAddToOrder?: (item: MenuItem) => void;
};

export default function MenuGrid({ items, onAddToOrder }: MenuGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useGSAP(
    () => {
      const grid = gridRef.current;
      const cards = grid?.querySelectorAll<HTMLElement>("[data-gsap-card]");

      if (!grid || !cards?.length) {
        isFirstRender.current = false;
        return;
      }

      const shouldAnimate = !window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!shouldAnimate) {
        isFirstRender.current = false;
        return;
      }

      if (isFirstRender.current) {
        isFirstRender.current = false;
        gsap.from(cards, {
          autoAlpha: 0,
          y: 26,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 84%",
            once: true,
          },
        });
      } else {
        gsap.from(cards, {
          autoAlpha: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    },
    { scope: gridRef, dependencies: [items] },
  );

  return (
    <div
      ref={gridRef}
      data-gsap-reveal
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((item) => (
        <MenuCard key={item.id} item={item} onAddToOrder={onAddToOrder} />
      ))}
    </div>
  );
}
