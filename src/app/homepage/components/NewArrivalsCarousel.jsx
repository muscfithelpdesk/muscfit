'use client';

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import Image from 'next/image';

export default function NewArrivalsCarousel({ products, onQuickView }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setActiveIndex((current) => (current + 1) % products.length);
    }, [products.length]);

    const prevSlide = () => {
        setActiveIndex((current) => (current - 1 + products.length) % products.length);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || products.length <= 1) return;
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide, products.length]);

    if (!products || products.length === 0) return null;

    // Helper to determine visual position
    const getSlideStyles = (index) => {
        const total = products.length;
        // Calculate relative position accounting for wrap-around
        let relativePos = (index - activeIndex + total) % total;

        // Adjust for negative wrapping (e.g. if active is 0, index total-1 should be -1)
        if (relativePos > total / 2) relativePos -= total;

        // Active Center Item
        if (relativePos === 0) {
            return {
                className: 'z-30 opacity-100 scale-100 translate-x-0 cursor-default',
                isInteractable: true
            };
        }
        // Immediate Left
        if (relativePos === -1) {
            return {
                className: 'z-20 opacity-60 scale-90 -translate-x-[60%] blur-[1px] cursor-pointer hover:opacity-80',
                onClick: prevSlide
            };
        }
        // Immediate Right
        if (relativePos === 1) {
            return {
                className: 'z-20 opacity-60 scale-90 translate-x-[60%] blur-[1px] cursor-pointer hover:opacity-80',
                onClick: nextSlide
            };
        }
        // Hidden items
        return {
            className: 'z-0 opacity-0 scale-50 translate-x-0 hidden',
            isDisabled: true
        };
    };

    return (
        <section className="py-16 bg-background relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-4">
                <h2 className="font-heading text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-12 text-center italic">
                    Fresh Drops
                </h2>

                {/* Carousel Container */}
                <div
                    className="relative h-[300px] md:h-[450px] w-full max-w-5xl mx-auto flex items-center justify-center perspective-[1000px]"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {products.map((product, index) => {
                        const { className, onClick, isInteractable, isDisabled } = getSlideStyles(index);
                        if (isDisabled) return null;

                        return (
                            <div
                                key={product.id}
                                className={`absolute top-0 w-[280px] md:w-[600px] h-[200px] md:h-[350px] transition-all duration-700 ease-in-out origin-center ${className}`}
                                onClick={onClick}
                            >
                                <div className="relative w-full h-full bg-[#f2f2f2] rounded-2xl overflow-hidden shadow-2xl border border-white/50 group/card">

                                    {/* Large Background Text */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 opacity-10 group-hover/card:opacity-20 transition-opacity">
                                        <span className="font-heading font-black text-6xl md:text-9xl text-black uppercase tracking-tighter whitespace-nowrap">
                                            {product.category || 'NEW'}
                                        </span>
                                    </div>

                                    {/* Product Image - Centered and Large */}
                                    <div
                                        className={`absolute inset-0 z-10 flex items-center justify-center p-6 ${isInteractable ? 'cursor-pointer' : ''}`}
                                        onClick={(e) => {
                                            if (isInteractable && onQuickView) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onQuickView(product);
                                            }
                                        }}
                                    >
                                        <div className="relative w-full h-full transition-transform duration-500 group-hover/card:scale-110">
                                            <Image
                                                src={product.productImages?.[0]?.imageUrl || product.imageUrl || '/assets/images/no_image.png'}
                                                alt={product.name}
                                                fill
                                                className="object-contain drop-shadow-2xl"
                                                sizes="(max-width: 768px) 300px, 600px"
                                                priority={index === activeIndex}
                                            />
                                        </div>
                                    </div>

                                    {/* Info Overlay (Only visible on active item) */}
                                    {isInteractable && (
                                        <div className="absolute top-0 left-0 p-6 md:p-8 z-20 flex flex-col justify-between h-full pointer-events-none">
                                            <div className="bg-black/5 backdrop-blur-sm px-3 per-1 rounded-md inline-flex self-start">
                                                <span className="text-[10px] font-bold tracking-widest uppercase text-black">
                                                    {product.tag || 'New'}
                                                </span>
                                            </div>

                                            <div className="pointer-events-auto">
                                                <Link
                                                    href={`/product-details?id=${product.id}`}
                                                    className="group/link block"
                                                >
                                                    <h3 className="font-heading font-black text-xl md:text-4xl text-black uppercase tracking-tighter mb-2 leading-none group-hover/link:text-primary transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <div className="h-[2px] w-12 bg-black group-hover/link:w-full transition-all duration-300"></div>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Navigation Buttons - Absolute positioned relative to container */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-14 md:h-14 bg-white shadow-sharp-md border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50"
                        aria-label="Previous slide"
                    >
                        <Icon name="ChevronLeftIcon" size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-14 md:h-14 bg-white shadow-sharp-md border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50"
                        aria-label="Next slide"
                    >
                        <Icon name="ChevronRightIcon" size={24} />
                    </button>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-1.5 transition-all duration-300 rounded-full ${index === activeIndex ? 'w-12 bg-black' : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

NewArrivalsCarousel.propTypes = {
    products: PropTypes.array.isRequired,
    onQuickView: PropTypes.func,
};
