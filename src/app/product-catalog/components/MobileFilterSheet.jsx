'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import FilterSidebar from './FilterSidebar';

export default function MobileFilterSheet({ 
  isOpen, 
  onClose,
  categories,
  productTypes,
  priceRanges,
  selectedCategory,
  selectedTypes,
  selectedPriceRange,
  onCategoryChange,
  onTypeToggle,
  onPriceRangeChange,
  onClearFilters,
  activeFilterCount
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 z-70 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Sheet */}
      <div className="fixed top-0 right-0 bottom-0 w-[320px] bg-background z-70 animate-slide-in-right overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-xl font-semibold text-foreground">Filters</h2>
              {activeFilterCount > 0 && (
                <span className="w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center font-data">
                  {activeFilterCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-250"
              aria-label="Close filters"
            >
              <Icon name="XMarkIcon" size={24} />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4">
          <FilterSidebar
            categories={categories}
            productTypes={productTypes}
            priceRanges={priceRanges}
            selectedCategory={selectedCategory}
            selectedTypes={selectedTypes}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={onCategoryChange}
            onTypeToggle={onTypeToggle}
            onPriceRangeChange={onPriceRangeChange}
            onClearFilters={onClearFilters}
          />
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-background border-t border-border p-4">
          <button
            onClick={onClose}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md transition-all duration-250 active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

MobileFilterSheet.propTypes = {
  isOpen: PropTypes?.bool?.isRequired,
  onClose: PropTypes?.func?.isRequired,
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
  onClearFilters: PropTypes?.func?.isRequired,
  activeFilterCount: PropTypes?.number?.isRequired
};