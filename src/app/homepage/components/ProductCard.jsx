'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickAdd = (e) => {
    e?.preventDefault();
    alert(`Added ${product?.name} to cart`);
  };

  return (
    <Link
      href={`/product-details?id=${product?.id}`}
      className="group w-full min-w-0 bg-white rounded-md shadow-sharp hover:shadow-sharp-lg transition-all duration-250 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <AppImage
          src={product?.image}
          alt={product?.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-250"
        />
        
        {product?.tag && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-caption font-bold rounded-sm">
            {product?.tag}
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-250"
          aria-label="Add to wishlist"
        >
          <Icon
            name="HeartIcon"
            size={20}
            variant={isWishlisted ? 'solid' : 'outline'}
            className={isWishlisted ? 'text-primary' : 'text-gray-700'}
          />
        </button>

        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent animate-fade-in">
            <button
              onClick={handleQuickAdd}
              className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-sm flex items-center justify-center gap-2 transition-all duration-250"
            >
              <Icon name="ShoppingBagIcon" size={18} />
              Quick Add
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product?.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-data text-lg md:text-xl font-bold text-primary whitespace-nowrap">
            ₹{product?.price}
          </span>
          {product?.originalPrice && (
            <span className="font-data text-sm text-gray-500 line-through whitespace-nowrap">
              ₹{product?.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)]?.map((_, index) => (
            <Icon
              key={index}
              name="StarIcon"
              size={14}
              variant={index < Math.floor(product?.rating) ? 'solid' : 'outline'}
              className={index < Math.floor(product?.rating) ? 'text-yellow-500' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({product?.reviews})</span>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    image: PropTypes?.string?.isRequired,
    imageAlt: PropTypes?.string?.isRequired,
    tag: PropTypes?.string,
    rating: PropTypes?.number?.isRequired,
    reviews: PropTypes?.number?.isRequired
  })?.isRequired
};