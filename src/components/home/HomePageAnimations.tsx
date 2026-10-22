"use client";

import { useEffect, type ReactNode } from "react";

type HomePageAnimationsProps = {
  children: ReactNode;
};

export default function HomePageAnimations({
  children,
}: HomePageAnimationsProps) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(
      "[data-home-animation-root]",
    );

    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-hero-item]");

    const visual = root.querySelector<HTMLElement>(".hero-visual");

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) return;

    items.forEach((item, index) => {
      item.style.setProperty("--hero-delay", `${index * 120}ms`);
      item.classList.add("hero-item-animated");
    });

    visual?.classList.add("hero-visual-animated");

    return () => {
      items.forEach((item) => {
        item.classList.remove("hero-item-animated");
        item.style.removeProperty("--hero-delay");
      });

      visual?.classList.remove("hero-visual-animated");
    };
  }, []);

  return <div data-home-animation-root>{children}</div>;
}
