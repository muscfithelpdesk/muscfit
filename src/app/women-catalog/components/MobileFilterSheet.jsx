'use client';
import { useState, useEffect } from 'react';
import { productService } from '@/lib/services/productService';

export default function MobileFilterSheet({ filters, onFilterChange, onClose, gender }) {
  const [availableOptions, setAvailableOptions] = useState({
    brands: [],
    categories: [],
    tags: []
  });

  useEffect(() => {
    loadFilterOptions();
  }, [gender]);

  const loadFilterOptions = async () => {
    try {
      const options = await productService?.getFilterOptions(gender);
      setAvailableOptions(options);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleApply = () => {
    onClose();
  };

  const handleCategoryToggle = (category) => {
    const newCategories = filters?.categories?.includes(category)
      ? filters?.categories?.filter(c => c !== category)
      : [...(filters?.categories || []), category];
    onFilterChange({ categories: newCategories });
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters?.brands?.includes(brand)
      ? filters?.brands?.filter(b => b !== brand)
      : [...(filters?.brands || []), brand];
    onFilterChange({ brands: newBrands });
  };

  const handleTagToggle = (tag) => {
    const newTags = filters?.tags?.includes(tag)
      ? filters?.tags?.filter(t => t !== tag)
      : [...(filters?.tags || []), tag];
    onFilterChange({ tags: newTags });
  };

  const handlePriceChange = (min, max) => {
    onFilterChange({ priceRange: { min, max } });
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Filter Sheet */}
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6">
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              {availableOptions?.categories?.map(category => (
                <label key={category} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters?.categories?.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="ml-2 text-gray-700 capitalize">{category?.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
            <div className="space-y-2">
              {availableOptions?.brands?.map(brand => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters?.brands?.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="ml-2 text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-2">
              {[
                { label: 'Under ₹1,000', min: 0, max: 1000 },
                { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
                { label: '₹2,000 - ₹3,000', min: 2000, max: 3000 },
                { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
                { label: 'Above ₹5,000', min: 5000, max: 10000 }
              ]?.map(range => (
                <label key={range?.label} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters?.priceRange?.min === range?.min && filters?.priceRange?.max === range?.max}
                    onChange={() => handlePriceChange(range?.min, range?.max)}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-2 text-gray-700">{range?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Label Filter */}
          {availableOptions?.tags?.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Product Label</h3>
              <div className="space-y-2">
                {availableOptions?.tags?.map(tag => (
                  <label key={tag} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters?.tags?.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                      className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <span className="ml-2 text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={() => onFilterChange({
              categories: [],
              brands: [],
              priceRange: { min: 0, max: 10000 },
              sizes: [],
              colors: [],
              tags: []
            })}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}