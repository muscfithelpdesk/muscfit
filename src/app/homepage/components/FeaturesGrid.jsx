import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function FeaturesGrid({ features }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="flex flex-col items-center text-center p-4 md:p-6 hover:bg-gray-50 rounded-md transition-colors duration-250"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Icon name={feature?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-base md:text-lg font-semibold text-gray-900 mb-2">
                {feature?.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 line-clamp-3">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

FeaturesGrid.propTypes = {
  features: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      icon: PropTypes?.string?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired
    })
  )?.isRequired
};