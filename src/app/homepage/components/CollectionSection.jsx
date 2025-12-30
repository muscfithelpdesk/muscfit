'use client';

import { useState, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

import PropTypes from 'prop-types';

export default function CollectionSection({ title, subtitle, tabs, products, onQuickView }) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.name);
    const scrollRef = useRef(null);

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
        <section className="py-12 bg-white border-b border-gray-50">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-100">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-[#112D4E]/60 mb-1 uppercase">{subtitle}</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#112D4E] tracking-tight">{title}</h2>
                    </div>

                    <nav className="flex flex-wrap gap-4 md:gap-8 mt-6 md:mt-0 font-bold text-xs md:text-sm tracking-widest text-gray-400">
                        {tabs?.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`hover:text-black transition-colors relative pb-1 ${activeTab === tab.name ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black' : ''
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
                        {products?.map((product) => (
                            <div
                                key={product.id}
                                className="flex-none px-2 sm:px-3 w-[280px] sm:w-1/2 md:w-1/3 lg:w-1/5"
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
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2F2F2] mb-4">
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
                    className={`absolute bottom-0 left-0 right-0 h-10 bg-[#2C3E50]/90 flex items-center justify-center transition-transform duration-300 z-20 ${isHovered ? 'translate-y-0' : 'translate-y-full'
                        }`}
                >
                    <span className="text-white text-xs font-bold tracking-widest uppercase">Quick view</span>
                </button>
            </div>

            <div className="space-y-1" onClick={() => window.location.href = `/product-details?id=${product?.id}`}>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide group-hover:text-blue-900 transition-colors">
                    {product?.name}
                </h3>
                <p className="text-[10px] md:text-xs text-gray-400 font-medium">PREMIUM FIT</p>
                <p className="text-sm font-bold text-gray-900 mt-2">₹{product?.price}</p>
            </div>
        </div>
    );
}

CollectionSection.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })).isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    onQuickView: PropTypes.func.isRequired
};

ModernProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageAlt: PropTypes.string,
        price: PropTypes.number.isRequired
    }).isRequired,
    onQuickView: PropTypes.func.isRequired
};
