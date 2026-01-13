'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistService } from '@/lib/services/wishlistService';
import { useEffect } from 'react';

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      // Redirect or show toast
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
      // Revert
      setIsWishlisted(previousState);
      console.error('Error toggling wishlist:', error);
    }
  };

  const primaryImage =
    product?.productImages?.find((img) => img?.isPrimary) || product?.productImages?.[0];
  const hasDiscount = product?.originalPrice && product?.originalPrice > product?.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
    : 0;

  return (
    <Link
      href={`/product-details?id=${product?.id}`}
      className="group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-sharp hover:premium-shadow transition-all duration-500 overflow-hidden border border-gray-100 preserve-3d tilt-3d">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={primaryImage?.imageUrl || '/assets/images/no_image.png'}
            alt={primaryImage?.altText || product?.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 backface-hidden"
          />

          {/* Glass Overlay for interactive feel */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Quick Add Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-2 md:p-4 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 md:translate-y-full opacity-100 md:opacity-0'} z-10`}
          >
            <button className="w-full py-2 md:py-2.5 glass-effect text-[#112D4E] font-bold text-[10px] md:text-xs uppercase tracking-[0.1em] rounded-lg shadow-lg hover:bg-white transition-colors">
              Add to Bag
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            disabled={isLoading}
            className="absolute top-3 right-3 w-10 h-10 glass-effect rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-20"
          >
            <svg
              className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-gray-800'}`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Tag Badge */}
          {product?.tag && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`px-4 py-1.5 text-[10px] font-bold rounded-full premium-shadow ${product?.tag === 'SALE'
                    ? 'bg-[#9B1C1C] text-white'
                    : 'glass-effect text-gray-900 shadow-sm'
                  }`}
              >
                {product?.tag}
              </span>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="px-3 py-1 bg-black text-white text-[10px] font-bold rounded-full premium-shadow">
                {discountPercentage}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {product?.brand || 'MUSCFIT PREMIUM'}
          </p>
          <h3 className="text-base font-bold text-[#112D4E] mb-2 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">
              <svg className="w-3.5 h-3.5 text-orange-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="ml-1 text-xs font-bold text-gray-700">{product?.rating}</span>
            </div>
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              ({product?.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-black text-[#112D4E]">
              ₹{product?.price?.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 font-medium line-through">
                ₹{product?.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
