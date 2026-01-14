'use client';

import { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistService } from '@/lib/services/wishlistService';

import PropTypes from 'prop-types';

export default function CollectionSection({ title, subtitle, tabs, products, onQuickView, id }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  // Reset scroll position when tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if we can scroll left or right
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      // Check on resize
      window.addEventListener('resize', checkScroll);
      // Initial check after a delay to ensure content is loaded
      setTimeout(checkScroll, 100);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [products, activeTab]);

  return (
    <section id={id} className="py-12 bg-white border-b border-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="h-[2px] w-8 bg-red-600"></span>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-red-600 uppercase">
                {subtitle}
              </p>
            </div>
            <h2 className="text-5xl md:text-8xl font-[family-name:var(--font-anton)] italic text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-800 to-gray-400 tracking-tighter drop-shadow-sm pr-4 pb-2">
              {title}
            </h2>
          </div>

          <nav className="flex flex-wrap gap-4 md:gap-8 mt-6 md:mt-0 font-bold text-xs md:text-sm tracking-widest text-gray-400">
            {tabs?.map((tab) => (
              <button
                key={tab.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  // Add transition state for visual feedback
                  setIsTransitioning(true);

                  // Update active tab
                  setActiveTab(tab.name);

                  // Reset transition state after a brief delay
                  setTimeout(() => {
                    setIsTransitioning(false);
                  }, 150);
                }}
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
        <div className="relative group" style={{ position: 'relative' }}>
          <div
            ref={scrollRef}
            className={`flex overflow-x-auto no-scrollbar pb-8 scroll-smooth transition-opacity duration-150 ${isTransitioning ? 'opacity-50' : 'opacity-100'
              }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products
              ?.filter((product) => {
                const currentTab = tabs.find((t) => t.name === activeTab);
                if (!currentTab?.filter) return true;
                // Show featured images in all tabs
                if (product.tag === 'featured' || product.id?.startsWith('women-explore')) {
                  return true;
                }
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
          {canScrollLeft && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollLeft();
              }}
              className="absolute left-2 md:left-0 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-100 md:-translate-x-1/2 cursor-pointer"
              aria-label="Scroll left"
            >
              <Icon name="ChevronLeftIcon" size={20} className="md:w-6 md:h-6 text-gray-800" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollRight();
              }}
              className="absolute right-2 md:right-0 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-100 md:translate-x-1/2 cursor-pointer"
              aria-label="Scroll right"
            >
              <Icon name="ChevronRightIcon" size={20} className="md:w-6 md:h-6 text-gray-800" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ModernProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (user && product?.id) {
      checkWishlistStatus();
    }
  }, [user, product]);

  const checkWishlistStatus = async () => {
    try {
      const inWishlist = await wishlistService.isInWishlist(user.id, product.id);
      setIsWishlisted(inWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const handleWishlistToggle = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!user) {
      window.location.href = '/user-authentication';
      return;
    }

    const previousState = isWishlisted;
    setIsWishlisted(!previousState);

    try {
      if (previousState) {
        await wishlistService.removeFromWishlist(user.id, product.id);
      } else {
        await wishlistService.addToWishlist(user.id, product.id);
      }
    } catch (error) {
      setIsWishlisted(previousState);
      console.error('Error toggling wishlist:', error);
    }
  };

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

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-250 shadow-sm z-30"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Icon
            name="HeartIcon"
            size={16}
            variant={isWishlisted ? 'solid' : 'outline'}
            className={isWishlisted ? 'text-primary' : 'text-gray-700'}
          />
        </button>

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
