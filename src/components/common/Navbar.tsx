'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Leaf, Phone, User, Menu, X, ChevronRight, Calendar, LogOut, UserCircle } from 'lucide-react';
import { isLoggedIn, getUser, removeToken, type AuthUser } from '@/lib/auth';

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
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>('Our Menu');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  // Auth state — read from localStorage (client-only)
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUser(getUser());
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    removeToken();
    setLoggedIn(false);
    setUser(null);
    setIsUserMenuOpen(false);
    router.push('/login');
  };

  // ── User Dropdown (desktop) ────────────────────────────────────────────────
  const UserDropdown = () => (
    <div className="relative">
      <button
        type="button"
        id="navbar-user-btn"
        onClick={() => setIsUserMenuOpen((v) => !v)}
        aria-label={loggedIn ? `Account menu for ${user?.name ?? 'user'}` : 'Sign in or create account'}
        aria-expanded={isUserMenuOpen}
        className={`flex items-center gap-2 p-2 rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400] active:scale-95
          ${loggedIn
            ? 'border-[#D35400]/40 bg-[#D35400]/5 text-[#D35400] hover:bg-[#D35400]/10'
            : 'border-[#E8E2D5] text-[#1E232A] hover:border-[#D35400] hover:text-[#D35400] hover:bg-[#E8E2D5]/30'
          }`}
      >
        {loggedIn ? (
          <>
            <div className="w-6 h-6 rounded-full bg-[#D35400] text-white flex items-center justify-center text-xs font-bold leading-none">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <span className="text-xs font-semibold pr-1 hidden xl:block max-w-[80px] truncate">
              {user?.name?.split(' ')[0] ?? 'Account'}
            </span>
          </>
        ) : (
          <User className="w-4 font-normal" />
        )}
      </button>

      {/* Dropdown menu */}
      {isUserMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsUserMenuOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#E8E2D5] rounded-2xl shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
            {loggedIn ? (
              <>
                {/* User info */}
                <div className="px-4 py-3 border-b border-[#E8E2D5]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#D35400] text-white flex items-center justify-center text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-[#1E232A] truncate">{user?.name}</span>
                      <span className="text-xs text-[#4A5568] truncate">{user?.email}</span>
                    </div>
                  </div>
                </div>
                {/* Actions */}
                <Link
                  href="/profile"
                  id="navbar-profile-link"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1E232A] hover:bg-[#E8E2D5]/40 hover:text-[#D35400] transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  My Profile
                </Link>
                <button
                  type="button"
                  id="navbar-logout-btn"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  id="navbar-login-link"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1E232A] hover:bg-[#E8E2D5]/40 hover:text-[#D35400] transition-colors"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  id="navbar-signup-link"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[#D35400] hover:bg-[#D35400]/5 transition-colors"
                >
                  <UserCircle className="w-4 h-4" />
                  Create Account
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );

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

            {/* User Profile Dropdown */}
            <UserDropdown />
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

            {/* User Profile Button (mobile) */}
            {loggedIn ? (
              <Link href="/profile" id="navbar-mobile-user-btn">
                <button
                  type="button"
                  aria-label="My Profile"
                  className="p-2 cursor-pointer rounded-full border border-[#D35400]/40 bg-[#D35400]/5 text-[#D35400] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400]"
                >
                  <div className="w-4 h-4 flex items-center justify-center text-[10px] font-bold leading-none">
                    {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                  </div>
                </button>
              </Link>
            ) : (
              <Link href="/login" id="navbar-mobile-login-link">
                <button
                  type="button"
                  aria-label="User Profile"
                  className="p-2 cursor-pointer rounded-full border border-[#E8E2D5] text-[#1E232A] hover:border-[#D35400] hover:text-[#D35400] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D35400]"
                >
                  <User className="w-4 h-4" />
                </button>
              </Link>
            )}

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
                      className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#4A5568]'}`}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#E8E2D5] flex flex-col space-y-3">
              {/* Auth row in mobile drawer */}
              {loggedIn ? (
                <div className="rounded-xl border border-[#E8E2D5] bg-white/50 overflow-hidden">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D35400] text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {user?.name?.charAt(0).toUpperCase() ?? 'U'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-[#1E232A] truncate">{user?.name}</span>
                        <span className="text-xs text-[#4A5568] truncate">{user?.email}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full shrink-0"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 border-t border-[#E8E2D5] text-sm font-semibold text-[#D35400] hover:bg-[#D35400]/5 transition-colors"
                  >
                    <UserCircle className="w-4 h-4" />
                    View My Profile
                  </Link>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 min-h-[48px] flex items-center justify-center border border-[#E8E2D5] hover:border-[#D35400] text-[#1E232A] hover:text-[#D35400] rounded-xl text-sm font-semibold transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 min-h-[48px] flex items-center justify-center bg-[#D35400] hover:bg-[#B94600] text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
                  >
                    Create Account
                  </Link>
                </div>
              )}

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
