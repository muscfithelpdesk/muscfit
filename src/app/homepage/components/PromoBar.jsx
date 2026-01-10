'use client';

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PromoBar({ messages, isVisible = true, onDismiss }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [show, setShow] = useState(isVisible);

  const promoMessages = Array.isArray(messages)
    ? messages.filter(msg => msg && msg.trim() !== '')
    : (messages ? [messages] : []);

  const handleNext = useCallback(() => {
    if (promoMessages.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % promoMessages.length);
  }, [promoMessages.length]);

  const handlePrev = useCallback(() => {
    if (promoMessages.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + promoMessages.length) % promoMessages.length);
  }, [promoMessages.length]);

  useEffect(() => {
    if (isPaused || promoMessages.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext, isPaused, promoMessages.length]);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  if (!show || promoMessages.length === 0) return null;

  return (
    <div
      className="relative z-[100] bg-[#F5F5F7] text-black h-11 flex items-center justify-center overflow-hidden border-b border-gray-200 active:cursor-grabbing"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] w-full px-4 md:px-8 flex items-center justify-between h-full">
        {/* Left Side: Navigation / Icon */}
        <div className="flex-shrink-0 w-8 md:w-16 flex items-center justify-start">
          {promoMessages.length > 1 && (
            <button
              onClick={handlePrev}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-all duration-300 opacity-60 hover:opacity-100"
              aria-label="Previous promo"
            >
              <Icon name="ChevronLeftIcon" size={14} className="text-black" />
            </button>
          )}
        </div>

        {/* Center: Messages Carousel */}
        <div className="flex-1 relative h-full flex items-center justify-center overflow-hidden px-2">
          {promoMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${idx === currentIndex
                ? 'opacity-100 translate-x-0'
                : idx < currentIndex
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
                }`}
            >
              <div className="flex items-center gap-2 md:gap-3">
                <span className="hidden sm:inline-block px-2 py-0.5 bg-black text-white text-[9px] font-black tracking-tighter rounded-sm">SALE</span>
                <p className="text-[10px] md:text-xs lg:text-sm font-heading font-black tracking-[0.12em] uppercase whitespace-nowrap text-black">
                  {msg}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Navigation & Close */}
        <div className="flex-shrink-0 w-8 md:w-16 flex items-center justify-end gap-2">
          {promoMessages.length > 1 && (
            <button
              onClick={handleNext}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-all duration-300 opacity-60 hover:opacity-100"
              aria-label="Next promo"
            >
              <Icon name="ChevronRightIcon" size={14} className="text-black" />
            </button>
          )}

          {onDismiss && (
            <button
              onClick={() => {
                setShow(false);
                onDismiss();
              }}
              className="hidden sm:flex p-1.5 hover:bg-gray-200 rounded-full transition-all duration-300 opacity-40 hover:opacity-100"
              aria-label="Dismiss Promo"
            >
              <Icon name="XMarkIcon" size={14} className="text-black" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

PromoBar.propTypes = {
  messages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  isVisible: PropTypes.bool,
  onDismiss: PropTypes.func
};
