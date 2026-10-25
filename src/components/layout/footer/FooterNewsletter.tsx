"use client";

import type { FormEvent } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function FooterNewsletter() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Connect your newsletter API here.
  };

  return (
    <div>
      <label
        htmlFor="footer-email"
        className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F5F0E8]"
      >
        Curated Culinary Dispatch
      </label>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 min-[420px]:flex-row"
      >
        <input
          id="footer-email"
          type="email"
          name="email"
          placeholder="Your email address"
          autoComplete="email"
          required
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#F5F0E8] outline-none transition-colors placeholder:text-white/40 focus:border-[#B8955A]"
        />

        <button
          type="submit"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#B8955A] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#11110F] transition-colors duration-300 hover:bg-[#D0B477]"
        >
          Subscribe
          <FiArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </form>
    </div>
  );
}
