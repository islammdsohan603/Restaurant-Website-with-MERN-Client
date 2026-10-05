"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiInfo,
  FiCheckCircle,
  FiMinus,
  FiPlus,
  FiChevronDown,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { LuArmchair, LuSparkles } from "react-icons/lu";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface ReservationDetails {
  date: string;
  timeSlot: string;
  guests: number;
  seating: string;
  confirmationCode?: string;
}

export interface ReservationSectionProps {
  className?: string;
  id?: string;
  onReserve?: (details: ReservationDetails) => void;
}

interface DropdownOption {
  id: string;
  label: string;
  sublabel?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIME_SLOTS: DropdownOption[] = [
  { id: "12:00-lunch", label: "12:00 PM - Lunch", sublabel: "Afternoon Dining" },
  { id: "12:30-lunch", label: "12:30 PM - Lunch", sublabel: "Afternoon Dining" },
  { id: "01:00-lunch", label: "01:00 PM - Lunch", sublabel: "Afternoon Dining" },
  { id: "01:30-lunch", label: "01:30 PM - Lunch", sublabel: "Afternoon Dining" },
  { id: "02:00-lunch", label: "02:00 PM - Lunch", sublabel: "Late Lunch" },
  { id: "06:00-dinner", label: "06:00 PM - Dinner", sublabel: "Early Evening" },
  { id: "06:30-dinner", label: "06:30 PM - Dinner", sublabel: "Evening Dining" },
  { id: "07:00-dinner", label: "07:00 PM - Dinner", sublabel: "Prime Dinner" },
  { id: "07:30-dinner", label: "07:30 PM - Dinner", sublabel: "Prime Dinner" },
  { id: "08:00-dinner", label: "08:00 PM - Dinner", sublabel: "Evening Dining" },
  { id: "08:30-dinner", label: "08:30 PM - Dinner", sublabel: "Late Evening" },
  { id: "09:00-dinner", label: "09:00 PM - Dinner", sublabel: "Late Evening" },
];

const SEATING_OPTIONS: DropdownOption[] = [
  { id: "indoor", label: "Indoor Dining Room", sublabel: "Intimate climate-controlled ambiance" },
  { id: "terrace", label: "Outdoor Terrace", sublabel: "Open-air dining with garden views" },
  { id: "rooftop", label: "Rooftop Garden", sublabel: "Panoramic skyline views & soft lights" },
  { id: "chef-counter", label: "Chef's Counter", sublabel: "Front-row culinary preparation" },
  { id: "private-suite", label: "Private Dining Suite", sublabel: "Exclusive luxury room for gatherings" },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReservationSection({
  className = "",
  id = "reserve",
  onReserve,
}: ReservationSectionProps) {
  // Tomorrow's date formatted as default
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const [date, setDate] = useState<string>(getDefaultDate());
  const [timeSlot, setTimeSlot] = useState<string>("12:00 PM - Lunch");
  const [guests, setGuests] = useState<number>(2);
  const [seating, setSeating] = useState<string>("Indoor Dining Room");

  // Dropdown states
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isSeatingOpen, setIsSeatingOpen] = useState(false);

  // Submission / Confirmation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationDetails | null>(null);

  // Refs for closing dropdowns when clicking outside
  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const seatingDropdownRef = useRef<HTMLDivElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const minDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timeDropdownRef.current &&
        !timeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTimeOpen(false);
      }
      if (
        seatingDropdownRef.current &&
        !seatingDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSeatingOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Guest counters (1 - 12)
  const handleDecrement = () => {
    setGuests((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setGuests((prev) => (prev < 12 ? prev + 1 : 12));
  };

  // Submit handler
  const handleConfirmReservation = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const code = `SS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const details: ReservationDetails = {
        date,
        timeSlot,
        guests,
        seating,
        confirmationCode: code,
      };

      setConfirmedBooking(details);
      setIsSubmitting(false);

      if (onReserve) {
        onReserve(details);
      }
    }, 600);
  };

  // Format date display (e.g., Oct 24, 2026)
  const formatDisplayDate = (isoString: string) => {
    if (!isoString) return "Select Date";
    try {
      const [year, month, day] = isoString.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  return (
    <section
      id={id}
      className={`py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
    >
      {/* Outer Card with rounded-3xl, matching site's cream background and border */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#E8E2D5] shadow-2xl shadow-[#1E232A]/5 p-6 sm:p-12 lg:p-16 transition-all duration-300"
      >
        {/* Subtle Decorative Ambient Saffron Glows */}
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-72 h-72 bg-[#D35400]/5 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#D35400]/5 rounded-full blur-3xl pointer-events-none"
        />

        {/* ─── Header Section ──────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Small Uppercase Subtitle in Saffron Terracotta */}
          <span className="inline-block text-[#D35400] font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3">
            SECURE YOUR TABLE
          </span>

          {/* Main Title in Elegant Serif Matching Site Theme */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E232A] leading-tight mb-4">
            Effortless Reservation
          </h2>

          {/* Description */}
          <p className="text-[#4A5568] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Book your dining experience in four simple steps. We cater to families, romantic
            evenings, and group celebrations.
          </p>
        </motion.div>

        {/* ─── Interactive Booking Bar (Harmonious Warm Cream Container) ──── */}
        <motion.div
          variants={itemVariants}
          className="relative bg-[#F7F4EE] rounded-2xl sm:rounded-3xl border border-[#E8E2D5] p-4 sm:p-6 lg:p-8"
        >
          {/* 4 Interactive Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6">
            {/* Input 1: Date Picker */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="reservation-date"
                className="text-xs font-semibold text-[#1E232A] flex items-center gap-1.5"
              >
                <FiCalendar className="w-3.5 h-3.5 text-[#D35400]" />
                <span>Date</span>
              </label>
              <div
                onClick={() => dateInputRef.current?.showPicker?.()}
                className="relative flex items-center bg-white rounded-xl sm:rounded-2xl border border-[#E8E2D5] px-3.5 py-2.5 sm:py-3 shadow-xs hover:border-[#D35400]/60 focus-within:border-[#D35400] focus-within:ring-2 focus-within:ring-[#D35400]/20 transition-all cursor-pointer group"
              >
                <span className="text-sm font-medium text-[#1E232A] flex-1 truncate">
                  {formatDisplayDate(date)}
                </span>
                <input
                  ref={dateInputRef}
                  id="reservation-date"
                  type="date"
                  value={date}
                  min={minDate}
                  onChange={(e) => setDate(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                  aria-label="Reservation Date"
                />
                <FiCalendar className="w-4 h-4 text-[#4A5568] group-hover:text-[#D35400] transition-colors shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Input 2: Time Slot Selector */}
            <div ref={timeDropdownRef} className="flex flex-col gap-1.5 relative">
              <label
                id="timeslot-label"
                className="text-xs font-semibold text-[#1E232A] flex items-center gap-1.5"
              >
                <FiClock className="w-3.5 h-3.5 text-[#D35400]" />
                <span>Time Slot</span>
              </label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isTimeOpen}
                aria-labelledby="timeslot-label"
                onClick={() => {
                  setIsTimeOpen((prev) => !prev);
                  setIsSeatingOpen(false);
                }}
                className="flex items-center justify-between bg-white rounded-xl sm:rounded-2xl border border-[#E8E2D5] px-3.5 py-2.5 sm:py-3 shadow-xs hover:border-[#D35400]/60 focus:outline-none focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 transition-all text-left group cursor-pointer"
              >
                <span className="text-sm font-medium text-[#1E232A] truncate">{timeSlot}</span>
                <FiChevronDown
                  className={`w-4 h-4 text-[#4A5568] group-hover:text-[#D35400] transition-transform duration-200 shrink-0 ml-1.5 ${
                    isTimeOpen ? "rotate-180 text-[#D35400]" : ""
                  }`}
                />
              </button>

              {/* Time Dropdown Menu */}
              <AnimatePresence>
                {isTimeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 mt-2 z-30 bg-white rounded-xl sm:rounded-2xl border border-[#E8E2D5] shadow-xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-[#E8E2D5]/60"
                    role="listbox"
                  >
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = timeSlot === slot.label;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setTimeSlot(slot.label);
                            setIsTimeOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#D35400]/10 text-[#D35400] font-semibold"
                              : "text-[#1E232A] hover:bg-[#FDFBF7]"
                          }`}
                        >
                          <div>
                            <p className="leading-snug">{slot.label}</p>
                            {slot.sublabel && (
                              <p className="text-[10px] text-[#4A5568] mt-0.5">{slot.sublabel}</p>
                            )}
                          </div>
                          {isSelected && <FiCheck className="w-3.5 h-3.5 text-[#D35400] shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input 3: Guests Counter (1-12) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#1E232A] flex items-center gap-1.5">
                <FiUsers className="w-3.5 h-3.5 text-[#D35400]" />
                <span>Guests (1-12)</span>
              </label>

              <div className="flex items-center justify-between bg-white rounded-xl sm:rounded-2xl border border-[#E8E2D5] p-1 sm:p-1.5 shadow-xs">
                {/* Decrement Button */}
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={guests <= 1}
                  aria-label="Decrease guest count"
                  className="w-8 h-8 rounded-lg sm:rounded-xl bg-[#E8E2D5]/40 hover:bg-[#E8E2D5] active:scale-95 disabled:opacity-30 disabled:hover:bg-[#E8E2D5]/40 text-[#1E232A] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  <FiMinus className="w-3.5 h-3.5" />
                </button>

                {/* Counter Number with Smooth Micro-transition */}
                <div className="px-2 text-center min-w-[5rem]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={guests}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="inline-block font-semibold text-sm text-[#1E232A]"
                    >
                      {guests} {guests === 1 ? "Guest" : "Guests"}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Increment Button */}
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={guests >= 12}
                  aria-label="Increase guest count"
                  className="w-8 h-8 rounded-lg sm:rounded-xl bg-[#E8E2D5]/40 hover:bg-[#E8E2D5] active:scale-95 disabled:opacity-30 disabled:hover:bg-[#E8E2D5]/40 text-[#1E232A] flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Input 4: Seating Preference Selector */}
            <div ref={seatingDropdownRef} className="flex flex-col gap-1.5 relative">
              <label
                id="seating-label"
                className="text-xs font-semibold text-[#1E232A] flex items-center gap-1.5"
              >
                <LuArmchair className="w-3.5 h-3.5 text-[#D35400]" />
                <span>Seating Preference</span>
              </label>

              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isSeatingOpen}
                aria-labelledby="seating-label"
                onClick={() => {
                  setIsSeatingOpen((prev) => !prev);
                  setIsTimeOpen(false);
                }}
                className="flex items-center justify-between bg-white rounded-xl sm:rounded-2xl border border-[#E8E2D5] px-3.5 py-2.5 sm:py-3 shadow-xs hover:border-[#D35400]/60 focus:outline-none focus:border-[#D35400] focus:ring-2 focus:ring-[#D35400]/20 transition-all text-left group cursor-pointer"
              >
                <span className="text-sm font-medium text-[#1E232A] truncate">{seating}</span>
                <FiChevronDown
                  className={`w-4 h-4 text-[#4A5568] group-hover:text-[#D35400] transition-transform duration-200 shrink-0 ml-1.5 ${
                    isSeatingOpen ? "rotate-180 text-[#D35400]" : ""
                  }`}
                />
              </button>

              {/* Seating Dropdown Menu */}
              <AnimatePresence>
                {isSeatingOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-0 right-0 mt-2 z-30 bg-white rounded-xl sm:rounded-2xl border border-[#E8E2D5] shadow-xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-[#E8E2D5]/60"
                    role="listbox"
                  >
                    {SEATING_OPTIONS.map((opt) => {
                      const isSelected = seating === opt.label;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setSeating(opt.label);
                            setIsSeatingOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#D35400]/10 text-[#D35400] font-semibold"
                              : "text-[#1E232A] hover:bg-[#FDFBF7]"
                          }`}
                        >
                          <div>
                            <p className="leading-snug">{opt.label}</p>
                            {opt.sublabel && (
                              <p className="text-[10px] text-[#4A5568] mt-0.5">{opt.sublabel}</p>
                            )}
                          </div>
                          {isSelected && <FiCheck className="w-3.5 h-3.5 text-[#D35400] shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─── Bottom Info & CTA Row ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            {/* Left: Info Text in Project Muted Color */}
            <div className="flex items-center gap-2 text-[#4A5568] text-xs sm:text-sm">
              <FiInfo className="w-4 h-4 text-[#D35400] shrink-0" />
              <span>No cancellation fees. Instant SMS &amp; email confirmation sent.</span>
            </div>

            {/* Right: Primary CTA Button in Signature Saffron Terracotta */}
            <motion.button
              type="button"
              onClick={handleConfirmReservation}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D35400] hover:bg-[#B94600] text-white px-8 py-3.5 rounded-full sm:rounded-2xl font-semibold text-sm sm:text-base shadow-lg shadow-[#D35400]/25 hover:shadow-xl hover:shadow-[#D35400]/30 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Reserving Table...</span>
                </>
              ) : (
                <>
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Confirm Reservation</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Success Confirmation Modal ─────────────────────────────────────── */}
      <AnimatePresence>
        {confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E232A]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E2D5] overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="absolute top-5 right-5 text-[#4A5568] hover:text-[#1E232A] p-1.5 rounded-full hover:bg-[#E8E2D5]/50 transition-colors cursor-pointer"
                aria-label="Close confirmation"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Success Badge */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#D35400]/10 text-[#D35400] flex items-center justify-center shrink-0 border border-[#D35400]/20">
                  <LuSparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D35400] font-semibold">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1E232A]">
                    We&apos;re Expecting You!
                  </h3>
                </div>
              </div>

              <p className="text-[#4A5568] text-sm mb-6 leading-relaxed">
                Your luxury dining reservation has been successfully booked at Saffron &amp; Sage.
                A confirmation has been sent to your email and phone.
              </p>

              {/* Reservation Summary Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E2D5] mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#4A5568] flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5 text-[#D35400]" /> Date
                  </span>
                  <span className="font-semibold text-[#1E232A]">
                    {formatDisplayDate(confirmedBooking.date)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#4A5568] flex items-center gap-1.5">
                    <FiClock className="w-3.5 h-3.5 text-[#D35400]" /> Time Slot
                  </span>
                  <span className="font-semibold text-[#1E232A]">{confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#4A5568] flex items-center gap-1.5">
                    <FiUsers className="w-3.5 h-3.5 text-[#D35400]" /> Guests
                  </span>
                  <span className="font-semibold text-[#1E232A]">
                    {confirmedBooking.guests} {confirmedBooking.guests === 1 ? "Guest" : "Guests"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#4A5568] flex items-center gap-1.5">
                    <LuArmchair className="w-3.5 h-3.5 text-[#D35400]" /> Seating
                  </span>
                  <span className="font-semibold text-[#1E232A]">{confirmedBooking.seating}</span>
                </div>

                {confirmedBooking.confirmationCode && (
                  <div className="pt-2 border-t border-[#E8E2D5] flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-[#4A5568] font-medium">Confirmation Code</span>
                    <span className="font-mono font-bold tracking-wider text-[#D35400]">
                      {confirmedBooking.confirmationCode}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmedBooking(null)}
                  className="w-full bg-[#D35400] hover:bg-[#B94600] text-white py-3.5 px-6 rounded-xl font-semibold text-sm shadow-md shadow-[#D35400]/20 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
