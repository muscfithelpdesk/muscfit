import PropTypes from 'prop-types';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';


export default function CategoryShowcase({ categories }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-background">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Shop By Category
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
            Discover premium athletic wear designed for peak performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories?.map((category) => (
            <Link
              key={category?.id}
              href={category?.href}
              className="group relative overflow-hidden rounded-lg bg-surface border border-border shadow-[0_0_20px_rgba(0,0,0,0.05)] hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] hover:border-border transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <AppImage
                  src={category?.image}
                  alt={category?.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-5 md:p-6 lg:p-7">
                <div className="w-full">
                  <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                    {category?.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 mb-4 md:mb-5 line-clamp-2">
                    {category?.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm md:text-base font-heading font-semibold text-black bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full group-hover:bg-white group-hover:gap-3 transition-all duration-300">
                    Shop Now
                    <Icon name="ArrowRightIcon" size={20} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

CategoryShowcase.propTypes = {
  categories: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      href: PropTypes?.string?.isRequired
    })
  )?.isRequired
};