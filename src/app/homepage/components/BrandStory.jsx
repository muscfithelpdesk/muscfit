import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';

export default function BrandStory({ title, content, image, imageAlt }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <div className="space-y-4 text-xs md:text-sm text-text-secondary">
              {content?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm aspect-square rounded-md overflow-hidden shadow-sharp-lg">
              <AppImage src={image} alt={imageAlt} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

BrandStory.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};
