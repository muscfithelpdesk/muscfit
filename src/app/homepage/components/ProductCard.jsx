'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { wishlistService } from '@/lib/services/wishlistService';
import { useEffect } from 'react';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (user && product?.id) {
      checkWishlistStatus();
    }
  }, [user, product]);

  const checkWishlistStatus = async () => {
    try {
      const inWishlist = await wishlistService.isInWishlist(user.id, product.id);
      setIsWishlisted(inWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const handleWishlistToggle = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!user) {
      // Redirect to login or show toast
      window.location.href = '/user-authentication';
      return;
    }

    // Optimistic update
    const previousState = isWishlisted;
    setIsWishlisted(!previousState);

    try {
      if (previousState) {
        await wishlistService.removeFromWishlist(user.id, product.id);
      } else {
        await wishlistService.addToWishlist(user.id, product.id);
      }
    } catch (error) {
      // Revert on error
      setIsWishlisted(previousState);
      console.error('Error toggling wishlist:', error);
    }
  };

  const handleQuickAdd = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    addToCart(product);
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
          <span
            className={`absolute top-3 left-3 px-3 py-1 ${product?.tag === 'SALE' ? 'bg-[#9B1C1C]' : 'bg-primary'} text-primary-foreground text-[10px] md:text-xs font-caption font-black rounded-sm tracking-wider uppercase`}
          >
            {product?.tag}
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-250 shadow-sm"
          aria-label="Add to wishlist"
        >
          <Icon
            name="HeartIcon"
            size={18}
            variant={isWishlisted ? 'solid' : 'outline'}
            className={isWishlisted ? 'text-primary' : 'text-gray-700'}
          />
        </button>

        <div
          className={`absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-0 md:translate-y-full opacity-100 md:opacity-0'}`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full h-8 md:h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-sm flex items-center justify-center gap-1 md:gap-2 transition-all duration-250 text-[10px] md:text-sm uppercase tracking-wider"
          >
            <Icon name="ShoppingBagIcon" size={14} className="md:w-[18px] md:h-[18px]" />
            Add to Bag
          </button>
        </div>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-heading text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2 line-clamp-1 md:line-clamp-2 uppercase tracking-tight">
          {product?.name}
        </h3>
        <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
          <span className="font-data text-base md:text-xl font-black text-primary whitespace-nowrap">
            ₹{product?.price}
          </span>
          {product?.originalPrice && (
            <span className="font-data text-[10px] md:text-sm text-gray-500 line-through whitespace-nowrap">
              ₹{product?.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5 md:gap-1">
          {[...Array(5)]?.map((_, index) => (
            <Icon
              key={index}
              name="StarIcon"
              size={10}
              variant={index < Math.floor(product?.rating) ? 'solid' : 'outline'}
              className={index < Math.floor(product?.rating) ? 'text-yellow-500' : 'text-gray-300'}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-1">({product?.reviews})</span>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    tag: PropTypes.string,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
  }).isRequired,
};
