import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search/all');
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] bg-[#070a10] text-white flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Section: Text & Search Form */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col space-y-6 text-left z-10"
        >
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Order Food anytime <br className="hidden sm:block" />
            <span className="text-orange-500">&amp; anywhere</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-md leading-relaxed">
            Hey! Our Delicious food is waiting for you, we are always near to
            you.
          </p>

          {/* Search Box Input */}
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-lg border border-gray-700/80 rounded-xl p-1.5 bg-[#111622]/80 backdrop-blur-sm focus-within:border-orange-500 transition-all duration-300 shadow-xl"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search restaurant by name, city & country"
              className="w-full bg-transparent text-sm md:text-base text-white placeholder-gray-500 focus:outline-none px-4 py-2"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm md:text-base transition-all duration-300 cursor-pointer shadow-md whitespace-nowrap active:scale-95"
            >
              Search
            </button>
          </form>
        </motion.div>

        {/* Right Section: Pizza Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-center relative w-full"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 360],
            }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
            }}
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg flex items-center justify-center"
          >
            <img
              src="/src/assets/pizza.png"
              alt="Delicious Pizza"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
