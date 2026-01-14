'use client';

import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function NewArrivalsCarousel({ products }) {
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth, children } = scrollRef.current;

            // Update nav buttons
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

            // Calculate active index based on center position
            const containerCenter = scrollLeft + clientWidth / 2;
            let closestIndex = 0;
            let minDistance = Infinity;

            // Iterate through child nodes (cards)
            Array.from(children).forEach((child, index) => {
                const childCenter = child.offsetLeft + child.offsetWidth / 2;
                const distance = Math.abs(containerCenter - childCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            setActiveIndex(closestIndex);
        }
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
        }
        return () => scrollElement?.removeEventListener('scroll', handleScroll);
    }, [products]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -320 : 320;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!products || products.length === 0) return null;

    return (
        <section className="py-16 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight mb-12 text-center">
                    New Arrivals
                </h2>

                <div className="relative group min-h-[450px]">
                    <div
                        ref={scrollRef}
                        className="flex items-center gap-0 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-[50%] md:px-[35%] py-10 scroll-smooth"
                        style={{
                            scrollPaddingInline: '35%',
                            perspective: '1000px'
                        }}
                    >
                        {products.map((product, index) => {
                            const isActive = index === activeIndex;
                            const isPrev = index === activeIndex - 1;
                            const isNext = index === activeIndex + 1;

                            // Dynamic styles for depth effect
                            let transformClass = 'scale-90 opacity-70 blur-[1px] grayscale-[0.5] z-0';
                            if (isActive) transformClass = 'scale-110 opacity-100 z-30 shadow-2xl';
                            else if (isPrev || isNext) transformClass = 'scale-95 opacity-85 z-10';

                            return (
                                <Link
                                    href={`/product-details/${product.id}`}
                                    key={product.id}
                                    className={`flex-shrink-0 w-[260px] md:w-[300px] snap-center transition-all duration-500 ease-out relative bg-[#F5F5F7] rounded-2xl overflow-hidden h-[400px] mx-[-15px] md:mx-[-20px] ${transformClass}`}
                                >
                                    {/* Background Text */}
                                    <div className="absolute top-8 left-0 right-0 text-center pointer-events-none z-0">
                                        <span className="font-heading font-black text-6xl text-gray-200/80 uppercase tracking-tighter truncate w-full block">
                                            {product.category || 'NEW'}
                                        </span>
                                    </div>

                                    {/* Product Image */}
                                    <div className="absolute inset-0 z-10 flex items-end justify-center pb-0">
                                        <img
                                            src={product.productImages?.[0]?.imageUrl || product.imageUrl || '/assets/images/no_image.png'}
                                            alt={product.name}
                                            className="h-[85%] w-auto object-contain drop-shadow-xl transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className={`absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 to-transparent pt-20 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                        <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wide mb-1 leading-none">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-200 text-xs font-medium uppercase tracking-widest mb-0">
                                            {product.tag || 'Just Launched'}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/90 backdrop-blur shadow-xl rounded-full flex items-center justify-center transition-all ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}
                        aria-label="Scroll left"
                    >
                        <Icon name="ChevronLeftIcon" size={24} className="text-black" />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/90 backdrop-blur shadow-xl rounded-full flex items-center justify-center transition-all ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}`}
                        aria-label="Scroll right"
                    >
                        <Icon name="ChevronRightIcon" size={24} className="text-black" />
                    </button>
                </div>
            </div>
        </section>
    );
}

NewArrivalsCarousel.propTypes = {
    products: PropTypes.array.isRequired,
};
