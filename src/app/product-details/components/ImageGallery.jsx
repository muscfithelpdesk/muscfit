'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative w-full aspect-[3/4] bg-surface rounded-md overflow-hidden mb-4">
        <div
          className={`relative w-full h-full cursor-zoom-in ${isZoomed ? 'cursor-zoom-out' : ''}`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <AppImage
            src={images?.[selectedImage]?.url || ''}
            alt={images?.[selectedImage]?.alt || 'Product image'}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
          />
        </div>

        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/90 hover:bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-250 hover:scale-110 active:scale-95 shadow-sharp"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/90 hover:bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-250 hover:scale-110 active:scale-95 shadow-sharp"
              aria-label="Next image"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/90 text-foreground text-xs font-data rounded-full">
          {selectedImage + 1} / {images?.length}
        </div>

        {/* Zoom Indicator */}
        {!isZoomed && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/90 text-text-secondary text-xs font-caption rounded-full flex items-center gap-1">
            <Icon name="MagnifyingGlassPlusIcon" size={14} />
            Click to zoom
          </div>
        )}
      </div>
      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-3">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-full aspect-square bg-surface rounded-sm overflow-hidden transition-all duration-250 ${
              selectedImage === index
                ? 'ring-2 ring-primary scale-105' :'hover:ring-2 hover:ring-border hover:scale-105'
            }`}
          >
            <AppImage
              src={image?.url}
              alt={image?.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes?.arrayOf(
    PropTypes?.shape({
      url: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};