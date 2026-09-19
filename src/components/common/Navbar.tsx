'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Phone, User, Menu, X, ChevronRight, Calendar } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Our Menu', href: '#menu' },
  { name: 'Special Combos', href: '#combos' },
  { name: 'Reserve a Table', href: '#reserve' },
  { name: 'About Us', href: '#about' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string>('Our Menu');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Handle scroll detection for dynamic shadow/glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key press to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8E2D5] transition-all duration-300 ${
        isScrolled ? 'shadow-md py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* 1. Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400] rounded-lg p-1 transition-transform active:scale-[0.98]"
            aria-label="Saffron & Sage Homepage"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#D35400]/10 text-[#D35400] group-hover:bg-[#D35400] group-hover:text-white transition-colors duration-300">
              <Leaf className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold tracking-wider text-[#1E232A] uppercase leading-none">
                Saffron <span className="text-[#D35400] font-normal">&amp;</span> Sage
              </span>
              <span className="text-[10px] tracking-[0.2em] font-sans text-[#4A5568] uppercase font-medium mt-0.5">
                Luxury Family Dining
              </span>
            </div>
          </Link>

          {/* 2. Center Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-1 bg-[#E8E2D5]/30 p-1.5 rounded-full border border-[#E8E2D5]/60"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400] ${
                    isActive
                      ? 'bg-[#D35400] text-white shadow-sm hover:bg-[#B94600]'
                      : 'text-[#1E232A] hover:text-[#D35400] hover:bg-[#E8E2D5]/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* 3. Right Action Items (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Direct Phone Contact */}
            <a
              href="tel:0298765432"
              className="flex items-center gap-2 text-sm font-medium text-[#4A5568] hover:text-[#D35400] transition-colors py-1.5 px-3 rounded-full hover:bg-[#E8E2D5]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400]"
              aria-label="Call restaurant at (02) 9876-5432"
            >
              <Phone className="w-4 h-4 text-[#D35400]" />
              <span>(02) 9876-5432</span>
            </a>

            {/* Primary Action Button */}
            <a
              href="#reserve"
              className="inline-flex items-center justify-center bg-[#D35400] hover:bg-[#B94600] text-white rounded-full px-5 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
            >
              Book Table
            </a>

            {/* User Profile Icon */}
            <button
              type="button"
              aria-label="User Profile and Account Settings"
              className="p-2 rounded-full border border-[#E8E2D5] text-[#1E232A] hover:border-[#D35400] hover:text-[#D35400] hover:bg-[#E8E2D5]/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400] active:scale-95"
            >
              <User className="w-4 font-normal" />
            </button>
          </div>

          {/* Mobile & Tablet Header Action Buttons (Right) */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Compact Book Table shortcut on mobile */}
            <a
              href="#reserve"
              className="inline-flex items-center gap-1.5 bg-[#D35400] hover:bg-[#B94600] text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </a>

            {/* User Profile Button shortcut */}
            <button
              type="button"
              aria-label="User Profile"
              className="p-2 rounded-full border border-[#E8E2D5] text-[#1E232A] hover:border-[#D35400] hover:text-[#D35400] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400]"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Animated Hamburger / Close Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="p-2 rounded-xl text-[#1E232A] hover:bg-[#E8E2D5]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400]"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#D35400] transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="w-6 h-6 text-[#1E232A] transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-x-0 top-[100%] z-40 bg-[#FDFBF7] border-b border-[#E8E2D5] shadow-2xl transition-all duration-300 ease-in-out lg:hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col space-y-4">
            {/* Mobile Vertical Nav List */}
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setActiveTab(item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`min-h-[48px] px-4 rounded-xl flex items-center justify-between text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400] ${
                      isActive
                        ? 'bg-[#D35400] text-white font-semibold shadow-sm'
                        : 'text-[#1E232A] hover:bg-[#E8E2D5]/40 hover:text-[#D35400]'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 ${
                        isActive ? 'text-white' : 'text-[#4A5568]'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#E8E2D5] flex flex-col space-y-3">
              {/* Direct Phone Link Card */}
              <a
                href="tel:0298765432"
                className="min-h-[48px] px-4 rounded-xl border border-[#E8E2D5] bg-white/50 flex items-center justify-between text-sm font-medium text-[#1E232A] hover:border-[#D35400] hover:text-[#D35400] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#D35400]/10 text-[#D35400]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-[#4A5568]">Direct Reservation</span>
                    <span className="font-semibold text-[#1E232A]">(02) 9876-5432</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#D35400] bg-[#D35400]/10 px-2.5 py-1 rounded-full">
                  Call Now
                </span>
              </a>

              {/* Primary Mobile Action Button */}
              <a
                href="#reserve"
                onClick={() => setIsMobileMenuOpen(false)}
                className="min-h-[48px] w-full flex items-center justify-center bg-[#D35400] hover:bg-[#B94600] text-white rounded-xl text-base font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400]"
              >
                Book a Table Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
