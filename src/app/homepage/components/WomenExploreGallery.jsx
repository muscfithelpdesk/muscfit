'use client';

import { useState, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function WomenExploreGallery() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Total of 7 images (4 existing + 3 new)
  const images = [
    {
      id: 1,
      src: '/assets/images/women-explore-1.jpg',
      alt: "Women's Athletic Wear - Dark Brown Set",
    },
    {
      id: 2,
      src: '/assets/images/women-explore-2.jpg',
      alt: "Women's Athletic Wear - Dark Grey Top",
    },
    {
      id: 3,
      src: '/assets/images/women-explore-3.jpg',
      alt: "Women's Athletic Wear - Lavender Top",
    },
    {
      id: 4,
      src: '/assets/images/women-explore-4.jpg',
      alt: "Women's Athletic Wear - Collection 4",
    },
    {
      id: 5,
      src: '/assets/images/women-explore-5.jpg',
      alt: "Women's Athletic Wear - Collection 5",
    },
    {
      id: 6,
      src: '/assets/images/women-explore-6.jpg',
      alt: "Women's Athletic Wear - Collection 6",
    },
    {
      id: 7,
      src: '/assets/images/women-explore-7.jpg',
      alt: "Women's Athletic Wear - Collection 7",
    },
  ];

  const imagesPerView = 4;
  const maxIndex = Math.max(0, images.length - imagesPerView);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.scrollWidth / images.length;
        const scrollAmount = itemWidth * imagesPerView;
        scrollRef.current.scrollTo({
          left: newIndex * scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.scrollWidth / images.length;
        const scrollAmount = itemWidth * imagesPerView;
        scrollRef.current.scrollTo({
          left: newIndex * scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.scrollWidth / images.length;
      const scrollAmount = itemWidth * imagesPerView;
      const newIndex = Math.round(scrollLeft / scrollAmount);
      setCurrentIndex(Math.min(Math.max(0, newIndex), maxIndex));
    }
  };

  return (
    <section className="py-12 bg-white border-b border-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] md:text-sm font-bold tracking-widest text-text-secondary mb-1 uppercase">
              EXPLORE
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              WOMEN'S
            </h2>
          </div>
        </div>

        {/* Image Gallery with Navigation */}
        <div className="relative group">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto no-scrollbar pb-8 scroll-smooth gap-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="flex-none w-[calc(25%-12px)] min-w-[280px] aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 group/item"
              >
                <AppImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-100 md:opacity-100 -translate-x-1/2"
              aria-label="Previous images"
            >
              <Icon name="ChevronLeftIcon" size={24} className="text-gray-800" />
            </button>
          )}

          {/* Next Button */}
          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-100 md:opacity-100 translate-x-1/2"
              aria-label="Next images"
            >
              <Icon name="ChevronRightIcon" size={24} className="text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
