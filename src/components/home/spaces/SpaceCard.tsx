"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { Space } from "./SpaceDate";

type SpaceCardProps = {
  space: Space;
  index: number;
};

export default function SpaceCard({ space, index }: SpaceCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const ActionIcon = space.icon ?? FiArrowUpRight;

  useEffect(() => {
    const card = cardRef.current;

    if (!card) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      card.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.classList.add("is-visible");
          observer.unobserve(card);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="space-card-reveal group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#201F1C] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#B8955A]/40"
      style={
        {
          "--card-delay": `${index * 120}ms`,
        } as CSSProperties
      }
    >
      <Link
        href={space.href}
        aria-label={`Explore ${space.title}`}
        className="relative block aspect-[1.22/1] overflow-hidden bg-[#29251F]"
      >
        <Image
          src={space.image}
          alt={space.imageAlt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#11110F]/80 via-black/10 to-transparent"
        />

        <span className="absolute left-3 top-3 border border-white/15 bg-[#11110F]/75 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-[#F1D49C] backdrop-blur-md sm:left-4 sm:top-4">
          {space.eyebrow}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-xl leading-tight text-[#F2EEE7] transition-colors group-hover:text-[#E5C38B] sm:text-[22px]">
          {space.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 text-xs leading-[1.8] text-[#AAA59B] sm:text-[13px]">
          {space.description}
        </p>

        <Link
          href={space.href}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[10px] font-medium uppercase tracking-[0.13em] text-[#D6B77D] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6B77D]"
        >
          {space.action}

          <ActionIcon
            size={14}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
