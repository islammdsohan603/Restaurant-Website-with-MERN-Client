import Navbar from "../components/common/Navbar";
import { Utensils, Star, Clock, MapPin, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1E232A]">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

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
              <div className="bg-white/80 backdrop-blur-sm border border-[#E8E2D5] rounded-3xl p-8 shadow-xl space-y-6">
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

        {/* Scroll Demo Sections */}
        <section id="menu" className="py-20 bg-white/50 border-t border-[#E8E2D5] px-4 max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1E232A]">Our Signature Menu</h2>
          <p className="text-[#4A5568] max-w-lg mx-auto mt-2">Crafted with handpicked saffron and fresh garden sage.</p>
        </section>

        <section id="combos" className="py-20 px-4 max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1E232A]">Special Family Combos</h2>
          <p className="text-[#4A5568] max-w-lg mx-auto mt-2">Curated feast platters designed for family celebrations.</p>
        </section>

        <section id="reserve" className="py-20 bg-[#1E232A] text-white px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white">Reserve Your Dining Experience</h2>
          <p className="text-slate-300 max-w-lg mx-auto mt-2">Book early to secure window and terrace seating.</p>
        </section>

        <section id="about" className="py-20 px-4 max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold text-[#1E232A]">About Saffron &amp; Sage</h2>
          <p className="text-[#4A5568] max-w-lg mx-auto mt-2">Three generations of culinary heritage.</p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E8E2D5] py-8 text-center text-xs text-[#4A5568]">
        &copy; {new Date().getFullYear()} Saffron &amp; Sage. All rights reserved.
      </footer>
    </div>
  );
}

