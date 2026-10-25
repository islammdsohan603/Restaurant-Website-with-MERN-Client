"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiCalendar, FiClock, FiUsers } from "react-icons/fi";

// ---------------------------------------------
// Constants
// ---------------------------------------------

const GUEST_OPTIONS = ["1 Guest", "2 Guests", "4 Guests", "6+ Private"];

const SEATING_TIMES = ["18:00", "18:45", "19:30", "20:15", "21:00"];

const AMBIENCE_OPTIONS = [
  "Main Velvet Dining",
  "Chef's Table",
  "Private Dining",
  "Olive Garden Courtyard",
];

// ---------------------------------------------
// Animation Variants
// ---------------------------------------------

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

// ---------------------------------------------
// Helpers
// ---------------------------------------------

function getLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ---------------------------------------------
// Component
// ---------------------------------------------

export default function ReservationSection() {
  const prefersReducedMotion = useReducedMotion();

  const [isMounted, setIsMounted] = useState(false);
  const [minDate, setMinDate] = useState("");

  const [selectedGuest, setSelectedGuest] = useState("2 Guests");
  const [selectedTime, setSelectedTime] = useState("19:30");
  const [ambience, setAmbience] = useState("Main Velvet Dining");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  // ---------------------------------------------
  // Hydration-safe initialization
  // ---------------------------------------------

  useEffect(() => {
    setIsMounted(true);
    setMinDate(getLocalDateString(new Date()));
  }, []);

  // Enable animations only after hydration.
  const enableMotion = isMounted && !prefersReducedMotion;

  const revealProps = enableMotion
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: {
          once: true,
          amount: 0.15,
        },
        variants: containerVariants,
      }
    : {
        initial: false as const,
      };

  // ---------------------------------------------
  // Form Submission
  // ---------------------------------------------

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const reservationDetails = {
      guests: selectedGuest,
      date,
      ambience,
      time: selectedTime,
      notes: notes.trim(),
    };

    // TODO: Connect your reservation API here.
    console.log("Reservation Details:", reservationDetails);
  };

  // ---------------------------------------------
  // Render
  // ---------------------------------------------

  return (
    <section
      id="reservations"
      className="relative overflow-hidden bg-[#11110F] px-5 py-20 text-[#F5F0E8] sm:px-8 lg:px-10 lg:py-28 xl:px-16"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-stretch gap-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-8 xl:gap-10">
        {/* -------------------------------------
            Restaurant Image
        ------------------------------------- */}

        <motion.div
          {...revealProps}
          className="relative isolate min-h-[460px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[520px] lg:min-h-[600px]"
        >
          {/* Image */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={enableMotion ? { scale: 1.08 } : false}
            whileInView={enableMotion ? { scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            <Image
              src="/images/resturant.jpg"
              alt="Elegant candlelit restaurant interior"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Image Overlay */}
          <div className="absolute inset-0 z-10 bg-linear-to-t from-[#11110F] via-[#11110F]/30 to-black/10" />

          {/* Image Content */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-7 sm:p-9 lg:p-10">
            <motion.div variants={itemVariants}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D0B477]">
                Mayfair Townhouse
              </span>

              <h2 className="mt-3 font-serif text-3xl leading-tight text-[#F5F0E8] sm:text-4xl xl:text-5xl">
                Your Table Is Waiting.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
                Reservations are unlocked 30 days in advance. Private banquet
                spaces open upon request.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* -------------------------------------
            Reservation Form
        ------------------------------------- */}

        <motion.div
          {...revealProps}
          className="rounded-2xl border border-white/[0.08] bg-[#1C1C19] p-5 sm:p-7 lg:p-8 xl:p-9"
        >
          <form onSubmit={handleSubmit}>
            {/* Form Header */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-6"
            >
              <div>
                <h2 className="font-serif text-2xl text-[#F5F0E8] sm:text-3xl">
                  Book Your Table
                </h2>

                <p className="mt-1 text-xs text-[#B7B1A7]">
                  Instant confirmation with dietary bespoke preferences.
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.07] px-3 py-1 text-[9px] font-medium uppercase tracking-wider text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live Availability
              </span>
            </motion.div>

            {/* Guest Selection */}
            <motion.div variants={itemVariants} className="mt-6">
              <label className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-[#C7BFB5]">
                <FiUsers size={13} />
                Guests
              </label>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {GUEST_OPTIONS.map((guest) => {
                  const isSelected = selectedGuest === guest;

                  return (
                    <button
                      key={guest}
                      type="button"
                      onClick={() => setSelectedGuest(guest)}
                      aria-pressed={isSelected}
                      className={`min-h-10 rounded-lg border px-2 text-xs transition-all duration-300 ${
                        isSelected
                          ? "border-[#F15B2A] bg-[#F15B2A] text-[#11110F]"
                          : "border-white/[0.08] bg-white/[0.04] text-[#D6D0C7] hover:border-[#B8955A]/60"
                      }`}
                    >
                      {guest}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Date & Ambience */}
            <motion.div
              variants={itemVariants}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="reservation-date"
                  className="mb-3 block text-[10px] font-medium uppercase tracking-wider text-[#C7BFB5]"
                >
                  Date
                </label>

                <div className="relative">
                  <input
                    id="reservation-date"
                    name="date"
                    type="date"
                    required
                    value={date}
                    min={minDate || undefined}
                    onChange={(event) => setDate(event.target.value)}
                    className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 pr-10 text-sm text-[#F5F0E8] outline-none transition-colors focus:border-[#B8955A] [color-scheme:dark]"
                  />

                  <FiCalendar
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#D0B477]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="reservation-ambience"
                  className="mb-3 block text-[10px] font-medium uppercase tracking-wider text-[#C7BFB5]"
                >
                  Preferred Ambience
                </label>

                <select
                  id="reservation-ambience"
                  name="ambience"
                  value={ambience}
                  onChange={(event) => setAmbience(event.target.value)}
                  className="h-11 w-full rounded-lg border border-white/[0.08] bg-[#242421] px-3 text-sm text-[#F5F0E8] outline-none transition-colors focus:border-[#B8955A]"
                >
                  {AMBIENCE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Seating Time */}
            <motion.div variants={itemVariants} className="mt-6">
              <label className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-[#C7BFB5]">
                <FiClock size={13} />
                Select Dinner Seating
              </label>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {SEATING_TIMES.map((time) => {
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      aria-pressed={isSelected}
                      className={`min-h-10 rounded-lg border text-xs transition-all duration-300 ${
                        isSelected
                          ? "border-[#E7C58A] bg-[#E7C58A] font-semibold text-[#11110F]"
                          : "border-white/[0.08] bg-white/[0.03] text-[#D6D0C7] hover:border-[#B8955A]/60"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Special Notes */}
            <motion.div variants={itemVariants} className="mt-6">
              <label
                htmlFor="reservation-notes"
                className="mb-3 block text-[10px] font-medium uppercase tracking-wider text-[#C7BFB5]"
              >
                Special Notes & Dietary Guidance (Optional)
              </label>

              <textarea
                id="reservation-notes"
                name="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={2}
                maxLength={500}
                placeholder="Allergies, anniversary, sommelier consultation..."
                className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-sm text-[#F5F0E8] outline-none transition-colors placeholder:text-white/35 focus:border-[#B8955A]"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col items-start justify-between gap-5 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center"
            >
              <p className="text-[10px] leading-5 tracking-wide text-[#A9A297]">
                No booking fee · Cancellation up to 24h
              </p>

              <button
                type="submit"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#F15B2A] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#11110F] shadow-[0_8px_24px_rgba(241,91,42,0.15)] transition-all duration-300 hover:bg-[#FF7040] hover:shadow-[0_10px_30px_rgba(241,91,42,0.25)] sm:w-auto"
              >
                Confirm Reservation
                <FiArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
