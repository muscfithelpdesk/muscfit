import Link from 'next/link';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function EmptyCart({ recommendedProducts }) {
  return (
    <div className="w-full max-w-4xl mx-auto text-center py-12 md:py-16 lg:py-20">
      {/* Empty State Icon */}
      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
        <Icon name="ShoppingCartIcon" size={48} className="text-text-secondary" />
      </div>
      <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
        Your Cart is Empty
      </h2>
      <p className="text-sm md:text-base lg:text-lg text-text-secondary mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. Start shopping to find your perfect fitness gear!
      </p>
      <Link
        href="/product-catalog"
        className="inline-flex items-center justify-center gap-2 h-12 md:h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-base md:text-lg font-bold rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 glow-primary-md"
      >
        <Icon name="ShoppingBagIcon" size={20} />
        Start Shopping
      </Link>
      {/* Recommended Products */}
      {recommendedProducts && recommendedProducts?.length > 0 && (
        <div className="mt-16 md:mt-20">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">
            You Might Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts?.map((product) => (
              <Link
                key={product?.id}
                href={`/product-details?id=${product?.id}`}
                className="group bg-card border border-border rounded-md overflow-hidden hover:shadow-sharp-lg transition-all duration-250 hover:scale-[1.02]"
              >
                <div className="aspect-[3/4] overflow-hidden bg-surface">
                  <AppImage
                    src={product?.image}
                    alt={product?.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-250"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-heading text-sm md:text-base font-semibold text-foreground line-clamp-2 mb-2">
                    {product?.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="font-data text-lg md:text-xl font-bold text-primary whitespace-nowrap">
                      ₹{product?.price?.toFixed(2)}
                    </span>
                    {product?.originalPrice && (
                      <span className="font-data text-sm text-text-secondary line-through">
                        ₹{product?.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* Category Suggestions */}
      <div className="mt-12 md:mt-16">
        <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-6">
          Browse by Category
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/product-catalog?category=men"
            className="p-6 bg-card border border-border rounded-md hover:bg-muted transition-all duration-250 hover:scale-[0.98] active:scale-95"
          >
            <Icon name="UserIcon" size={32} className="text-primary mx-auto mb-3" />
            <span className="font-heading text-base md:text-lg font-semibold text-foreground">Shop Men</span>
          </Link>
          <Link
            href="/product-catalog?category=women"
            className="p-6 bg-card border border-border rounded-md hover:bg-muted transition-all duration-250 hover:scale-[0.98] active:scale-95"
          >
            <Icon name="UserIcon" size={32} className="text-primary mx-auto mb-3" />
            <span className="font-heading text-base md:text-lg font-semibold text-foreground">Shop Women</span>
          </Link>
          <Link
            href="/product-catalog?category=compression"
            className="p-6 bg-card border border-border rounded-md hover:bg-muted transition-all duration-250 hover:scale-[0.98] active:scale-95"
          >
            <Icon name="BoltIcon" size={32} className="text-primary mx-auto mb-3" />
            <span className="font-heading text-base md:text-lg font-semibold text-foreground">Compression Gear</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

EmptyCart.propTypes = {
  recommendedProducts: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
    })
  ),
};