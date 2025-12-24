'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ProductCard({ product, onWishlistToggle, onQuickAdd }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="StarIcon"
        size={16}
        variant={index < Math.floor(rating) ? 'solid' : 'outline'}
        className={index < Math.floor(rating) ? 'text-warning' : 'text-text-secondary'}
      />
    ));
  };

  const renderTag = () => {
    if (!product?.tag) return null;

    const tagStyles = {
      BESTSELLER: 'bg-primary text-primary-foreground',
      NEW: 'bg-success text-success-foreground',
      SALE: 'bg-error text-error-foreground',
      TRENDING: 'bg-accent text-accent-foreground',
      HOT: 'bg-warning text-warning-foreground'
    };

    return (
      <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-caption font-bold uppercase tracking-wider rounded-sm z-10 ${tagStyles?.[product?.tag]}`}>
        {product?.tag}
      </span>
    );
  };

  return (
    <div 
      className="group w-full min-w-0 bg-card border border-border rounded-md overflow-hidden hover:shadow-sharp-lg transition-all duration-250"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/product-details?id=${product?.id}`} className="block relative">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {renderTag()}
          
          <AppImage
            src={product?.image}
            alt={product?.alt}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e?.preventDefault();
              onWishlistToggle(product?.id);
            }}
            className="absolute top-3 right-3 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-all duration-250 hover:scale-110 active:scale-95 z-10"
            aria-label={product?.isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Icon
              name="HeartIcon"
              size={20}
              variant={product?.isWishlisted ? 'solid' : 'outline'}
              className={product?.isWishlisted ? 'text-error' : 'text-text-secondary'}
            />
          </button>

          {/* Quick Add Button - Desktop Only */}
          <div className={`hidden md:flex absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-all duration-250 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={(e) => {
                e?.preventDefault();
                onQuickAdd(product?.id);
              }}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-sm flex items-center justify-center gap-2 transition-all duration-250 hover:scale-[0.98] active:scale-95"
            >
              <Icon name="ShoppingCartIcon" size={20} />
              Quick Add
            </button>
          </div>
        </div>
      </Link>
      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product-details?id=${product?.id}`}>
          <h3 className="font-heading text-base md:text-lg font-semibold text-foreground line-clamp-2 mb-2 hover:text-primary transition-colors duration-250">
            {product?.name}
          </h3>
        </Link>

        <p className="text-sm text-text-secondary line-clamp-1 mb-3">{product?.category}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(product?.rating)}
          </div>
          <span className="text-xs font-data text-text-secondary">({product?.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-data text-xl md:text-2xl font-bold text-primary">
            ₹{product?.price?.toLocaleString('en-IN')}
          </span>
          {product?.originalPrice && (
            <span className="font-data text-sm text-text-secondary line-through">
              ₹{product?.originalPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Mobile Quick Add Button */}
        <button
          onClick={() => onQuickAdd(product?.id)}
          className="md:hidden w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-sm flex items-center justify-center gap-2 transition-all duration-250 active:scale-95"
        >
          <Icon name="ShoppingCartIcon" size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    name: PropTypes?.string?.isRequired,
    category: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    rating: PropTypes?.number?.isRequired,
    reviewCount: PropTypes?.number?.isRequired,
    tag: PropTypes?.oneOf(['BESTSELLER', 'NEW', 'SALE', 'TRENDING', 'HOT']),
    isWishlisted: PropTypes?.bool?.isRequired
  })?.isRequired,
  onWishlistToggle: PropTypes?.func?.isRequired,
  onQuickAdd: PropTypes?.func?.isRequired
};