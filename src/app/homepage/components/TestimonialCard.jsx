import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="w-full min-w-0 bg-white p-4 md:p-6 lg:p-8 rounded-md shadow-sharp hover:shadow-sharp-lg transition-all duration-250">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)]?.map((_, index) => (
          <Icon
            key={index}
            name="StarIcon"
            size={18}
            variant={index < testimonial?.rating ? 'solid' : 'outline'}
            className={index < testimonial?.rating ? 'text-yellow-500' : 'text-gray-300'}
          />
        ))}
      </div>
      <div className="mb-4">
        <Icon name="ChatBubbleLeftIcon" size={32} className="text-primary/20" />
      </div>
      <p className="text-sm md:text-base text-gray-700 mb-6 line-clamp-4">
        {testimonial?.content}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <AppImage
            src={testimonial?.avatar}
            alt={testimonial?.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="font-heading text-sm md:text-base font-semibold text-gray-900 truncate">
            {testimonial?.name}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 truncate">
            {testimonial?.role}
          </p>
        </div>
      </div>
    </div>
  );
}

TestimonialCard.propTypes = {
  testimonial: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    role: PropTypes?.string?.isRequired,
    content: PropTypes?.string?.isRequired,
    rating: PropTypes?.number?.isRequired,
    avatar: PropTypes?.string?.isRequired,
    avatarAlt: PropTypes?.string?.isRequired
  })?.isRequired
};