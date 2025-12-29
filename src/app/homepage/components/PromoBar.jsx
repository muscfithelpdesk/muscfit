'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PromoBar({ message, dismissible, isVisible, onDismiss }) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-muted border-b border-border">
      <div className="flex items-center justify-center h-10 px-4 md:px-6 lg:px-8 relative">
        <p className="text-xs md:text-sm font-caption text-center truncate text-foreground">
          {message}
        </p>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="absolute right-4 p-1 hover:bg-black/5 rounded-sm transition-colors duration-250"
            aria-label="Dismiss promo"
          >
            <Icon name="XMarkIcon" size={16} className="text-foreground" />
          </button>
        )}
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