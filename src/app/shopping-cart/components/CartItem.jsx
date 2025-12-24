'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item?.id, newQuantity);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(item?.id);
    }, 250);
  };

  const itemTotal = (item?.price * quantity)?.toFixed(2);

  return (
    <div 
      className={`flex flex-col sm:flex-row gap-4 p-4 md:p-6 bg-card border border-border rounded-md transition-all duration-250 ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Product Image */}
      <div className="w-full sm:w-32 md:w-40 h-40 sm:h-32 md:h-40 flex-shrink-0 bg-surface rounded-sm overflow-hidden">
        <AppImage
          src={item?.image}
          alt={item?.alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-250"
        />
      </div>
      {/* Product Details */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-base md:text-lg font-semibold text-foreground line-clamp-2 mb-2">
              {item?.name}
            </h3>
            <div className="flex flex-wrap gap-3 text-xs md:text-sm text-text-secondary">
              {item?.size && (
                <span className="flex items-center gap-1">
                  <span className="font-caption uppercase">Size:</span>
                  <span className="font-medium text-foreground">{item?.size}</span>
                </span>
              )}
              {item?.color && (
                <span className="flex items-center gap-1">
                  <span className="font-caption uppercase">Color:</span>
                  <span className="font-medium text-foreground">{item?.color}</span>
                </span>
              )}
            </div>
          </div>

          {/* Remove Button - Desktop */}
          <button
            onClick={handleRemove}
            className="hidden sm:flex p-2 text-text-secondary hover:text-error transition-colors duration-250 hover:scale-110 active:scale-95"
            aria-label="Remove item"
          >
            <Icon name="TrashIcon" size={20} />
          </button>
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-auto">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs md:text-sm font-caption text-text-secondary uppercase">Quantity:</span>
            <div className="flex items-center gap-2 bg-surface border border-border rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-250"
                aria-label="Decrease quantity"
              >
                <Icon name="MinusIcon" size={16} />
              </button>
              <span className="w-8 md:w-10 text-center font-data text-sm md:text-base font-semibold text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-text-secondary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-250"
                aria-label="Increase quantity"
              >
                <Icon name="PlusIcon" size={16} />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="flex flex-col items-start sm:items-end">
              <span className="font-data text-xl md:text-2xl font-bold text-primary whitespace-nowrap">
                ₹{itemTotal}
              </span>
              <span className="text-xs text-text-secondary">
                ₹{item?.price?.toFixed(2)} each
              </span>
            </div>

            {/* Remove Button - Mobile */}
            <button
              onClick={handleRemove}
              className="sm:hidden p-2 text-text-secondary hover:text-error transition-colors duration-250 active:scale-95"
              aria-label="Remove item"
            >
              <Icon name="TrashIcon" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    quantity: PropTypes?.number?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    size: PropTypes?.string,
    color: PropTypes?.string,
  })?.isRequired,
  onUpdateQuantity: PropTypes?.func?.isRequired,
  onRemove: PropTypes?.func?.isRequired,
};