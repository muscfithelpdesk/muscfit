import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary, backgroundImage, backgroundAlt }) {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <AppImage
          src={backgroundImage}
          alt={backgroundAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>
      <div className="relative h-full max-w-full mx-auto px-4 md:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 line-clamp-3">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={ctaPrimary?.href}
              className="h-12 md:h-14 px-6 md:px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md flex items-center justify-center transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm md:text-base"
            >
              {ctaPrimary?.text}
            </Link>
            <Link
              href={ctaSecondary?.href}
              className="h-12 md:h-14 px-6 md:px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-heading font-semibold rounded-md flex items-center justify-center transition-all duration-250 hover:scale-[0.98] active:scale-95 border border-white/20 text-sm md:text-base"
            >
              {ctaSecondary?.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  title: PropTypes?.string?.isRequired,
  subtitle: PropTypes?.string?.isRequired,
  ctaPrimary: PropTypes?.shape({
    text: PropTypes?.string?.isRequired,
    href: PropTypes?.string?.isRequired
  })?.isRequired,
  ctaSecondary: PropTypes?.shape({
    text: PropTypes?.string?.isRequired,
    href: PropTypes?.string?.isRequired
  })?.isRequired,
  backgroundImage: PropTypes?.string?.isRequired,
  backgroundAlt: PropTypes?.string?.isRequired
};