'use client';

import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import PromoCodeInput from './PromoCodeInput';
import { useState } from 'react';

export default function OrderSummary({ items }) {
  const [promoDiscount, setPromoDiscount] = useState(0);

  const subtotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  
  const promoAmount = (subtotal * promoDiscount) / 100;
  const discountedSubtotal = subtotal - promoAmount;
  
  const shipping = discountedSubtotal > 50 ? 0 : 5.99;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + shipping + tax;

  const handlePromoApplied = (discountPercentage) => {
    setPromoDiscount(discountPercentage);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Subtotal</span>
          <span className="text-text-primary font-data">${subtotal?.toFixed(2)}</span>
        </div>
        
        {promoDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-success">Promo Discount ({promoDiscount}%)</span>
            <span className="text-success font-data">-${promoAmount?.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Shipping</span>
          <span className="text-text-primary font-data">
            {shipping === 0 ? 'FREE' : `$${shipping?.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Tax</span>
          <span className="text-text-primary font-data">${tax?.toFixed(2)}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-heading text-lg">Total</span>
          <span className="font-heading text-lg text-primary font-data">${total?.toFixed(2)}</span>
        </div>
      </div>

      <div className="mb-4">
        <PromoCodeInput onPromoApplied={handlePromoApplied} />
      </div>

      {/* Express Shipping Option */}
      <div className="mb-6 pb-6 border-b border-border">
        <button
          onClick={onToggleExpressShipping}
          className="w-full flex items-start gap-3 p-4 bg-surface hover:bg-muted border border-border rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
        >
          <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors duration-250 ${
            isExpressShipping ? 'bg-primary border-primary' : 'border-border'
          }`}>
            {isExpressShipping && <Icon name="CheckIcon" size={14} className="text-primary-foreground" />}
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-heading text-sm md:text-base font-semibold text-foreground">
                Express Shipping
              </span>
              <span className="font-data text-sm md:text-base font-bold text-primary whitespace-nowrap">
                ₹{expressShippingCost}
              </span>
            </div>
            <p className="text-xs md:text-sm text-text-secondary">
              Delivery by {formattedDeliveryDate}
            </p>
          </div>
        </button>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
        <span className="font-heading text-lg md:text-xl font-bold text-foreground">Total</span>
        <span className="font-data text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">
          ₹{total?.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <Link
        href="/user-authentication"
        className="block w-full h-12 md:h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-base md:text-lg font-bold rounded-md flex items-center justify-center gap-2 transition-all duration-250 hover:scale-[0.98] active:scale-95 mb-3 glow-primary-md"
      >
        <Icon name="LockClosedIcon" size={20} />
        Proceed to Checkout
      </Link>

      <Link
        href="/product-catalog"
        className="block w-full h-12 bg-surface hover:bg-muted text-foreground font-heading text-sm md:text-base font-semibold rounded-md flex items-center justify-center gap-2 transition-all duration-250 hover:scale-[0.98] active:scale-95"
      >
        <Icon name="ArrowLeftIcon" size={18} />
        Continue Shopping
      </Link>

      {/* Trust Signals */}
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <div className="flex items-center gap-3 text-xs md:text-sm text-text-secondary">
          <Icon name="ShieldCheckIcon" size={20} className="text-success flex-shrink-0" />
          <span>Secure SSL encrypted checkout</span>
        </div>
        <div className="flex items-center gap-3 text-xs md:text-sm text-text-secondary">
          <Icon name="ArrowPathIcon" size={20} className="text-primary flex-shrink-0" />
          <span>30-day easy returns & exchanges</span>
        </div>
        <div className="flex items-center gap-3 text-xs md:text-sm text-text-secondary">
          <Icon name="TruckIcon" size={20} className="text-accent flex-shrink-0" />
          <span>Free shipping on orders over ₹2,999</span>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  subtotal: PropTypes?.number?.isRequired,
  shipping: PropTypes?.number?.isRequired,
  discount: PropTypes?.number?.isRequired,
  tax: PropTypes?.number?.isRequired,
  total: PropTypes?.number?.isRequired,
  isExpressShipping: PropTypes?.bool?.isRequired,
  onToggleExpressShipping: PropTypes?.func?.isRequired,
};