import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary, backgroundImage, backgroundAlt }) {
  return (
    <section className="relative w-full h-[65vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <AppImage
          src={backgroundImage}
          alt={backgroundAlt}
          className="w-full h-full object-cover object-top"
          priority
        />
        {/* Darker overlay for better text contrast, similar to Fuark */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative h-full w-full flex flex-col justify-center items-center text-center px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl animate-fade-in-up">
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black text-white mb-2 tracking-tighter uppercase italic">
            {title}
          </h1>

          <div className="flex items-center justify-center gap-4 mb-10 md:mb-12">
            <div className="h-px w-12 md:w-24 bg-white/60"></div>
            <p className="text-sm md:text-xl text-white font-medium tracking-[0.3em] uppercase">
              {subtitle}
            </p>
            <div className="h-px w-12 md:w-24 bg-white/60"></div>
          </div>

          <div className="flex justify-center">
            <Link
              href={ctaPrimary?.href}
              className="group relative px-10 py-4 bg-transparent border border-white text-white font-heading font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black"
            >
              <span className="relative z-10">{ctaPrimary?.text}</span>
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