import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function ParallaxBanner({
  title,
  subtitle,
  ctaText,
  ctaHref,
  backgroundImage,
  backgroundAlt,
}) {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <AppImage
          src={backgroundImage}
          alt={backgroundAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative h-full max-w-full mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center max-w-4xl">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 md:mb-6 uppercase italic tracking-tighter leading-none shadow-xl">
            {title}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
            {subtitle}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex h-14 md:h-16 px-8 md:px-12 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-heading font-bold rounded-none items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 text-base md:text-lg uppercase tracking-widest"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

ParallaxBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired,
  ctaHref: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  backgroundAlt: PropTypes.string.isRequired,
};
