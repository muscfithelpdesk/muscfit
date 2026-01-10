import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
  backgroundAlt,
  mobileHeroImage,
}) {
  return (
    <section className="relative w-full h-[85vh] md:h-screen overflow-hidden group perspective-1000 z-0">
      <div className="absolute inset-0">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0">
          <AppImage
            src={backgroundImage}
            alt={backgroundAlt}
            fill
            className="w-full h-full object-cover object-center transition-transform duration-[3s] group-hover:scale-110"
            priority
          />
        </div>

        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop"
            alt={backgroundAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Graded overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
      </div>

      <div className="relative h-full w-full flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full animate-fade-in-up preserve-3d">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-2 tracking-tighter uppercase italic drop-shadow-2xl">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
            <div className="h-[2px] w-8 md:w-24 bg-white/60 shadow-lg"></div>
            <p className="text-[10px] md:text-xl text-white font-bold tracking-[0.3em] uppercase drop-shadow-md">
              {subtitle}
            </p>
            <div className="h-[2px] w-8 md:w-24 bg-white/60 shadow-lg"></div>
          </div>

          <div className="flex justify-center flex-wrap gap-6 pt-4">
            <Link
              href={ctaPrimary?.href}
              className="px-12 py-4 bg-white text-black font-black text-sm md:text-base tracking-[0.2em] uppercase rounded-none transition-all duration-500 hover:bg-black hover:text-white hover:scale-105 premium-shadow min-w-[180px]"
            >
              {ctaPrimary?.text}
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
    href: PropTypes.string.isRequired,
  }).isRequired,
  ctaSecondary: PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
  backgroundImage: PropTypes.string.isRequired,
  mobileHeroImage: PropTypes.string,
  backgroundAlt: PropTypes.string.isRequired,
};
