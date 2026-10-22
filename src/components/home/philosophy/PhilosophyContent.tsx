import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { philosophyStats } from "../../db/PhilosophyData";
import { philosophyContent } from "../../db/PhilosophyData";

export default function PhilosophyContent() {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#D6B77D] sm:text-[10px]">
        {philosophyContent.eyebrow}
      </p>

      <h2
        id="philosophy-heading"
        className="mt-3 font-serif text-3xl leading-[1.12] tracking-[-0.04em] text-[#F5F0E8] sm:text-4xl lg:text-[38px] xl:text-[42px]"
      >
        {philosophyContent.title}

        <span className="mt-1 block italic text-[#D6B77D]">
          {philosophyContent.highlightedTitle}
        </span>
      </h2>

      <blockquote className="mt-5 border-l border-[#B8955A] pl-4 sm:mt-6 sm:pl-5">
        <p className="max-w-[450px] font-serif text-sm italic leading-7 text-[#D1C9BC] sm:text-base sm:leading-7">
          &ldquo;{philosophyContent.quote}&rdquo;
        </p>

        <footer className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] uppercase tracking-[0.1em] sm:text-[9px]">
          <span className="font-semibold text-[#D6B77D]">
            {philosophyContent.chef}
          </span>

          <span aria-hidden="true" className="text-[#746B5C]">
            —
          </span>

          <span className="text-[#AAA397]">{philosophyContent.role}</span>
        </footer>
      </blockquote>

      <div className="mt-6 sm:mt-7">
        <philosophyStats />
      </div>

      <Link
        href={philosophyContent.storyHref}
        className="group mt-6 inline-flex w-fit items-center gap-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#E7E0D4] transition-colors hover:text-[#D6B77D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D6B77D]"
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
