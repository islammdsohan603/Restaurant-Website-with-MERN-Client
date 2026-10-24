"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HomePageAnimationsProps = {
  children: ReactNode;
};

export default function HomePageAnimations({
  children,
}: HomePageAnimationsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: rootRef });

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) return;

      const media = gsap.matchMedia();
      const cleanups: Array<() => void> = [];

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroItems = root.querySelectorAll<HTMLElement>("[data-hero-item]");
        const heroVisual = root.querySelector<HTMLElement>("[data-hero-visual]");
        const dishCard = root.querySelector<HTMLElement>("[data-gsap-float]");

        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, x: -32 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.12,
          },
        );

        if (heroVisual) {
          gsap.fromTo(
            heroVisual,
            { autoAlpha: 0, x: 36 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.18,
            },
          );
        }

        if (dishCard) {
          gsap.to(dishCard, {
            y: -6,
            duration: 2.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        root
          .querySelectorAll<HTMLElement>("[data-gsap-reveal]")
          .forEach((element) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 22 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: element,
                  start: "top 86%",
                  once: true,
                },
              },
            );
          });

        root
          .querySelectorAll<HTMLElement>("[data-gsap-card-group]")
          .forEach((group) => {
            const cards = group.querySelectorAll<HTMLElement>("[data-gsap-card]");

            if (!cards.length) return;

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
                  trigger: group,
                  start: "top 84%",
                  once: true,
                },
              },
            );
          });

        const animateHover = (
          event: PointerEvent,
          isEntering: boolean,
        ) => {
          let target =
            event.target instanceof HTMLElement ? event.target : null;
          const relatedTarget =
            event.relatedTarget instanceof Node ? event.relatedTarget : null;

          while (target && root.contains(target)) {
            if (
              target.hasAttribute("data-gsap-hover") &&
              !(relatedTarget && target.contains(relatedTarget))
            ) {
              gsap.to(target, {
                y: isEntering
                  ? target.dataset.gsapHover === "card"
                    ? -4
                    : -2
                  : 0,
                scale: isEntering
                  ? target.dataset.gsapHover === "image"
                    ? 1.04
                    : 1.015
                  : 1,
                duration: isEntering ? 0.28 : 0.32,
                ease: "power2.out",
              });
            }

            target = target.parentElement;
          }
        };
        const onPointerOver = contextSafe((event: PointerEvent) => {
          animateHover(event, true);
        });
        const onPointerOut = contextSafe((event: PointerEvent) => {
          animateHover(event, false);
        });

        root.addEventListener("pointerover", onPointerOver);
        root.addEventListener("pointerout", onPointerOut);
        cleanups.push(() => {
          root.removeEventListener("pointerover", onPointerOver);
          root.removeEventListener("pointerout", onPointerOut);
        });

        return () => {
          cleanups.splice(0).forEach((cleanup) => cleanup());
        };
      });

      return () => {
        media.revert();
        cleanups.splice(0).forEach((cleanup) => cleanup());
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-home-animation-root>
      {children}
    </div>
  );
}
