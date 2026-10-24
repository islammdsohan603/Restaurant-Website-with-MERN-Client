"use client";

import FooterAnimations from "./FooterAnimations";
import FooterBrand from "./FooterBrand";
import FooterLinkColumn from "./FooterLinkColumn";
import FooterLocation from "./FooterLocation";
import FooterNewsletter from "./FooterNewsletter";
import FooterSocials from "./FooterSocials";

const experienceLinks = [
  { label: "Menu Tasting", href: "/menu" },
  { label: "Chef's Table", href: "/experiences" },
  { label: "Private Dining", href: "/experiences" },
  { label: "Seasonal Pairings", href: "/menu" },
  { label: "Wine Cellar", href: "/experiences" },
];

const hospitalityLinks = [
  { label: "Table Reservations", href: "/reservations" },
  { label: "Private Events", href: "/experiences" },
  { label: "Gift Experiences", href: "/experiences" },
  { label: "Dietary Guide", href: "/menu" },
  { label: "Press & Accolades", href: "/our-story" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-x border-t border-white/10 bg-[#11110F] text-[#F5F0E8]">
      <FooterAnimations>
        <div className="mx-auto max-w-[1440px] px-5 pb-7 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24 xl:px-16">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.2fr] lg:gap-10 xl:gap-16">
            {/* Brand */}
            <div data-footer-item>
              <FooterBrand />

              <div className="mt-7">
                <FooterSocials />
              </div>
            </div>

            {/* Experience */}
            <div data-footer-item>
              <FooterLinkColumn title="Experience" links={experienceLinks} />
            </div>

            {/* Hospitality */}
            <div data-footer-item>
              <FooterLinkColumn title="Hospitality" links={hospitalityLinks} />
            </div>

            {/* Location & Newsletter */}
            <div data-footer-item className="space-y-8">
              <FooterLocation />
              <FooterNewsletter />
            </div>
          </div>

          {/* Copyright */}
          <div
            data-footer-item
            className="mt-16 border-t border-white/10 pt-6 sm:mt-20"
          >
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                © 2026 EMBER & OLIVE. ALL RIGHTS RESERVED.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-5 text-[10px] uppercase tracking-[0.14em] text-white/50">
                <span>Gastronomy & Hearth</span>

                <span className="hidden h-1 w-1 rounded-full bg-[#B8955A] sm:block" />

                <span>Thoughtfully Crafted</span>
              </div>
            </div>
          </div>
        </div>
      </FooterAnimations>
    </footer>
  );
}
