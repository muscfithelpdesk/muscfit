'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function FilterSidebar({ 
  categories, 
  productTypes, 
  priceRanges,
  selectedCategory,
  selectedTypes,
  selectedPriceRange,
  onCategoryChange,
  onTypeToggle,
  onPriceRangeChange,
  onClearFilters
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    type: true,
    price: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const hasActiveFilters = selectedCategory !== 'all' || 
                          selectedTypes?.length > 0 || 
                          selectedPriceRange !== 'all';

  return (
    <div className="w-full bg-surface border border-border rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
        <h2 className="font-heading text-lg md:text-xl font-semibold text-foreground">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-250"
          >
            Clear All
          </button>
        )}
      </div>
      {/* Category Filter */}
      <div className="border-b border-border">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-muted/50 transition-colors duration-250"
        >
          <span className="font-heading text-sm md:text-base font-semibold text-foreground">Category</span>
          <Icon 
            name={expandedSections?.category ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
            size={20} 
            className="text-text-secondary"
          />
        </button>
        {expandedSections?.category && (
          <div className="px-4 md:px-6 pb-4 space-y-2">
            {categories?.map((category) => (
              <label
                key={category?.id}
                className="flex items-center gap-3 p-2 rounded-sm hover:bg-muted/50 cursor-pointer transition-colors duration-250"
              >
                <input
                  type="radio"
                  name="category"
                  value={category?.id}
                  checked={selectedCategory === category?.id}
                  onChange={() => onCategoryChange(category?.id)}
                  className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-text-primary flex-1">{category?.label}</span>
                <span className="text-xs font-data text-text-secondary">({category?.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Product Type Filter */}
      <div className="border-b border-border">
        <button
          onClick={() => toggleSection('type')}
          className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-muted/50 transition-colors duration-250"
        >
          <span className="font-heading text-sm md:text-base font-semibold text-foreground">Product Type</span>
          <Icon 
            name={expandedSections?.type ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
            size={20} 
            className="text-text-secondary"
          />
        </button>
        {expandedSections?.type && (
          <div className="px-4 md:px-6 pb-4 space-y-2">
            {productTypes?.map((type) => (
              <label
                key={type?.id}
                className="flex items-center gap-3 p-2 rounded-sm hover:bg-muted/50 cursor-pointer transition-colors duration-250"
              >
                <input
                  type="checkbox"
                  value={type?.id}
                  checked={selectedTypes?.includes(type?.id)}
                  onChange={() => onTypeToggle(type?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-text-primary flex-1">{type?.label}</span>
                <span className="text-xs font-data text-text-secondary">({type?.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Price Range Filter */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-muted/50 transition-colors duration-250"
        >
          <span className="font-heading text-sm md:text-base font-semibold text-foreground">Price Range</span>
          <Icon 
            name={expandedSections?.price ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
            size={20} 
            className="text-text-secondary"
          />
        </button>
        {expandedSections?.price && (
          <div className="px-4 md:px-6 pb-4 space-y-2">
            {priceRanges?.map((range) => (
              <label
                key={range?.id}
                className="flex items-center gap-3 p-2 rounded-sm hover:bg-muted/50 cursor-pointer transition-colors duration-250"
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={range?.id}
                  checked={selectedPriceRange === range?.id}
                  onChange={() => onPriceRangeChange(range?.id)}
                  className="w-4 h-4 text-primary border-border focus:ring-2 focus:ring-primary focus:ring-offset-0"
                />
                <span className="text-sm text-text-primary flex-1">{range?.label}</span>
                <span className="text-xs font-data text-text-secondary">({range?.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

FilterSidebar.propTypes = {
  categories: PropTypes?.arrayOf(PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    label: PropTypes?.string?.isRequired,
    count: PropTypes?.number?.isRequired
  }))?.isRequired,
  productTypes: PropTypes?.arrayOf(PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    label: PropTypes?.string?.isRequired,
    count: PropTypes?.number?.isRequired
  }))?.isRequired,
  priceRanges: PropTypes?.arrayOf(PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    label: PropTypes?.string?.isRequired,
    count: PropTypes?.number?.isRequired
  }))?.isRequired,
  selectedCategory: PropTypes?.string?.isRequired,
  selectedTypes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
  selectedPriceRange: PropTypes?.string?.isRequired,
  onCategoryChange: PropTypes?.func?.isRequired,
  onTypeToggle: PropTypes?.func?.isRequired,
  onPriceRangeChange: PropTypes?.func?.isRequired,
  onClearFilters: PropTypes?.func?.isRequired
};