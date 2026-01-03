'use client';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Icon from '@/components/ui/AppIcon';

export default function ProductCarousel({ products }) {
    const [isPaused, setIsPaused] = useState(false);
    const scrollRef = useRef(null);

    // Duplicate products for infinite scroll effect
    const duplicatedProducts = [...products, ...products, ...products];

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId;
        let scrollPosition = 0;
        const scrollSpeed = 0.5; // Pixels per frame (adjust for speed)

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                scrollPosition += scrollSpeed;

                // Reset position when we've scrolled through one set of products
                const maxScroll = scrollContainer.scrollWidth / 3;
                if (scrollPosition >= maxScroll) {
                    scrollPosition = 0;
                }

                scrollContainer.scrollLeft = scrollPosition;
                animationId = requestAnimationFrame(scroll);
            }
        };

        if (!isPaused) {
            animationId = requestAnimationFrame(scroll);
        }

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isPaused]);

    return (
        <div
            className="relative group w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-hidden scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {duplicatedProducts.map((product, index) => (
                    <div
                        key={`${product.id}-${index}`}
                        className="flex-none w-[220px] sm:w-[320px] md:w-[280px] lg:w-[260px] px-2 sm:px-3"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* Pause Indicator */}
            {isPaused && (
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold animate-fade-in">
                    PAUSED
                </div>
            )}

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
        </div>
    );
}

ProductCarousel.propTypes = {
    products: PropTypes.array.isRequired
};
