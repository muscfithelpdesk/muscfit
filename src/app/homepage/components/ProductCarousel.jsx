'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Icon from '@/components/ui/AppIcon';

export default function ProductCarousel({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const timerRef = useRef(null);
    const containerRef = useRef(null);

    const [itemsPerView, setItemsPerView] = useState(4);
    const timerRef = useRef(null);
    const containerRef = useRef(null);

    // Update items per view based on window size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerView(1);
            else if (window.innerWidth < 1024) setItemsPerView(2);
            else setItemsPerView(5); // Increased to 5 to make items smaller
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, products.length - itemsPerView);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, [maxIndex]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    };

    // Auto-slide logic
    useEffect(() => {
        // Clear any existing interval
        if (timerRef.current) clearInterval(timerRef.current);

        if (!isPaused && products.length > itemsPerView) {
            timerRef.current = setInterval(() => {
                nextSlide();
            }, 3000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, nextSlide, products.length, itemsPerView]);

    // Touch swipe logic
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
    };

    return (
        <div
            className="relative group w-full overflow-hidden px-4 md:px-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={prevSlide}
                    className="p-2 bg-white/90 shadow-lg text-black hover:bg-black hover:text-white transition-all rounded-full ml-2"
                    aria-label="Previous slide"
                >
                    <Icon name="ChevronLeftIcon" size={24} />
                </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={nextSlide}
                    className="p-2 bg-white/90 shadow-lg text-black hover:bg-black hover:text-white transition-all rounded-full mr-2"
                    aria-label="Next slide"
                >
                    <Icon name="ChevronRightIcon" size={24} />
                </button>
            </div>

            {/* Carousel Track */}
            <div
                ref={containerRef}
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex-none px-2 sm:px-3"
                        style={{ width: `${100 / itemsPerView}%` }}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === idx
                            ? 'w-8 bg-black'
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

ProductCarousel.propTypes = {
    products: PropTypes.array.isRequired
};
