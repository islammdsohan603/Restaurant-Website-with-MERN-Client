"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MenuCard from "./MenuCard";
import type { MenuItem } from "../../db/MenuData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MenuGridProps = {
  items: MenuItem[];
  onAddToOrder?: (item: MenuItem) => void;
};

export default function MenuGrid({ items, onAddToOrder }: MenuGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      const cards = grid?.querySelectorAll<HTMLElement>("[data-gsap-card]");

      if (!grid || !cards?.length) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: grid,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      return () => media.revert();
    },
    { scope: gridRef, dependencies: [items], revertOnUpdate: true },
  );

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {items.map((item) => (
        <MenuCard key={item.id} item={item} onAddToOrder={onAddToOrder} />
      ))}
    </div>
  );
}
