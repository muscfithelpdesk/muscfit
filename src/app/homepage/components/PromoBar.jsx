'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PromoBar({ message, dismissible, isVisible = true, onDismiss }) {
  if (!isVisible) return null;

  return (
    <div className="relative z-[70] bg-[#F5F5F7] text-black border-b border-gray-200 overflow-hidden whitespace-nowrap h-8 md:h-10 flex items-center">
      {/* z-40 to be below header (z-50) but above content */}
      <div className="flex animate-marquee">
        {/* Repeat the message many times to ensure a gap-less loop */}
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-4 md:mx-8 font-heading text-[9px] md:text-xs font-bold uppercase tracking-widest">
            {message}
          </span>
        ))}
      </div>
      {/* Second set for seamless loop */}
      <div className="flex animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-4 md:mx-8 font-heading text-[9px] md:text-xs font-bold uppercase tracking-widest">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}

PromoBar.propTypes = {
  message: PropTypes.string.isRequired,
  dismissible: PropTypes.bool,
  isVisible: PropTypes.bool,
  onDismiss: PropTypes.func
};
