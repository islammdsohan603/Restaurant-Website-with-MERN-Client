import React, { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  Filter,
  RotateCcw,
  Utensils,
  Globe,
  DollarSign,
  ChevronDown,
} from 'lucide-react';

// ==========================================
// ১. ডাটাবেস/এপিআই থেকে ডাটা লোড করার জন্য টাইপ
// ==========================================
export type FilterState = {
  selectedCuisines: string[];
  selectedCountry: string;
  selectedPriceRange: string;
};

// ==========================================
// ২. অপশনসমূহ (পরে আপনি এগুলো DB থেকে আনবেন)
// ==========================================
const cuisineOptions = [
  { id: 'biryani', label: 'Biryani' },
  { id: 'burger', label: 'Burger' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'indian', label: 'Indian' },
  { id: 'fastfood', label: 'Fast Food' },
  { id: 'desserts', label: 'Desserts & Sweets' },
];

const countryOptions = [
  { id: 'all', label: 'All Countries' },
  { id: 'bangladesh', label: 'Bangladesh' },
  { id: 'india', label: 'India' },
  { id: 'usa', label: 'USA' },
  { id: 'uk', label: 'United Kingdom' },
];

const priceOptions = [
  { id: 'all', label: 'Any Price' },
  { id: 'under200', label: 'Under ৳200' },
  { id: '200-500', label: '৳200 - ৳500' },
  { id: '500-1000', label: '৳500 - ৳1000' },
  { id: '1000plus', label: '৳1000+' },
];

interface FilterpageProps {
  onFilterChange?: (filters: FilterState) => void;
}

const Filterpage: React.FC<FilterpageProps> = ({ onFilterChange }) => {
  // Filter States
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');

  // Helper to trigger parent component with current filters
  const applyFilters = (cuisines: string[], country: string, price: string) => {
    if (onFilterChange) {
      onFilterChange({
        selectedCuisines: cuisines,
        selectedCountry: country,
        selectedPriceRange: price,
      });
    }
  };

  // Handle Cuisine Checkbox Toggle
  const handleCuisineChange = (cuisineId: string) => {
    const updatedCuisines = selectedCuisines.includes(cuisineId)
      ? selectedCuisines.filter(item => item !== cuisineId)
      : [...selectedCuisines, cuisineId];

    setSelectedCuisines(updatedCuisines);
    applyFilters(updatedCuisines, selectedCountry, selectedPriceRange);
  };

  // Handle Country Selection
  const handleCountryChange = (countryId: string) => {
    setSelectedCountry(countryId);
    applyFilters(selectedCuisines, countryId, selectedPriceRange);
  };

  // Handle Price Selection
  const handlePriceChange = (priceId: string) => {
    setSelectedPriceRange(priceId);
    applyFilters(selectedCuisines, selectedCountry, priceId);
  };

  // Reset All Filters
  const handleReset = () => {
    setSelectedCuisines([]);
    setSelectedCountry('all');
    setSelectedPriceRange('all');
    applyFilters([], 'all', 'all');
  };

  return (
    <div className="bg-white dark:bg-[#0f1420] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">
            Filter By
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </Button>
      </div>

      {/* 1. Food Type / Cuisine Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          <Utensils className="w-4 h-4 text-orange-500" />
          <span>Cuisine / Food Type</span>
        </div>
        <div className="space-y-2.5 pl-1">
          {cuisineOptions.map(cuisine => (
            <div key={cuisine.id} className="flex items-center space-x-2.5">
              <Checkbox
                id={`cuisine-${cuisine.id}`}
                checked={selectedCuisines.includes(cuisine.id)}
                onCheckedChange={() => handleCuisineChange(cuisine.id)}
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label
                htmlFor={`cuisine-${cuisine.id}`}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
              >
                {cuisine.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 dark:border-gray-800/80" />

      {/* 2. Price Range Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          <DollarSign className="w-4 h-4 text-orange-500" />
          <span>Price Range</span>
        </div>
        <RadioGroup
          value={selectedPriceRange}
          onValueChange={handlePriceChange}
          className="space-y-2 pl-1"
        >
          {priceOptions.map(price => (
            <div key={price.id} className="flex items-center space-x-2.5">
              <RadioGroupItem
                value={price.id}
                id={`price-${price.id}`}
                className="text-orange-500 border-gray-300 dark:border-gray-700 focus-visible:ring-orange-500"
              />
              <Label
                htmlFor={`price-${price.id}`}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
              >
                {price.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <hr className="border-gray-100 dark:border-gray-800/80" />

      {/* 3. Country / Location Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          <Globe className="w-4 h-4 text-orange-500" />
          <span>Country</span>
        </div>
        <RadioGroup
          value={selectedCountry}
          onValueChange={handleCountryChange}
          className="space-y-2 pl-1"
        >
          {countryOptions.map(country => (
            <div key={country.id} className="flex items-center space-x-2.5">
              <RadioGroupItem
                value={country.id}
                id={`country-${country.id}`}
                className="text-orange-500 border-gray-300 dark:border-gray-700 focus-visible:ring-orange-500"
              />
              <Label
                htmlFor={`country-${country.id}`}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
              >
                {country.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filterpage;
