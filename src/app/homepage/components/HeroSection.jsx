import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection({ slides, ctaPrimary }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = slides?.length || 0;

  useEffect(() => {
    if (totalSlides <= 1) return;

    const timer = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentSlide, totalSlides]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setIsTransitioning(false);
    }, 600);
  };

  const handleManualSlide = (index) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] lg:h-[80vh] max-h-[750px] overflow-hidden group z-0 bg-white">
      {/* Background Images Layer */}
      {slides?.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          <div className="absolute inset-0 block">
            <AppImage
              src={slide?.backgroundImage}
              alt={slide?.backgroundAlt}
              fill
              className={`w-full h-full object-cover object-center transition-transform duration-[10s] ease-out ${index === currentSlide ? 'scale-105' : 'scale-100'
                }`}
              priority={index === 0}
            />
          </div>

          {/* Lightened overlay for a 'brighter' feel but keeping text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10 z-20"></div>
          <div className="absolute inset-0 bg-black/10 z-10"></div>
        </div>
      ))}

      {/* Content Layer */}
      <div className="relative z-30 h-full w-full flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-8">
        <div
          className={`max-w-7xl mx-auto w-full transition-all duration-500 transform ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-2 tracking-tighter uppercase italic drop-shadow-xl">
            {slides[currentSlide]?.title}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6 md:mb-10">
            <div className="h-[2px] w-6 md:w-16 bg-white/80 shadow-lg"></div>
            <p className="text-[10px] md:text-lg text-white font-bold tracking-[0.4em] uppercase drop-shadow-md">
              {slides[currentSlide]?.subtitle}
            </p>
            <div className="h-[2px] w-6 md:w-16 bg-white/80 shadow-lg"></div>
          </div>

          <div className="flex justify-center pt-2">
            <Link
              href={ctaPrimary?.href}
              className="px-10 py-3.5 bg-primary text-white font-black text-xs md:text-sm tracking-[0.25em] uppercase rounded-none transition-all duration-300 hover:bg-black hover:scale-105 shadow-xl min-w-[180px]"
            >
              {ctaPrimary?.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators - Smaller and neater */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2.5">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualSlide(index)}
            className={`h-1 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      backgroundImage: PropTypes.string.isRequired,
      backgroundAlt: PropTypes.string.isRequired,
    })
  ).isRequired,
  ctaPrimary: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};
