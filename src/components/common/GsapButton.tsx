"use client";

import { type ReactNode, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type GsapButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  ariaLabel?: string;
};

export default function GsapButton({
  href,
  children,
  variant = "primary",
  className = "",
  ariaLabel,
}: GsapButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const button = buttonRef.current;
      const fill = fillRef.current;

      if (!button || !fill) return;
      if (!contextSafe) {
        console.error("GSAP context-safe button handlers are unavailable.");
        return;
      }

      gsap.set(fill, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const handleEnter = contextSafe(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }

        gsap.killTweensOf([fill, button]);
        gsap.to(fill, {
          scaleX: 1,
          duration: 0.45,
          ease: "power3.inOut",
          overwrite: true,
        });
        gsap.to(button, {
          y: -2,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        });
      });

      const handleLeave = contextSafe(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return;
        }

        gsap.killTweensOf([fill, button]);
        gsap.to(fill, {
          scaleX: 0,
          duration: 0.35,
          ease: "power3.inOut",
          overwrite: true,
        });
        gsap.to(button, {
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        });
      });

      button.addEventListener("pointerenter", handleEnter);
      button.addEventListener("pointerleave", handleLeave);
      button.addEventListener("focus", handleEnter);
      button.addEventListener("blur", handleLeave);

      return () => {
        button.removeEventListener("pointerenter", handleEnter);
        button.removeEventListener("pointerleave", handleLeave);
        button.removeEventListener("focus", handleEnter);
        button.removeEventListener("blur", handleLeave);
      };
    },
    { scope: buttonRef },
  );

  const primary = variant === "primary";

  return (
    <Link
      ref={buttonRef}
      href={href}
      aria-label={ariaLabel}
      className={[
        "group relative isolate inline-flex min-h-[50px] items-center",
        "justify-center gap-3 overflow-hidden rounded-sm px-6 py-3",
        "text-xs font-semibold uppercase tracking-[0.08em]",
        "transition-colors duration-200 motion-reduce:transition-none",
        primary
          ? "bg-[#E96738] text-[#17120F] hover:text-[#F5F0E8] focus-visible:text-[#F5F0E8]"
          : "border border-[#5B4B36] bg-transparent text-[#E8D6B8] hover:text-[#F5F0E8] focus-visible:text-[#F5F0E8]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7B77D]",
        className,
      ].join(" ")}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        className={[
          "pointer-events-none absolute inset-0 z-0",
          "bg-[#11110F]",
        ].join(" ")}
      />

      <span className="relative z-10 inline-flex items-center justify-center gap-3">
        {children}
      </span>
    </Link>
  );
}
