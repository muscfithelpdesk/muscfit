'use client';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Icon from '@/components/ui/AppIcon';

export default function ProductCarousel({ products }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate products for infinite scroll effect
  const extendedProducts = [...products, ...products, ...products];

  // Scroll buttons
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.5 : clientWidth * 0.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto-scroll loop management
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth } = scrollRef.current;
        const cardWidth = 320;
        const third = scrollWidth / 3;

        // Infinite loop logic: If at end of 2nd set, jump back to 1st set (seamlessly if possible)
        if (scrollLeft >= 2 * third) {
          // Snap back instant
          scrollRef.current.scrollTo({ left: scrollLeft - third, behavior: 'auto' });
          // Then scroll forward
          requestAnimationFrame(() => {
            scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
          });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 4000); // 4s interval

    return () => clearInterval(interval);
  }, [isPaused, isDragging]);

  // Initialize position to the middle set
  useEffect(() => {
    const initScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth } = scrollRef.current;
        scrollRef.current.scrollLeft = scrollWidth / 3;
      }
    };
    // Wait for layout
    const timeout = setTimeout(initScroll, 100);
    return () => clearTimeout(timeout);
  }, [products]);

  // Unified Drag Handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    setStartX(pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsPaused(false);

    // Snap logic for infinite loop on drag release
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth } = scrollRef.current;
      const third = scrollWidth / 3;
      if (scrollLeft >= 2 * third) {
        scrollRef.current.scrollLeft = scrollLeft - third;
      } else if (scrollLeft <= 0) {
        scrollRef.current.scrollLeft = scrollLeft + third; // Snap to middle set if scrolled too far left
      }
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const x = pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 1.5x scroll speed for better feel
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="relative group w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
    >
      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto no-scrollbar gap-4 pb-4 md:gap-6 px-4 md:px-0 transition-all ${isDragging ? 'cursor-grabbing select-none scroll-auto' : 'cursor-grab scroll-smooth'
          }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        // Mouse Events
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
        // Touch Events
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onTouchMove={handleDragMove}
      >
        {extendedProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex-none w-[280px] sm:w-[320px] md:w-[300px] lg:w-[320px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 flex items-center justify-center border border-gray-100 hover:bg-black hover:text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Scroll left"
      >
        <Icon name="ChevronLeftIcon" size={24} />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 flex items-center justify-center border border-gray-100 hover:bg-black hover:text-white transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Scroll right"
      >
        <Icon name="ChevronRightIcon" size={24} />
      </button>

      {/* Mobile Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden z-10" />
    </div>
  );
}

ProductCarousel.propTypes = {
  products: PropTypes.array.isRequired,
};
