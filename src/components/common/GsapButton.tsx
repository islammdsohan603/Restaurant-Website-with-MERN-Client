"use client";

import { type ReactNode, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

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

  const handleEnter = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const fill = fillRef.current;
    const button = buttonRef.current;

    if (!fill || !button) return;

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
  };

  const handleLeave = () => {
    const fill = fillRef.current;
    const button = buttonRef.current;

    if (!fill || !button) return;

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
  };

  const primary = variant === "primary";

  return (
    <Link
      ref={buttonRef}
      href={href}
      aria-label={ariaLabel}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className={[
        "group relative isolate inline-flex min-h-[50px] items-center",
        "justify-center gap-3 overflow-hidden rounded-sm px-6 py-3",
        "text-xs font-semibold uppercase tracking-[0.08em]",
        "transition-colors duration-200",
        primary
          ? "bg-[#E96738] text-[#17120F] hover:text-[#F5F0E8]"
          : "border border-[#5B4B36] bg-transparent text-[#E8D6B8] hover:text-[#F5F0E8]",
        className,
      ].join(" ")}
    >
      <span
        ref={fillRef}
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0",
          primary ? "bg-[#11110F]" : "bg-[#11110F]",
        ].join(" ")}
      />

      <span className="relative z-10 inline-flex items-center justify-center gap-3">
        {children}
      </span>
    </Link>
  );
}
