import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Filterpage, { FilterState } from './Filterpage';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Star, Clock, Search, X, Utensils, Frown } from 'lucide-react';
import { motion } from 'framer-motion';

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
    priceForTwo: 400,
    priceText: '৳400 for two',
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
    priceForTwo: 600,
    priceText: '৳600 for two',
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
    cuisines: ['Burger', 'Fast Food', 'Beverages'],
    priceForTwo: 180,
    priceText: '৳180 for two',
  },
  {
    id: '4',
    name: 'New York Deli & Grill',
    image:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop',
    city: 'New York',
    country: 'USA',
    rating: 4.7,
    reviews: 150,
    deliveryTime: '15-25 min',
    cuisines: ['Burger', 'Fast Food'],
    priceForTwo: 1200,
    priceText: '$25 for two',
  },
];

const SearchPage: React.FC = () => {
  const params = useParams<{ text?: string }>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>(params.text || '');

  // Filter States with Array properties
  const [filters, setFilters] = useState<FilterState>({
    selectedCuisines: [],
    selectedCountries: [],
    selectedPriceRanges: [],
  });

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

  // Multiple Options Filter Logic
  const filteredRestaurants = useMemo(() => {
    return dummyRestaurants.filter(restaurant => {
      // 1. Text Query Filter
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.city.toLowerCase().includes(query) ||
        restaurant.country.toLowerCase().includes(query) ||
        restaurant.cuisines.some(c => c.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // 2. Multiple Cuisines Filter
      if (filters.selectedCuisines.length > 0) {
        const hasCuisine = restaurant.cuisines.some(cuisine =>
          filters.selectedCuisines.some(
            selected => selected.toLowerCase() === cuisine.toLowerCase(),
          ),
        );
        if (!hasCuisine) return false;
      }

      // 3. Multiple Countries Filter
      if (filters.selectedCountries.length > 0) {
        const matchesCountry = filters.selectedCountries.some(
          country => country.toLowerCase() === restaurant.country.toLowerCase(),
        );
        if (!matchesCountry) return false;
      }

      // 4. Multiple Price Ranges Filter
      if (filters.selectedPriceRanges.length > 0) {
        const price = restaurant.priceForTwo;
        const matchesPrice = filters.selectedPriceRanges.some(range => {
          switch (range) {
            case 'under200':
              return price < 200;
            case '200-500':
              return price >= 200 && price <= 500;
            case '500-1000':
              return price > 500 && price <= 1000;
            case '1000plus':
              return price > 1000;
            default:
              return false;
          }
        });
        if (!matchesPrice) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  // Badge Removal Functions
  const removeFilterItem = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].filter(item => item !== value),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070a10] text-gray-900 dark:text-white transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Filter Sidebar */}
          <div className="w-full lg:w-1/4 shrink-0">
            <Filterpage
              filters={filters}
              onFilterChange={newFilters => setFilters(newFilters)}
            />
          </div>

          {/* Right Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search Input Box */}
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

            {/* Filter Badges Area */}
            <div className="space-y-3">
              <h1 className="text-xl font-bold tracking-tight">
                Search results found ({filteredRestaurants.length})
              </h1>

              <div className="flex flex-wrap items-center gap-2">
                {/* Active Cuisines */}
                {filters.selectedCuisines.map(cuisine => (
                  <Badge
                    key={cuisine}
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 capitalize"
                  >
                    {cuisine}
                    <X
                      className="w-3.5 h-3.5 cursor-pointer hover:text-orange-700 transition-colors"
                      onClick={() =>
                        removeFilterItem('selectedCuisines', cuisine)
                      }
                    />
                  </Badge>
                ))}

                {/* Active Countries */}
                {filters.selectedCountries.map(country => (
                  <Badge
                    key={country}
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 capitalize"
                  >
                    Country: {country}
                    <X
                      className="w-3.5 h-3.5 cursor-pointer hover:text-orange-700 transition-colors"
                      onClick={() =>
                        removeFilterItem('selectedCountries', country)
                      }
                    />
                  </Badge>
                ))}

                {/* Active Price Ranges */}
                {filters.selectedPriceRanges.map(price => (
                  <Badge
                    key={price}
                    variant="secondary"
                    className="bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                  >
                    Price: {price}
                    <X
                      className="w-3.5 h-3.5 cursor-pointer hover:text-orange-700 transition-colors"
                      onClick={() =>
                        removeFilterItem('selectedPriceRanges', price)
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Restaurant Cards */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant, index) => (
                  <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group bg-white dark:bg-[#0f1420] border border-gray-100 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium border border-white/10">
                        <MapPin className="w-3 h-3 text-orange-400" />
                        {restaurant.city}, {restaurant.country}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Clock className="w-3 h-3" />
                        {restaurant.deliveryTime}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                            {restaurant.name}
                          </h2>
                          <div className="flex items-center gap-1 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-500/20 shrink-0">
                            <Star className="w-3 h-3 fill-amber-500" />
                            {restaurant.rating}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <Utensils className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="line-clamp-1">
                            {restaurant.cuisines.join(' • ')}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {restaurant.priceText}
                        </span>
                        <Button
                          size="sm"
                          onClick={() =>
                            navigate(`/restaurant/${restaurant.id}`)
                          }
                          className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg px-4 transition-all cursor-pointer"
                        >
                          View Menu
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-[#0f1420] rounded-2xl border border-gray-200 dark:border-gray-800 text-center space-y-3">
                <Frown className="w-12 h-12 text-gray-400" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  No Restaurants Found
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  Try adjusting your search query or clear filters to see more
                  results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
