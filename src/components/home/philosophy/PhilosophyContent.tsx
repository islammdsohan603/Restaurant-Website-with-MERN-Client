
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { philosophyContent } from "../../db/PhilosophyData";
import PhilosophyStats from "./PhilosophyStatus";

export default function PhilosophyContent() {
  return (
    <div className="flex w-full min-w-0 flex-col justify-center lg:py-2">
      <p className="text-xl font-semibold uppercase tracking-[0.25em] text-[#D6B77D]">
        {philosophyContent.eyebrow}
      </p>

      <h2
        id="philosophy-heading"
        className="mt-3 font-serif text-3xl leading-[1.12] tracking-[-0.04em] text-[#F5F0E8] sm:text-4xl lg:text-[clamp(2rem,2.7vw,2.75rem)] xl:text-[42px]"
      >
        {philosophyContent.title}

        <span className="mt-1 block italic text-[#D6B77D]">
          {philosophyContent.highlightedTitle}
        </span>
      </h2>

      {/* Chef's Philosophy Quote */}
      <blockquote className="relative mt-5 pl-4 sm:mt-6 sm:pl-5">
        <span
          aria-hidden="true"
          data-philosophy-quote-border
          className="absolute inset-y-0 left-0 w-px origin-top bg-[#B8955A]"
        />

        <p className="max-w-[520px] font-serif text-lg italic leading-7 text-[#D1C9BC] sm:text-base">
          &ldquo;{philosophyContent.quote}&rdquo;
        </p>

        <footer className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.1em]">
          <span className="font-semibold text-[#D6B77D]">
            {philosophyContent.chef}
          </span>

          <span aria-hidden="true" className="text-[#746B5C]">
            —
          </span>

          <span className="text-[#AAA397]">
            {philosophyContent.role}
          </span>
        </footer>
      </blockquote>

      {/* Statistics */}
      <div className="mt-6 sm:mt-7">
        <PhilosophyStats />
      </div>

      {/* Story link */}
      <Link
        href={philosophyContent.storyHref}
        data-gsap-hover="button"
        className="group mt-6 inline-flex w-fit items-center gap-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#E7E0D4] transition-colors duration-300 hover:text-[#D6B77D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6B77D]"
      >
        Read Our Full Story

        <FiArrowRight
          size={15}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
