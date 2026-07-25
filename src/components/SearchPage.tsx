import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Filterpage from './Filterpage';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Star, Clock, Search, X, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

// Dummy Restaurant Data matching your database structure
const dummyRestaurants = [
  {
    id: '1',
    name: 'Patel Dhaba & Biryani',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    city: 'Dhaka',
    country: 'Bangladesh',
    rating: 4.8,
    reviews: 120,
    deliveryTime: '25-35 min',
    cuisines: ['Indian', 'Biryani', 'Fast Food'],
    priceForTwo: '৳400 for two',
  },
  {
    id: '2',
    name: 'Italian Pizza Express',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop',
    city: 'Chittagong',
    country: 'Bangladesh',
    rating: 4.6,
    reviews: 85,
    deliveryTime: '30-40 min',
    cuisines: ['Pizza', 'Italian', 'Pasta'],
    priceForTwo: '৳600 for two',
  },
  {
    id: '3',
    name: 'Burger Craft & Shake',
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
    city: 'Dhaka',
    country: 'Bangladesh',
    rating: 4.9,
    reviews: 210,
    deliveryTime: '20-30 min',
    cuisines: ['Burgers', 'Snacks', 'Beverages'],
    priceForTwo: '৳350 for two',
  },
];

const SearchPage: React.FC = () => {
  const params = useParams<{ text?: string }>();
  const navigate = useNavigate();

  // Search input state initialized with URL parameter
  const [searchQuery, setSearchQuery] = useState<string>(params.text || '');
  const [appliedFilters, setAppliedFilters] = useState<string[]>([
    'Burger',
    'Pizza',
    'Fast Food',
  ]);

  useEffect(() => {
    if (params.text) {
      setSearchQuery(params.text);
    }
  }, [params.text]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const removeFilter = (filterToRemove: string) => {
    setAppliedFilters(prev => prev.filter(f => f !== filterToRemove));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070a10] text-gray-900 dark:text-white transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Filter Section */}
          <div className="w-full lg:w-1/4 shrink-0">
            <Filterpage />
          </div>

          {/* Right Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search Input Box Header */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 bg-white dark:bg-[#0f1420] p-2 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by restaurant name, city or food item..."
                  className="pl-11 pr-4 py-3 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm md:text-base"
                />
              </div>

              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-6 rounded-xl shadow-md transition-all cursor-pointer shrink-0"
              >
                Search
              </Button>
            </form>

            {/* Search Meta & Applied Filter Badges */}
            <div className="space-y-3">
              <h1 className="text-xl font-bold tracking-tight">
                Search results found ({dummyRestaurants.length})
              </h1>

              {/* Filter Pills / Badges */}
              <div className="flex flex-wrap items-center gap-2">
                {appliedFilters.map((selectedFilter: string, idx: number) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                  >
                    {selectedFilter}
                    <X
                      className="w-3.5 h-3.5 cursor-pointer hover:text-orange-700 transition-colors"
                      onClick={() => removeFilter(selectedFilter)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Restaurant Cards Grid (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group bg-white dark:bg-[#0f1420] border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                    {/* City Badge */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium border border-white/10">
                      <MapPin className="w-3 h-3 text-orange-400" />
                      {restaurant.city}, {restaurant.country}
                    </div>

                    {/* Delivery Time Badge */}
                    <div className="absolute bottom-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Clock className="w-3 h-3" />
                      {restaurant.deliveryTime}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Name & Rating */}
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                          {restaurant.name}
                        </h2>
                        <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-500/20 shrink-0">
                          <Star className="w-3 h-3 fill-amber-500" />
                          {restaurant.rating}
                        </div>
                      </div>

                      {/* Cuisines */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <Utensils className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span className="line-clamp-1">
                          {restaurant.cuisines.join(' • ')}
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Price & Action */}
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {restaurant.priceForTwo}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg px-4 transition-all cursor-pointer"
                      >
                        View Menu
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
