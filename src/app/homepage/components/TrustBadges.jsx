import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function TrustBadges({ badges }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white border-y border-gray-200">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges?.map((badge) => (
            <div key={badge?.id} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <Icon name={badge?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-sm md:text-base font-semibold text-gray-900 mb-1">
                {badge?.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                {badge?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

TrustBadges.propTypes = {
  badges: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      icon: PropTypes?.string?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired
    })
  )?.isRequired
};