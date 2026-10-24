"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

type HomePageAnimationsProps = {
  children: ReactNode;
};

export default function HomePageAnimations({
  children,
}: HomePageAnimationsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const root = rootRef.current;

      if (!root || !contextSafe) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const heroEyebrow = root.querySelector<HTMLElement>(
          "[data-hero-eyebrow]",
        );
        const heroWords = root.querySelectorAll<HTMLElement>("[data-hero-word]");
        const waiting = root.querySelector<HTMLElement>("[data-hero-waiting]");
        const heroDetails =
          root.querySelectorAll<HTMLElement>("[data-hero-detail]");
        const heroVisual = root.querySelector<HTMLElement>("[data-hero-visual]");
        const heroImage = root.querySelector<HTMLElement>("[data-hero-image]");
        const dishCard = root.querySelector<HTMLElement>("[data-gsap-float]");

        const heroTimeline = gsap.timeline({ delay: 0.1 });

        if (heroEyebrow) {
          heroTimeline.from(heroEyebrow, {
            autoAlpha: 0,
            y: 18,
            duration: 0.55,
            ease: "power3.out",
          });
        }

        if (heroWords.length) {
          heroTimeline.from(
            heroWords,
            {
              autoAlpha: 0,
              yPercent: 110,
              duration: 0.8,
              stagger: 0.07,
              ease: "power3.out",
            },
            "-=0.15",
          );
        }

        if (waiting) {
          heroTimeline.from(
            waiting,
            {
              autoAlpha: 0,
              y: 36,
              duration: 0.75,
              ease: "power3.out",
            },
            ">+=0.12",
          );
        }

        if (heroDetails.length) {
          heroTimeline.from(
            heroDetails,
            {
              autoAlpha: 0,
              y: 18,
              duration: 0.55,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.2",
          );
        }

        if (heroVisual) {
          heroTimeline.from(
            heroVisual,
            {
              autoAlpha: 0,
              x: 36,
              duration: 0.9,
              ease: "power3.out",
            },
            0.2,
          );
        }

        if (heroImage) {
          gsap.from(heroImage, {
            scale: 1.12,
            duration: 1.4,
            ease: "power2.out",
            delay: 0.2,
          });
          gsap.to(heroImage, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: heroVisual,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
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

        root.querySelectorAll<HTMLElement>("[data-gsap-reveal]").forEach(
          (element) => {
            gsap.from(element, {
              autoAlpha: 0,
              y: 22,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 86%",
                once: true,
              },
            });
          },
        );

        root
          .querySelectorAll<HTMLElement>("[data-gsap-card-group]")
          .forEach((group) => {
            const cards =
              group.querySelectorAll<HTMLElement>("[data-gsap-card]");

            if (!cards.length) return;

            gsap.from(cards, {
              autoAlpha: 0,
              y: 26,
              duration: 0.65,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: group,
                start: "top 84%",
                once: true,
              },
            });
          });

        const philosophyImage = root.querySelector<HTMLElement>(
          "[data-philosophy-image]",
        );
        if (philosophyImage) {
          gsap.from(philosophyImage, {
            clipPath: "inset(0 100% 0 0)",
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: philosophyImage,
              start: "top 82%",
              once: true,
            },
          });
        }

        const quoteBorder = root.querySelector<HTMLElement>(
          "[data-philosophy-quote-border]",
        );
        if (quoteBorder) {
          gsap.from(quoteBorder, {
            scaleY: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteBorder,
              start: "top 86%",
              once: true,
            },
          });
        }

        root.querySelectorAll<HTMLElement>("[data-count-up]").forEach((el) => {
          const value = Number(el.dataset.countUp);
          if (!Number.isFinite(value)) return;

          const counter = { value };
          const suffix = el.dataset.countSuffix ?? "";

          gsap.from(counter, {
            value: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.value)}${suffix}`;
            },
          });
        });

        const onPointerOver = contextSafe((event: PointerEvent) => {
          const eventTarget =
            event.target instanceof Element ? event.target : null;
          const target = eventTarget?.closest<HTMLElement>("[data-gsap-hover]");
          const relatedTarget =
            event.relatedTarget instanceof Node ? event.relatedTarget : null;

          if (
            !target ||
            !root.contains(target) ||
            (relatedTarget && target.contains(relatedTarget))
          ) {
            return;
          }

          if (target.dataset.gsapHover === "space-action") {
            const arrow = target.querySelector("[data-space-arrow]");
            if (arrow) {
              gsap.to(arrow, {
                x: 4,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
            return;
          }

          gsap.to(target, {
            y: target.dataset.gsapHover === "card" ? -4 : -2,
            scale:
              target.dataset.gsapHover === "image"
                ? 1.06
                : target.dataset.gsapHover === "button"
                  ? target.hasAttribute("data-menu-add")
                    ? 1
                    : 1.015
                  : 1,
            duration: 0.28,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        const onPointerOut = contextSafe((event: PointerEvent) => {
          const eventTarget =
            event.target instanceof Element ? event.target : null;
          const target = eventTarget?.closest<HTMLElement>("[data-gsap-hover]");
          const relatedTarget =
            event.relatedTarget instanceof Node ? event.relatedTarget : null;

          if (
            !target ||
            !root.contains(target) ||
            (relatedTarget && target.contains(relatedTarget))
          ) {
            return;
          }

          if (target.dataset.gsapHover === "space-action") {
            const arrow = target.querySelector("[data-space-arrow]");
            if (arrow) {
              gsap.to(arrow, {
                x: 0,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
            return;
          }

          gsap.to(target, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        const onClick = contextSafe((event: MouseEvent) => {
          const eventTarget =
            event.target instanceof Element ? event.target : null;
          const button = eventTarget?.closest<HTMLElement>("[data-menu-add]");

          if (!button || !root.contains(button)) return;

          gsap.from(button, {
            scale: 0.96,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        root.addEventListener("pointerover", onPointerOver);
        root.addEventListener("pointerout", onPointerOut);
        root.addEventListener("click", onClick);

        return () => {
          root.removeEventListener("pointerover", onPointerOver);
          root.removeEventListener("pointerout", onPointerOut);
          root.removeEventListener("click", onClick);
        };
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} data-home-animation-root>
      {children}
    </div>
  );
}
