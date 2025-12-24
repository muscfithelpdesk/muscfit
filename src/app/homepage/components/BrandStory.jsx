import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';

export default function BrandStory({ title, content, image, imageAlt }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              {title}
            </h2>
            <div className="space-y-4 text-sm md:text-base lg:text-lg text-gray-600">
              {content?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-square rounded-md overflow-hidden shadow-sharp-lg">
              <AppImage
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

BrandStory.propTypes = {
  title: PropTypes?.string?.isRequired,
  content: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
  image: PropTypes?.string?.isRequired,
  imageAlt: PropTypes?.string?.isRequired
};