'use client';

import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function NewArrivalsCarousel({ products }) {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
            setTimeout(checkScroll, 100);
        }
        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [products]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -350 : 350;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // If no products, don't render
    if (!products || products.length === 0) return null;

    return (
        <section className="py-12 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground uppercase tracking-tight">
                        New Arrivals
                    </h2>
                </div>

                <div className="relative group">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
                    >
                        {products.map((product) => (
                            <Link
                                href={`/product-details/${product.id}`}
                                key={product.id}
                                className="flex-shrink-0 w-[280px] md:w-[320px] snap-center group relative bg-[#F5F5F7] rounded-2xl overflow-hidden h-[400px] transition-transform duration-300 hover:scale-[1.02]"
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
                                        className="h-[85%] w-auto object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/60 to-transparent pt-20">
                                    <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wide mb-1 leading-none">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-200 text-xs font-medium uppercase tracking-widest mb-0">
                                        {product.tag || 'Just Launched'}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    {canScrollLeft && (
                        <button
                            onClick={() => scroll('left')}
                            className="absolute left-2 md:left-0 top-[50%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-100 md:-translate-x-1/2 cursor-pointer"
                            aria-label="Scroll left"
                        >
                            <Icon name="ChevronLeftIcon" size={20} className="md:w-6 md:h-6 text-gray-800" />
                        </button>
                    )}

                    {canScrollRight && (
                        <button
                            onClick={() => scroll('right')}
                            className="absolute right-2 md:right-0 top-[50%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-100 md:translate-x-1/2 cursor-pointer"
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

NewArrivalsCarousel.propTypes = {
    products: PropTypes.array.isRequired,
};
