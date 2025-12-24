'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function RelatedProducts({ products }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev?.includes(productId)
        ? prev?.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="w-full">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products?.map((product) => (
          <div
            key={product?.id}
            className="group w-full min-w-0 bg-surface rounded-md overflow-hidden border border-border hover:border-primary/50 transition-all duration-250"
          >
            <Link href={`/product-details?id=${product?.id}`} className="block">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                <AppImage
                  src={product?.image}
                  alt={product?.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product?.badge && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-caption font-bold uppercase tracking-wider rounded-sm">
                    {product?.badge}
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e?.preventDefault();
                    toggleWishlist(product?.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-all duration-250 hover:scale-110 active:scale-95"
                  aria-label="Add to wishlist"
                >
                  <Icon
                    name="HeartIcon"
                    size={18}
                    variant={wishlist?.includes(product?.id) ? 'solid' : 'outline'}
                    className={wishlist?.includes(product?.id) ? 'text-primary' : 'text-foreground'}
                  />
                </button>
              </div>
            </Link>

            <div className="p-4">
              <Link href={`/product-details?id=${product?.id}`}>
                <h3 className="font-heading text-sm md:text-base font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-250">
                  {product?.name}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)]?.map((_, index) => (
                  <Icon
                    key={index}
                    name="StarIcon"
                    size={14}
                    variant={index < Math.floor(product?.rating) ? 'solid' : 'outline'}
                    className={index < Math.floor(product?.rating) ? 'text-warning' : 'text-muted'}
                  />
                ))}
                <span className="text-xs text-text-secondary ml-1">({product?.reviewCount})</span>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-data text-lg md:text-xl font-bold text-primary whitespace-nowrap">
                  ₹{product?.price}
                </span>
                {product?.originalPrice && (
                  <span className="font-data text-sm text-text-secondary line-through whitespace-nowrap">
                    ₹{product?.originalPrice}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e?.preventDefault();
                  alert(`Added ${product?.name} to cart`);
                }}
                className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold text-sm rounded-sm transition-all duration-250 hover:scale-[0.98] active:scale-95 flex items-center justify-center gap-2"
              >
                <Icon name="ShoppingCartIcon" size={16} />
                Quick Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

RelatedProducts.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      rating: PropTypes?.number?.isRequired,
      reviewCount: PropTypes?.number?.isRequired,
      badge: PropTypes?.string,
    })
  )?.isRequired,
};