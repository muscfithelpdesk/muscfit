import PropTypes from 'prop-types';
import TestimonialCard from './TestimonialCard';

export default function Testimonials({ title, subtitle, testimonials }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials?.map((testimonial) => (
            <TestimonialCard key={testimonial?.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

Testimonials.propTypes = {
  title: PropTypes?.string?.isRequired,
  subtitle: PropTypes?.string?.isRequired,
  testimonials: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      role: PropTypes?.string?.isRequired,
      content: PropTypes?.string?.isRequired,
      rating: PropTypes?.number?.isRequired,
      avatar: PropTypes?.string?.isRequired,
      avatarAlt: PropTypes?.string?.isRequired
    })
  )?.isRequired
};