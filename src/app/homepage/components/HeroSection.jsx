import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection({ slides, ctaPrimary }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides?.length);
      setIsTransitioning(false);
    }, 800); // Matches transition duration
  };

  return (
    <section className="relative w-full h-[85vh] md:h-screen overflow-hidden group z-0 bg-black">
      {/* Background Images Layer */}
      {slides?.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Desktop & Tablet Image */}
          <div className="absolute inset-0 block">
            <AppImage
              src={slide?.backgroundImage}
              alt={slide?.backgroundAlt}
              fill
              className={`w-full h-full object-cover object-center transition-transform duration-[8s] ease-out ${index === currentSlide ? 'scale-110' : 'scale-100'
                }`}
              priority={index === 0}
            />
          </div>

          {/* Graded overlay for premium feel - Specific to each slide for consistency */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-20"></div>
        </div>
      ))}

      {/* Content Layer */}
      <div className="relative z-30 h-full w-full flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-8">
        <div
          className={`max-w-7xl mx-auto w-full transition-all duration-700 transform ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-2 tracking-tighter uppercase italic drop-shadow-2xl">
            {slides[currentSlide]?.title}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
            <div className="h-[2px] w-8 md:w-24 bg-white/60 shadow-lg transition-all duration-1000"></div>
            <p className="text-[10px] md:text-xl text-white font-bold tracking-[0.3em] uppercase drop-shadow-md">
              {slides[currentSlide]?.subtitle}
            </p>
            <div className="h-[2px] w-8 md:w-24 bg-white/60 shadow-lg transition-all duration-1000"></div>
          </div>

          <div className="flex justify-center flex-wrap gap-6 pt-4">
            <Link
              href={ctaPrimary?.href}
              className="px-12 py-4 bg-white text-black font-black text-sm md:text-base tracking-[0.2em] uppercase rounded-none transition-all duration-500 hover:bg-black hover:text-white hover:scale-105 premium-shadow min-w-[200px]"
            >
              {ctaPrimary?.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentSlide(index);
                setIsTransitioning(false);
              }, 400);
            }}
            className={`h-1.5 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'
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
