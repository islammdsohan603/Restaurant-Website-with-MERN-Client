"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Space } from "./spacesDate";

type SpaceCardProps = {
  space: Space;
  index: number;
};

export default function SpaceCard({ space, index }: SpaceCardProps) {
  const reduceMotion = useReducedMotion();
  const ActionIcon = space.icon;

  return (
    <motion.article
      variants={{
        hidden: {
          opacity: 0,
          y: reduceMotion ? 0 : 45,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              transition: { duration: 0.3 },
            }
      }
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#201F1C] transition-colors duration-300 hover:border-[#B8955A]/40"
    >
      {/* Image */}
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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#11110F]/80 via-black/10 to-black/15 transition-opacity duration-500 group-hover:opacity-80" />

        {/* Image label */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2 sm:inset-x-4 sm:top-4">
          <span className="rounded-sm border border-white/15 bg-[#11110F]/65 px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#F1D49C] backdrop-blur-md">
            {space.eyebrow}
          </span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <ActionIcon size={15} />
          </span>
        </div>

        <span className="absolute bottom-3 left-4 text-[8px] uppercase tracking-[0.14em] text-white/65">
          EMBER & OLIVE · EXPERIENCES
        </span>
      </Link>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-xl leading-tight text-[#F2EEE7] transition-colors duration-300 group-hover:text-[#E5C38B] sm:text-[22px]">
          {space.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 text-[12px] leading-[1.8] text-[#AAA59B] sm:text-[13px]">
          {space.description}
        </p>

        <Link
          href={space.href}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[9px] font-medium uppercase tracking-[0.13em] text-[#D6B77D] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6B77D]"
        >
          {space.action}

          <ActionIcon
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}
