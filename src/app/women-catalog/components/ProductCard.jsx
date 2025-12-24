'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistService } from '@/lib/services/productService';

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistToggle = async (e) => {
    e?.preventDefault();
    
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }

    setIsLoading(true);
    try {
      if (isWishlisted) {
        await wishlistService?.remove(user?.id, product?.id);
        setIsWishlisted(false);
      } else {
        await wishlistService?.add(user?.id, product?.id);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  const primaryImage = product?.productImages?.find(img => img?.isPrimary) || product?.productImages?.[0];
  const hasDiscount = product?.originalPrice && product?.originalPrice > product?.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product-details?id=${product?.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={primaryImage?.imageUrl || '/assets/images/no_image.png'}
            alt={primaryImage?.altText || product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            disabled={isLoading}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-gray-600'}`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Tag Badge */}
          {product?.tag && (
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                product?.tag === 'BESTSELLER' ? 'bg-yellow-500 text-white' :
                product?.tag === 'NEW' ? 'bg-blue-500 text-white' :
                product?.tag === 'SALE' ? 'bg-red-500 text-white' :
                product?.tag === 'HOT' ? 'bg-orange-500 text-white' :
                product?.tag === 'TRENDING'? 'bg-purple-500 text-white' : 'bg-gray-500 text-white'
              }`}>
                {product?.tag}
              </span>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                {discountPercentage}% OFF
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {product?.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2">{product?.brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-900">{product?.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({product?.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{product?.price?.toFixed(0)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product?.originalPrice?.toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}