'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart } from '@/contexts/CartContext';

import PropTypes from 'prop-types';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          <Icon name="XMarkIcon" size={24} className="text-gray-900" />
        </button>

        {/* Image Section */}
        <div className="md:w-1/2 h-[300px] md:h-auto bg-[#F7F7F7]">
          <AppImage
            src={product?.image}
            alt={product?.imageAlt || product?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">
              MUSCFIT PERFORMANCE
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground uppercase mb-3">
              {product?.name}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-900">₹{product?.price}</span>
              {product?.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product?.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Select Size
            </h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border-2 font-bold transition-all ${selectedSize === size
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-400 hover:border-gray-400'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Engineered for high-intensity training. This product features moisture-wicking
            technology and 4-way stretch fabric for maximum mobility and comfort.
          </p>

          <div className="mt-auto flex flex-col gap-3">
            <button
              onClick={() => {
                addToCart(product);
                onClose();
              }}
              className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-black/90 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => (window.location.href = `/product-details?id=${product?.id}`)}
              className="w-full py-4 bg-transparent border-2 border-gray-200 text-gray-900 font-bold uppercase tracking-widest hover:border-gray-900 transition-colors"
            >
              View Full Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

QuickViewModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
