"use client";

import { Utensils, Star, Clock, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Heropage() {
return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E232A]">
      {/* Sticky Glassmorphic Navbar */}
    

      {/* Hero Showcase Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col space-y-6 text-left">
              <div className="inline-flex items-center gap-2 self-start bg-[#D35400]/10 border border-[#D35400]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#D35400] tracking-wide uppercase">
                <Star className="w-3.5 h-3.5 fill-[#D35400]" />
                <span>Michelin Recommended 2026</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E232A] leading-[1.15]">
                A Culinary Harmony of <span className="text-[#D35400] underline decoration-[#E8E2D5] underline-offset-8">Saffron &amp; Herbs</span>
              </h1>

              <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed max-w-xl">
                Experience artisanal Mediterranean and Eastern-infused family dining crafted with organic herbs, hand-ground spices, and timeless passion in a luxury atmosphere.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#reserve"
                  className="inline-flex items-center justify-center bg-[#D35400] hover:bg-[#B94600] text-white rounded-full px-8 py-3.5 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Reserve Your Table
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center border border-[#E8E2D5] bg-white/60 hover:bg-white text-[#1E232A] hover:border-[#D35400] rounded-full px-8 py-3.5 text-base font-semibold transition-all duration-200"
                >
                  Explore Menu
                </a>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8E2D5]/80">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#1E232A]">4.9 / 5</span>
                  <span className="text-xs text-[#4A5568]">Over 2,400 Reviews</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#1E232A]">100%</span>
                  <span className="text-xs text-[#4A5568]">Organic Ingredients</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#1E232A]">30+</span>
                  <span className="text-xs text-[#4A5568]">Signature Dishes</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Banner */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D35400]/20 to-[#E8E2D5]/50 rounded-3xl blur-2xl -z-10" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full mx-auto mb-8 flex justify-center"
              >
                <motion.img
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  src="https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg"
                  alt="Saffron & Herbs Signature Dish"
                  className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] object-cover rounded-full shadow-[0_20px_50px_rgba(211,84,0,0.3)] border-[8px] border-white/90"
                />
              </motion.div>

              <div className="bg-white/80 backdrop-blur-sm border border-[#E8E2D5] rounded-3xl p-8 shadow-xl space-y-6 relative z-20">
                <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#D35400]/10 text-[#D35400]">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1E232A]">Chef&apos;s Tasting Experience</h3>
                      <p className="text-xs text-[#4A5568]">7-Course Seasonal Menu</p>
                    </div>
                  </div>
                  <span className="font-serif text-xl font-bold text-[#D35400]">$120</span>
                </div>

                <div className="space-y-3 text-sm text-[#4A5568]">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#D35400]" />
                    <span>Dinner Service: 5:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#D35400]" />
                    <span>452 Saffron Lane, Culinary District</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-[#D35400]" />
                    <span>Private Dining &amp; Family Vault Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

