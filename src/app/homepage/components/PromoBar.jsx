'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PromoBar({ message, dismissible, isVisible, onDismiss }) {
  if (!isVisible) return null;

  return (
    <div className="bg-black text-white border-b border-white/10 overflow-hidden whitespace-nowrap h-10 flex items-center">
      <div className="flex animate-marquee">
        {/* Repeat the message many times to ensure a gap-less loop */}
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 font-heading text-sm font-bold uppercase tracking-widest">
            {message}
          </span>
        ))}
      </div>
      {/* Second set for seamless loop */}
      <div className="flex animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 font-heading text-sm font-bold uppercase tracking-widest">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}

PromoBar.propTypes = {
  message: PropTypes?.string?.isRequired,
  dismissible: PropTypes?.bool,
  isVisible: PropTypes?.bool.isRequired,
  onDismiss: PropTypes?.func.isRequired
};