'use client';

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PromoBar({ messages, isVisible = true }) {
  // Normalize messages to an array if it's a string
  const promoMessages = Array.isArray(messages) ? messages : [messages];

  // Duplicate messages to ensure a seamless loop
  const duplicatedMessages = [...promoMessages, ...promoMessages];

  if (!isVisible || !promoMessages.length) return null;

  return (
    <div className="relative z-[70] bg-[#000000] text-white border-b border-gray-800 h-10 overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {duplicatedMessages.map((msg, idx) => (
          <div
            key={idx}
            className="inline-flex items-center px-8 font-heading text-[10px] md:text-sm font-bold tracking-widest uppercase"
          >
            <span className="mr-4 text-primary">★</span>
            {msg}
            <span className="ml-8 text-primary opacity-50">|</span>
          </div>
        ))}
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
