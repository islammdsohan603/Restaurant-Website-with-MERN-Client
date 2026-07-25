import React from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Filter, RotateCcw, Utensils, Globe, DollarSign } from 'lucide-react';

export type FilterState = {
  selectedCuisines: string[];
  selectedCountries: string[];
  selectedPriceRanges: string[];
};

const cuisineOptions = [
  { id: 'biryani', label: 'Biryani' },
  { id: 'burger', label: 'Burger' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'indian', label: 'Indian' },
  { id: 'fastfood', label: 'Fast Food' },
];

const countryOptions = [
  { id: 'bangladesh', label: 'Bangladesh' },
  { id: 'india', label: 'India' },
  { id: 'usa', label: 'USA' },
  { id: 'uk', label: 'United Kingdom' },
];

const priceOptions = [
  { id: 'under200', label: 'Under ৳200' },
  { id: '200-500', label: '৳200 - ৳500' },
  { id: '500-1000', label: '৳500 - ৳1000' },
  { id: '1000plus', label: '৳1000+' },
];

interface FilterpageProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

const defaultFilters: FilterState = {
  selectedCuisines: [],
  selectedCountries: [],
  selectedPriceRanges: [],
};

const Filterpage: React.FC<FilterpageProps> = ({
  filters = defaultFilters,
  onFilterChange = () => {},
}) => {
  // Safe extraction with fallback values
  const selectedCuisines = filters?.selectedCuisines ?? [];
  const selectedCountries = filters?.selectedCountries ?? [];
  const selectedPriceRanges = filters?.selectedPriceRanges ?? [];

  // Toggle Item in Array Safely
  const handleToggle = (
    currentList: string[],
    value: string,
    key: keyof FilterState,
  ) => {
    const updatedList = currentList.includes(value)
      ? currentList.filter(item => item !== value)
      : [...currentList, value];

    onFilterChange({
      ...filters,
      [key]: updatedList,
    });
  };

  // Reset All Filters
  const handleReset = () => {
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white dark:bg-[#0f1420] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-orange-500" />
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">
            Filters
          </h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All
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
                onCheckedChange={() =>
                  handleToggle(selectedCuisines, cuisine.id, 'selectedCuisines')
                }
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
        <div className="space-y-2.5 pl-1">
          {priceOptions.map(price => (
            <div key={price.id} className="flex items-center space-x-2.5">
              <Checkbox
                id={`price-${price.id}`}
                checked={selectedPriceRanges.includes(price.id)}
                onCheckedChange={() =>
                  handleToggle(
                    selectedPriceRanges,
                    price.id,
                    'selectedPriceRanges',
                  )
                }
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label
                htmlFor={`price-${price.id}`}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
              >
                {price.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 dark:border-gray-800/80" />

      {/* 3. Country / Location Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
          <Globe className="w-4 h-4 text-orange-500" />
          <span>Country</span>
        </div>
        <div className="space-y-2.5 pl-1">
          {countryOptions.map(country => (
            <div key={country.id} className="flex items-center space-x-2.5">
              <Checkbox
                id={`country-${country.id}`}
                checked={selectedCountries.includes(country.id)}
                onCheckedChange={() =>
                  handleToggle(
                    selectedCountries,
                    country.id,
                    'selectedCountries',
                  )
                }
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label
                htmlFor={`country-${country.id}`}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 cursor-pointer hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
              >
                {country.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filterpage;
