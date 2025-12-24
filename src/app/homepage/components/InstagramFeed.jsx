import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function InstagramFeed({ title, handle, images }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            {title}
          </h2>
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm md:text-base text-primary hover:text-primary/80 font-heading font-semibold transition-colors duration-250"
          >
            <Icon name="AtSymbolIcon" size={20} />
            {handle}
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {images?.map((image) => (
            <a
              key={image?.id}
              href={image?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              <AppImage
                src={image?.src}
                alt={image?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-250"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-250 flex items-center justify-center">
                <Icon
                  name="HeartIcon"
                  size={32}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-250"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

InstagramFeed.propTypes = {
  title: PropTypes?.string?.isRequired,
  handle: PropTypes?.string?.isRequired,
  images: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      src: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      link: PropTypes?.string?.isRequired
    })
  )?.isRequired
};