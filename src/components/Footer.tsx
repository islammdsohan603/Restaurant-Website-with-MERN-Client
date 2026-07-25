import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { FaTwitter } from 'react-icons/fa6';

// Custom SVG Social Icons (Fail-safe solution)
const FacebookIcon = () => <FaFacebook className="w-4 h-4 fill-current" />;

const InstagramIcon = () => <BsInstagram className="w-4 h-4 fill-current" />;

const TwitterIcon = () => <FaTwitter className="w-4 h-4 fill-current" />;

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50 dark:bg-[#070a10] text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-orange-500 rounded-xl text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
                Patel<span className="text-orange-500">Eats</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Delicious food delivered right to your doorstep. Satisfy your
              cravings with our wide range of fresh and tasty meals.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800/80 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800/80 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800/80 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-orange-500 transition-colors"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/order/status"
                  className="hover:text-orange-500 transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-orange-500 transition-colors"
                >
                  Your Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <span>123 Foodie Street, Flavor Town, FC 45678</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@pateleats.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Subscribe to get special offers and menu updates.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Button
                size="icon"
                className="bg-orange-500 hover:bg-orange-600 text-white shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} PatelEats. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
