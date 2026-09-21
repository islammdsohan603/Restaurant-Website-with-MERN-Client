"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <footer className="bg-[#FDFBF7] text-[#1E232A] pt-20 pb-10 overflow-hidden border-t border-[#E8E2D5]">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="font-serif text-3xl font-bold tracking-wide text-[#1E232A]">
              Saffron <span className="text-[#D35400]">&amp;</span> Sage
            </h2>
            <p className="text-[#4A5568] text-sm leading-relaxed">
              Experience artisanal Mediterranean and Eastern-infused family dining crafted with organic herbs, hand-ground spices, and timeless passion.
            </p>
            <div className="flex gap-4">
              <motion.a 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0 }}
                href="#" 
                className="p-2 bg-[#D35400]/10 hover:bg-[#D35400] rounded-full transition-colors duration-300 group"
              >
                <FaFacebookF className="w-5 h-5 text-[#D35400] group-hover:text-white" />
              </motion.a>
              <motion.a 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                href="#" 
                className="p-2 bg-[#D35400]/10 hover:bg-[#D35400] rounded-full transition-colors duration-300 group"
              >
                <FaInstagram className="w-5 h-5 text-[#D35400] group-hover:text-white" />
              </motion.a>
              <motion.a 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                href="#" 
                className="p-2 bg-[#D35400]/10 hover:bg-[#D35400] rounded-full transition-colors duration-300 group"
              >
                <FaTwitter className="w-5 h-5 text-[#D35400] group-hover:text-white" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6 lg:pl-8">
            <h3 className="font-serif text-xl font-semibold text-[#1E232A]">Quick Links</h3>
            <ul className="space-y-3">
              {['Our Menu', 'Special Combos', 'Reserve a Table', 'About Us', 'Private Dining'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#4A5568] hover:text-[#D35400] text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <FaArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-[#1E232A]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-[#4A5568]">
                <FaMapMarkerAlt className="w-5 h-5 text-[#D35400] shrink-0" />
                <span>452 Saffron Lane, <br/>Culinary District, NY 10012</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#4A5568]">
                <FaPhoneAlt className="w-5 h-5 text-[#D35400] shrink-0" />
                <span>(02) 9876-5432</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#4A5568]">
                <FaEnvelope className="w-5 h-5 text-[#D35400] shrink-0" />
                <span>reservations@saffronsage.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Opening Hours */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="font-serif text-xl font-semibold text-[#1E232A]">Opening Hours</h3>
            <ul className="space-y-3 text-sm text-[#4A5568]">
              <li className="flex justify-between border-b border-[#E8E2D5] pb-2">
                <span>Mon - Thu</span>
                <span>5:00 PM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-[#E8E2D5] pb-2">
                <span>Fri - Sat</span>
                <span>5:00 PM - 11:30 PM</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Sunday</span>
                <span>4:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-[#E8E2D5] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#4A5568]"
        >
          <p>&copy; {new Date().getFullYear()} Saffron &amp; Sage. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D35400] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#D35400] transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}