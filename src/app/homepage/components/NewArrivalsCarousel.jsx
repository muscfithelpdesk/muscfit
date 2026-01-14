'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import Image from 'next/image';

export default function NewArrivalsCarousel({ products, onQuickView }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Drag/Swipe State
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const containerRef = useRef(null);

    const nextSlide = useCallback(() => {
        setActiveIndex((current) => (current + 1) % products.length);
        setCurrentTranslate(0);
    }, [products.length]);

    const prevSlide = useCallback(() => {
        setActiveIndex((current) => (current - 1 + products.length) % products.length);
        setCurrentTranslate(0);
    }, [products.length]);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || products.length <= 1 || isDragging) return;
        const timer = setInterval(nextSlide, 4000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, nextSlide, products.length, isDragging]);

    // Drag Handlers
    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartPos(getPositionX(e));
        setIsAutoPlaying(false);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;
        setCurrentTranslate(diff);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        const threshold = 50; // Minimum drag distance to trigger change

        if (currentTranslate < -threshold) {
            nextSlide();
        } else if (currentTranslate > threshold) {
            prevSlide();
        } else {
            setCurrentTranslate(0); // Reset if drag was minimal
        }
        setIsAutoPlaying(true);
    };

    const getPositionX = (e) => {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    };

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
                className: 'z-30 opacity-100 scale-100 cursor-grab active:cursor-grabbing',
                style: { transform: `translateX(${currentTranslate}px)` },
                isInteractable: true
            };
        }
        // Immediate Left
        if (relativePos === -1) {
            return {
                className: 'z-20 opacity-60 scale-90 -translate-x-[60%] blur-[1px] cursor-pointer hover:opacity-80',
                style: {},
                onClick: prevSlide
            };
        }
        // Immediate Right
        if (relativePos === 1) {
            return {
                className: 'z-20 opacity-60 scale-90 translate-x-[60%] blur-[1px] cursor-pointer hover:opacity-80',
                style: {},
                onClick: nextSlide
            };
        }
        // Hidden items
        return {
            className: 'z-0 opacity-0 scale-50 translate-x-0 hidden',
            style: {},
            isDisabled: true
        };
    };

    return (
        <section className="pt-16 pb-8 md:pt-24 md:pb-12 bg-background relative overflow-hidden select-none">
            <div className="max-w-[1400px] mx-auto px-4">

                {/* Carousel Container */}
                <div
                    ref={containerRef}
                    className="relative h-[300px] md:h-[450px] w-full max-w-5xl mx-auto flex items-center justify-center perspective-[1000px] touch-pan-y"
                    onMouseEnter={() => !isDragging && setIsAutoPlaying(false)}
                    onMouseLeave={() => !isDragging && setIsAutoPlaying(true)}
                    // Mouse Events
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={isDragging ? handleDragEnd : undefined}
                    // Touch Events
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    {products.map((product, index) => {
                        const { className, style, onClick, isInteractable, isDisabled } = getSlideStyles(index);
                        if (isDisabled) return null;

                        return (
                            <div
                                key={product.id}
                                className={`absolute top-0 w-[280px] md:w-[600px] h-[200px] md:h-[350px] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center ${className}`}
                                style={style}
                                onClick={!isDragging ? onClick : undefined}
                            >
                                <div className="relative w-full h-full bg-[#f2f2f2] rounded-2xl overflow-hidden shadow-2xl border border-white/50 group/card flex flex-row items-center">

                                    {/* Left Side: Text Content */}
                                    <div className="w-[40%] h-full flex flex-col justify-center pl-6 md:pl-10 pr-2 z-20">
                                        <div className={`transition-all duration-500 ${isInteractable ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                            <h3 className="font-heading font-black text-xl md:text-3xl lg:text-4xl text-black uppercase tracking-wide leading-tight mb-2">
                                                {product.name}
                                            </h3>
                                            <p className="font-sans text-xs md:text-sm text-gray-600 font-medium tracking-wider mb-4 uppercase">
                                                {product.tag || 'New Arrival'}
                                            </p>

                                            {/* CTA Button Implementation */}
                                            <Link
                                                href={isDragging ? '#' : `/product-details?id=${product.id}`}
                                                onClick={(e) => {
                                                    if (isDragging) e.preventDefault();
                                                    else e.stopPropagation(); // Stop propagation to prevent Quick View on button click if we want navigation
                                                }}
                                                className={`inline-block px-4 py-2 md:px-6 md:py-3 bg-black text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-800 transition-colors ${isDragging ? 'pointer-events-none' : ''}`}
                                            >
                                                Shop Now
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Right Side: Product Image */}
                                    <div
                                        className="w-[60%] h-full relative"
                                        onClick={(e) => {
                                            if (isDragging) return;
                                            if (isInteractable && onQuickView) {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                onQuickView(product);
                                            }
                                        }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 transition-transform duration-500 group-hover/card:scale-105">
                                            <Image
                                                src={product.productImages?.[0]?.imageUrl || product.imageUrl || '/assets/images/no_image.png'}
                                                alt={product.name}
                                                fill
                                                className="object-contain drop-shadow-xl pointer-events-none"
                                                sizes="(max-width: 768px) 200px, 400px"
                                                priority={index === activeIndex}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Navigation Buttons - Absolute positioned relative to container */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-14 md:h-14 bg-white shadow-sharp-md border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50"
                        aria-label="Previous slide"
                    >
                        <Icon name="ChevronLeftIcon" size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
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
