import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary, backgroundImage, backgroundAlt }) {
  return (
    <section className="relative w-full h-[75vh] min-h-[600px] overflow-hidden group perspective-1000">
      <div className="absolute inset-0">
        <AppImage
          src={backgroundImage}
          alt={backgroundAlt}
          className="w-full h-full object-cover object-top transition-transform duration-[3s] group-hover:scale-110 preserve-3d backface-hidden"
          priority
        />
        {/* Graded overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
      </div>

      <div className="relative h-full w-full flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl animate-fade-in-up preserve-3d float-3d">
          <h1 className="font-heading text-7xl md:text-9xl lg:text-[10rem] font-black text-white mb-2 tracking-tighter uppercase italic drop-shadow-2xl">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-10 md:mb-12">
            <div className="h-1 w-12 md:w-32 bg-white shadow-lg"></div>
            <p className="text-sm md:text-2xl text-white font-bold tracking-[0.4em] uppercase drop-shadow-md">
              {subtitle}
            </p>
            <div className="h-1 w-12 md:w-32 bg-white shadow-lg"></div>
          </div>

          <div className="flex justify-center flex-wrap gap-6">
            <Link
              href={ctaPrimary?.href}
              className="px-12 py-5 bg-white text-black font-black tracking-[0.2em] uppercase rounded-none transition-all duration-500 hover:bg-black hover:text-white hover:scale-110 premium-shadow"
            >
              {ctaPrimary?.text}
            </Link>
            <Link
              href={ctaSecondary?.href || '#'}
              className="px-12 py-5 glass-effect text-white font-black tracking-[0.2em] uppercase rounded-none transition-all duration-500 hover:bg-white hover:text-black hover:scale-110 premium-shadow"
            >
              {ctaSecondary?.text || 'EXPLORE'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  ctaPrimary: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }).isRequired,
  ctaSecondary: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  }).isRequired,
  backgroundImage: PropTypes.string.isRequired,
  backgroundAlt: PropTypes.string.isRequired
};