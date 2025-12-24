'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function VideoSection({ title, subtitle, thumbnailImage, thumbnailAlt, videoUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto aspect-video rounded-md overflow-hidden shadow-sharp-lg">
          {!isPlaying ? (
            <>
              <AppImage
                src={thumbnailImage}
                alt={thumbnailAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={handlePlayClick}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center transition-all duration-250 hover:scale-110 active:scale-95 shadow-sharp-lg"
                  aria-label="Play video"
                >
                  <Icon name="PlayIcon" size={32} className="text-primary-foreground ml-1" />
                </button>
              </div>
            </>
          ) : (
            <iframe
              src={videoUrl}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
}

VideoSection.propTypes = {
  title: PropTypes?.string?.isRequired,
  subtitle: PropTypes?.string?.isRequired,
  thumbnailImage: PropTypes?.string?.isRequired,
  thumbnailAlt: PropTypes?.string?.isRequired,
  videoUrl: PropTypes?.string?.isRequired
};