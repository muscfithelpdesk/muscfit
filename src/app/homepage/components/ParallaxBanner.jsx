import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function ParallaxBanner({ title, subtitle, ctaText, ctaHref, backgroundImage, backgroundAlt }) {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <AppImage
          src={backgroundImage}
          alt={backgroundAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative h-full max-w-full mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            {title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 line-clamp-3">
            {subtitle}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex h-12 md:h-14 px-6 md:px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md items-center justify-center transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm md:text-base"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}

ParallaxBanner.propTypes = {
  title: PropTypes?.string?.isRequired,
  subtitle: PropTypes?.string?.isRequired,
  ctaText: PropTypes?.string?.isRequired,
  ctaHref: PropTypes?.string?.isRequired,
  backgroundImage: PropTypes?.string?.isRequired,
  backgroundAlt: PropTypes?.string?.isRequired
};