'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ProductInfo({ product, onAddToCart, onToggleWishlist, isInWishlist }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });
  };

  return (
    <div className="w-full">
      {/* Product Title & Badge */}
      <div className="mb-4">
        {product?.badge && (
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-caption font-bold uppercase tracking-wider rounded-sm mb-3">
            {product?.badge}
          </span>
        )}
        <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
          {product?.name}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">{product?.category}</p>
      </div>
      {/* Rating & Reviews */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-1">
          {[...Array(5)]?.map((_, index) => (
            <Icon
              key={index}
              name="StarIcon"
              size={18}
              variant={index < Math.floor(product?.rating) ? 'solid' : 'outline'}
              className={index < Math.floor(product?.rating) ? 'text-warning' : 'text-muted'}
            />
          ))}
        </div>
        <span className="text-sm font-data text-foreground font-semibold">{product?.rating}</span>
        <span className="text-sm text-text-secondary">({product?.reviewCount} reviews)</span>
      </div>
      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-data text-3xl md:text-4xl font-bold text-primary">
            ₹{product?.price}
          </span>
          {product?.originalPrice && (
            <span className="font-data text-xl text-text-secondary line-through">
              ₹{product?.originalPrice}
            </span>
          )}
          {product?.discount && (
            <span className="px-2 py-1 bg-success/20 text-success text-xs font-caption font-bold uppercase rounded-sm">
              {product?.discount}% OFF
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary">Inclusive of all taxes</p>
      </div>
      {/* Color Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
            Color: {selectedColor?.name}
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          {product?.colors?.map((color) => (
            <button
              key={color?.name}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-full transition-all duration-250 ${
                selectedColor?.name === color?.name
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' :'hover:scale-110'
              }`}
              style={{ backgroundColor: color?.hex }}
              aria-label={`Select ${color?.name} color`}
            />
          ))}
        </div>
      </div>
      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide">
            Select Size
          </label>
          <button
            onClick={() => setShowSizeGuide(!showSizeGuide)}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-250"
          >
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {product?.sizes?.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              disabled={!product?.availableSizes?.includes(size)}
              className={`h-12 font-heading font-semibold text-sm rounded-sm transition-all duration-250 ${
                selectedSize === size
                  ? 'bg-primary text-primary-foreground'
                  : product?.availableSizes?.includes(size)
                  ? 'bg-surface text-foreground hover:bg-muted'
                  : 'bg-muted text-text-secondary cursor-not-allowed opacity-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {showSizeGuide && (
          <div className="mt-4 p-4 bg-surface rounded-md border border-border">
            <h4 className="font-heading font-semibold text-foreground mb-3">Size Guide</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-text-secondary font-caption uppercase">Size</th>
                    <th className="text-left py-2 text-text-secondary font-caption uppercase">Chest (in)</th>
                    <th className="text-left py-2 text-text-secondary font-caption uppercase">Waist (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 font-data">S</td>
                    <td className="py-2 font-data">36-38</td>
                    <td className="py-2 font-data">28-30</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-data">M</td>
                    <td className="py-2 font-data">38-40</td>
                    <td className="py-2 font-data">30-32</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-data">L</td>
                    <td className="py-2 font-data">40-42</td>
                    <td className="py-2 font-data">32-34</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-data">XL</td>
                    <td className="py-2 font-data">42-44</td>
                    <td className="py-2 font-data">34-36</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="text-sm font-heading font-semibold text-foreground uppercase tracking-wide mb-3 block">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 bg-surface hover:bg-muted text-foreground rounded-sm transition-all duration-250 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Icon name="MinusIcon" size={20} />
          </button>
          <span className="w-12 text-center font-data text-lg font-semibold text-foreground">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
            className="w-10 h-10 bg-surface hover:bg-muted text-foreground rounded-sm transition-all duration-250 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Icon name="PlusIcon" size={20} />
          </button>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={handleAddToCart}
          className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold text-base rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 flex items-center justify-center gap-2"
        >
          <Icon name="ShoppingCartIcon" size={20} />
          Add to Cart
        </button>
        <button
          onClick={onToggleWishlist}
          className={`h-14 w-14 sm:w-auto sm:px-6 rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 flex items-center justify-center ${
            isInWishlist
              ? 'bg-primary text-primary-foreground'
              : 'bg-surface hover:bg-muted text-foreground'
          }`}
          aria-label="Add to wishlist"
        >
          <Icon name="HeartIcon" size={24} variant={isInWishlist ? 'solid' : 'outline'} />
        </button>
      </div>
      {/* Product Features */}
      <div className="space-y-3 mb-6 pb-6 border-b border-border">
        {product?.features?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Icon name="CheckCircleIcon" size={20} className="text-success flex-shrink-0 mt-0.5" />
            <span className="text-sm text-text-primary">{feature}</span>
          </div>
        ))}
      </div>
      {/* Product Description */}
      <div className="mb-6">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Product Details</h3>
        <p className="text-sm md:text-base text-text-primary leading-relaxed whitespace-pre-line">
          {product?.description}
        </p>
      </div>
      {/* Shipping & Returns */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-surface rounded-md">
          <Icon name="TruckIcon" size={24} className="text-primary flex-shrink-0" />
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-1">Express Shipping</h4>
            <p className="text-sm text-text-secondary">
              Estimated delivery: 3-5 business days
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 bg-surface rounded-md">
          <Icon name="ArrowPathIcon" size={24} className="text-primary flex-shrink-0" />
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-1">Easy Returns</h4>
            <p className="text-sm text-text-secondary">
              30-day return policy on all products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    category: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    originalPrice: PropTypes?.number,
    discount: PropTypes?.number,
    rating: PropTypes?.number?.isRequired,
    reviewCount: PropTypes?.number?.isRequired,
    badge: PropTypes?.string,
    colors: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        hex: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    sizes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    availableSizes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    description: PropTypes?.string?.isRequired,
  })?.isRequired,
  onAddToCart: PropTypes?.func?.isRequired,
  onToggleWishlist: PropTypes?.func?.isRequired,
  isInWishlist: PropTypes?.bool?.isRequired,
};