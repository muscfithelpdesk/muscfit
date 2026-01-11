'use client';

import { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

import PropTypes from 'prop-types';

export default function CollectionSection({ title, subtitle, tabs, products, onQuickView, id }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  const scrollRef = useRef(null);

  // Handle hash-based navigation to specific tabs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && id) {
        // Check if hash matches this section's ID
        if (hash.startsWith(`#${id}`)) {
          // Extract tab filter from hash (e.g., #explore-accessories-gym-bags -> gym-bags)
          const tabFilter = hash.replace(`#${id}-`, '').toLowerCase();

          // Find matching tab
          const matchingTab = tabs.find(tab => {
            const tabName = tab.name.toLowerCase().replace(/\s+/g, '-');
            return tabName === tabFilter || tab.filter === tabFilter;
          });

          if (matchingTab) {
            setActiveTab(matchingTab.name);
          }

          // Scroll to section
          setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 0);
        }
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [id, tabs]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <section id={id} className="py-12 bg-white border-b border-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] md:text-sm font-bold tracking-widest text-text-secondary mb-1 uppercase">
              {subtitle}
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              {title}
            </h2>
          </div>

          <nav className="flex flex-wrap gap-4 md:gap-8 mt-6 md:mt-0 font-bold text-xs md:text-sm tracking-widest text-gray-400">
            {tabs?.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`hover:text-black transition-colors relative pb-1 ${activeTab === tab.name
                  ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black'
                  : ''
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Product Slider Area */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar pb-8 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products
              ?.filter((product) => {
                const currentTab = tabs.find((t) => t.name === activeTab);
                if (!currentTab?.filter) return true;
                // Match with category or tag
                return (
                  (product.category || '').toLowerCase() === currentTab.filter.toLowerCase() ||
                  (product.tag || '').toLowerCase() === currentTab.filter.toLowerCase()
                );
              })
              .map((product) => (
                <div
                  key={product.id}
                  className="flex-none px-2 sm:px-3 w-[200px] sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <ModernProductCard product={product} onQuickView={onQuickView} />
                </div>
              ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex -translate-x-1/2"
          >
            <Icon name="ChevronLeftIcon" size={24} className="text-gray-800" />
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-[40%] -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 hidden md:flex translate-x-1/2"
          >
            <Icon name="ChevronRightIcon" size={24} className="text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ModernProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F2F2F2] mb-3 md:mb-4">
        <AppImage
          src={product?.image}
          alt={product?.imageAlt || product?.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView(product);
          }}
          className={`absolute bottom-0 left-0 right-0 h-8 md:h-10 bg-[#2C3E50]/90 flex items-center justify-center transition-all duration-300 z-20 ${isHovered
            ? 'translate-y-0 opacity-100'
            : 'translate-y-2 md:translate-y-full opacity-100 md:opacity-0'
            }`}
        >
          <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase">
            Quick view
          </span>
        </button>
      </div>

      <div
        className="space-y-0.5 md:space-y-1"
        onClick={() => (window.location.href = `/product-details?id=${product?.id}`)}
      >
        <h3 className="text-xs md:text-sm font-bold text-gray-800 uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-1">
          {product?.name}
        </h3>
        <p className="text-[9px] md:text-[10px] text-gray-400 font-medium">PREMIUM FIT</p>
        <p className="text-sm md:text-base font-black text-gray-900 mt-1 md:mt-2">
          ₹{product?.price}
        </p>
      </div>
    </div>
  );
}

CollectionSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQuickView: PropTypes.func.isRequired,
  id: PropTypes.string,
};

ModernProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onQuickView: PropTypes.func.isRequired,
};
