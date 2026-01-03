'use client';

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PromoBar({ messages, isVisible = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Normalize messages to an array if it's a string
  const promoMessages = Array.isArray(messages) ? messages : [messages];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % promoMessages.length);
  }, [promoMessages.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + promoMessages.length) % promoMessages.length);
  }, [promoMessages.length]);

  useEffect(() => {
    if (isPaused || promoMessages.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds interval

    return () => clearInterval(timer);
  }, [handleNext, isPaused, promoMessages.length]);

  if (!isVisible || !promoMessages.length) return null;

  return (
    <div
      className="relative z-[70] bg-[#F5F5F7] text-black border-b border-gray-200 h-8 md:h-9 flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] w-full px-4 flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          aria-label="Previous message"
        >
          <Icon name="ChevronLeftIcon" size={14} />
        </button>

        <div className="flex-1 overflow-hidden relative h-full flex items-center justify-center">
          {promoMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`absolute transition-all duration-500 ease-in-out font-heading text-[10px] md:text-xs font-medium tracking-wide text-center w-full ${idx === currentIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
            >
              {msg}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
          aria-label="Next message"
        >
          <Icon name="ChevronRightIcon" size={14} />
        </button>
      </div>
    </div>
  );
}

PromoBar.propTypes = {
  messages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  isVisible: PropTypes.bool
};
