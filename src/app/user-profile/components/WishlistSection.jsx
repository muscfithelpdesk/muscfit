'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function WishlistSection({ wishlistItems, onRemove, onAddToCart }) {
  const [removingId, setRemovingId] = useState(null);
  const [addingToCartId, setAddingToCartId] = useState(null);

  const handleRemove = (itemId) => {
    setRemovingId(itemId);
    setTimeout(() => {
      onRemove(itemId);
      setRemovingId(null);
    }, 300);
  };

  const handleAddToCart = (item) => {
    setAddingToCartId(item?.id);
    setTimeout(() => {
      onAddToCart(item);
      setAddingToCartId(null);
    }, 500);
  };

  return (
    <div className="bg-card border border-border rounded-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            My Wishlist
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {wishlistItems?.length} {wishlistItems?.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        <Icon name="HeartIcon" size={24} className="text-primary" />
      </div>
      {wishlistItems?.length === 0 ? (
        <div className="text-center py-12">
          <Icon name="HeartIcon" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary text-sm md:text-base mb-4">Your wishlist is empty</p>
          <Link
            href="/product-catalog"
            className="inline-flex items-center gap-2 px-6 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
          >
            <Icon name="ShoppingBagIcon" size={20} />
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {wishlistItems?.map((item) => (
            <div
              key={item?.id}
              className={`bg-surface border border-border rounded-md overflow-hidden group hover:border-primary/50 transition-all duration-250 ${
                removingId === item?.id ? 'opacity-50 scale-95' : ''
              }`}
            >
              {/* Product Image */}
              <Link href={`/product-details?id=${item?.id}`} className="block relative">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <AppImage
                    src={item?.image}
                    alt={item?.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-250"
                  />
                </div>
                {item?.discount && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-error text-error-foreground text-xs font-bold rounded-sm">
                    -{item?.discount}%
                  </span>
                )}
              </Link>

              {/* Product Info */}
              <div className="p-4">
                <Link href={`/product-details?id=${item?.id}`}>
                  <h3 className="font-heading text-sm md:text-base font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors duration-250">
                    {item?.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-data text-lg font-bold text-primary">
                    ₹{item?.price?.toLocaleString('en-IN')}
                  </span>
                  {item?.originalPrice && (
                    <span className="font-data text-sm text-text-secondary line-through">
                      ₹{item?.originalPrice?.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-1 mt-2">
                  <Icon 
                    name={item?.inStock ? 'CheckCircleIcon' : 'XCircleIcon'} 
                    size={14} 
                    className={item?.inStock ? 'text-success' : 'text-error'} 
                  />
                  <span className={`text-xs ${item?.inStock ? 'text-success' : 'text-error'}`}>
                    {item?.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item?.inStock || addingToCartId === item?.id}
                    className="flex-1 flex items-center justify-center gap-2 h-10 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-text-secondary text-primary-foreground text-sm font-medium rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
                  >
                    {addingToCartId === item?.id ? (
                      <>
                        <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Icon name="ShoppingCartIcon" size={16} />
                        Add to Cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleRemove(item?.id)}
                    className="flex items-center justify-center w-10 h-10 bg-surface hover:bg-error/10 text-text-secondary hover:text-error border border-border hover:border-error/50 rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
                    aria-label="Remove from wishlist"
                  >
                    <Icon name="TrashIcon" size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

WishlistSection.propTypes = {
  wishlistItems: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      discount: PropTypes?.number,
      inStock: PropTypes?.bool?.isRequired,
    })
  )?.isRequired,
  onRemove: PropTypes?.func?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired,
};