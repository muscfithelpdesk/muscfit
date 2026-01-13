'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import EmptyCart from './EmptyCart';

export default function ShoppingCartInteractive({ initialCartData, recommendedProducts }) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, loading } = useCart();
  const [isExpressShipping, setIsExpressShipping] = useState(false);

  // Removed local storage logic as it's handled by CartContext

  const handleUpdateQuantity = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleToggleExpressShipping = () => {
    setIsExpressShipping((prev) => !prev);
  };

  const calculateSubtotal = () => {
    // Rely on context cartTotal or recalculate if needed to decouple shipping logic
    // CartContext provides cartTotal which is sum of item * quantity.
    // If we want consistency, we can use cartTotal directly or keep this for flexible shipping calculation
    // Let's use cartTotal from context for the base, but we need numeric value
    return cartTotal;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 5000) return subtotal * 0.1;
    if (subtotal > 3000) return subtotal * 0.05;
    return 0;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal >= 2999) return 0;
    return isExpressShipping ? 199 : 99;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = calculateShipping();
    return (subtotal - discount + shipping) * 0.18;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = calculateShipping();
    const tax = calculateTax();
    return subtotal - discount + shipping + tax;
  };

  if (!loading && cartItems?.length === 0) {
    return <EmptyCart recommendedProducts={recommendedProducts} />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
      {/* Cart Items */}
      <div className="flex-1 min-w-0">
        <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 md:mb-8">
          Shopping Cart ({cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'})
        </h1>
        <div className="space-y-4 md:space-y-6">
          {cartItems?.map((item) => (
            <CartItem
              key={item?.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      </div>
      {/* Order Summary */}
      <OrderSummary
        subtotal={calculateSubtotal()}
        shipping={calculateShipping()}
        discount={calculateDiscount()}
        tax={calculateTax()}
        total={calculateTotal()}
        isExpressShipping={isExpressShipping}
        onToggleExpressShipping={handleToggleExpressShipping}
      />
    </div>
  );
}

ShoppingCartInteractive.propTypes = {
  initialCartData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      size: PropTypes.string,
      color: PropTypes.string,
    })
  ).isRequired,
  recommendedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};
