import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default function FeaturedProducts({ title, subtitle, products }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

FeaturedProducts.propTypes = {
  title: PropTypes?.string?.isRequired,
  subtitle: PropTypes?.string?.isRequired,
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      originalPrice: PropTypes?.number,
      image: PropTypes?.string?.isRequired,
      imageAlt: PropTypes?.string?.isRequired,
      tag: PropTypes?.string,
      rating: PropTypes?.number?.isRequired,
      reviews: PropTypes?.number?.isRequired
    })
  )?.isRequired
};