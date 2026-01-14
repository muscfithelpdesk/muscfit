import PropTypes from 'prop-types';
import ProductCarousel from './ProductCarousel';

export default function FeaturedProducts({ title, subtitle, products }) {
  return (
    <section className="py-6 md:py-10 lg:py-14 bg-white overflow-hidden">
      <div className="max-w-full mx-auto">
        <div className="text-center mb-8 md:mb-12 px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4 italic">
            {title}
          </h2>
          <p className="font-sans text-base md:text-xl text-gray-600 font-medium tracking-wide max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="w-full">
          <ProductCarousel products={products} />
        </div>
      </div>
    </section>
  );
}

FeaturedProducts.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      image: PropTypes.string.isRequired,
      imageAlt: PropTypes.string.isRequired,
      tag: PropTypes.string,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
    })
  ).isRequired,
};
