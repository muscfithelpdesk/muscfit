'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Icon from '@/components/ui/AppIcon';

export default function ProductCarousel({ products }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
    }, []);

    useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();
            // Check again after a short delay for image loading/rendering
            const timeoutId = setTimeout(checkScroll, 500);
            return () => {
                currentRef.removeEventListener('scroll', checkScroll);
                clearTimeout(timeoutId);
            };
        }
    }, [checkScroll, products]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group w-full">
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto scroll-smooth no-scrollbar gap-4 pb-4 md:gap-6 px-4 md:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex-none w-[280px] sm:w-[320px] md:w-[300px] lg:w-[320px]"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons - Hidden on mobile, visible on hover on desktop */}
            {canScrollLeft && (
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white shadow-xl rounded-full p-3 hidden md:flex items-center justify-center border border-gray-100 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    aria-label="Scroll left"
                >
                    <Icon name="ChevronLeftIcon" size={24} />
                </button>
            )}

            {canScrollRight && (
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white shadow-xl rounded-full p-3 hidden md:flex items-center justify-center border border-gray-100 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    aria-label="Scroll right"
                >
                    <Icon name="ChevronRightIcon" size={24} />
                </button>
            )}

            {/* Gradient hints for scrollability on mobile */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden z-10" />
        </div>
    );
}

ProductCarousel.propTypes = {
    products: PropTypes.array.isRequired
};
