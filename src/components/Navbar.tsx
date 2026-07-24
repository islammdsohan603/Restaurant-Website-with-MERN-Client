import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  Sun,
  Moon,
  ShoppingCart,
  Menu as MenuIcon,
  X,
  User,
  PackageCheck,
  Building2,
  SquareMenu,
  ChevronDown,
  LogOut,
  User2Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const [isAdmin] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();

  // Scroll detection for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'py-2.5 bg-white/80 dark:bg-[#070a10]/85 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-800/60'
          : 'py-4 bg-white dark:bg-[#070a10] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-2 bg-orange-500 rounded-xl text-white shadow-md shadow-orange-200 dark:shadow-none"
            >
              <UtensilsCrossed className="w-5 h-5" />
            </motion.div>
            <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
              Patel<span className="text-orange-500">Eats</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors hover:text-orange-500 ${
                isActive('/')
                  ? 'text-orange-500 font-bold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className={`text-sm font-semibold transition-colors hover:text-orange-500 ${
                isActive('/profile')
                  ? 'text-orange-500 font-bold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Profile
            </Link>
            <Link
              to="/order/status"
              className={`text-sm font-semibold transition-colors hover:text-orange-500 ${
                isActive('/order/status')
                  ? 'text-orange-500 font-bold'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Orders
            </Link>

            {/* Admin Dashboard Dropdown */}
            {isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500 gap-1 px-2"
                  >
                    Dashboard <ChevronDown className="w-4 h-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 p-2 rounded-xl"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/restaurant"
                      className="flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Building2 className="w-4 h-4 text-orange-500" />
                      Restaurant
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/menu"
                      className="flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <SquareMenu className="w-4 h-4 text-orange-500" />
                      Menu
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/orders"
                      className="flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <PackageCheck className="w-4 h-4 text-orange-500" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <motion.div whileTap={{ scale: 0.85 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                )}
              </Button>
            </motion.div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800 relative cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    2
                  </span>
                </Button>
              </motion.div>
            </Link>

            {/* Desktop Profile Avatar */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full overflow-hidden ring-2 ring-orange-500/20 hover:ring-orange-500 transition-all focus:outline-none bg-gray-800">
                    <User2Icon className="text-gray-200 w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 p-2 rounded-xl"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4" /> View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 focus:text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-gray-700 dark:text-gray-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#070a10] overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3 max-w-7xl mx-auto">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-500"
              >
                Home
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-500"
              >
                Profile
              </Link>
              <Link
                to="/order/status"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-500"
              >
                Orders
              </Link>

              {isAdmin && (
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-400 px-3 uppercase tracking-wider">
                    Admin Dashboard
                  </span>
                  <div className="mt-2 space-y-1">
                    <Link
                      to="/admin/restaurant"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"
                    >
                      <Building2 className="w-4 h-4 text-orange-500" />
                      Restaurant
                    </Link>
                    <Link
                      to="/admin/menu"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"
                    >
                      <SquareMenu className="w-4 h-4 text-orange-500" /> Menu
                    </Link>
                    <Link
                      to="/admin/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-800"
                    >
                      <PackageCheck className="w-4 h-4 text-orange-500" />{' '}
                      Orders
                    </Link>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3 px-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    <User2Icon className="w-4 h-4 text-gray-200" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    User Account
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 gap-1"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
