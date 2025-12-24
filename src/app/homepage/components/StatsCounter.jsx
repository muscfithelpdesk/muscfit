import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function StatsCounter({ stats }) {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-900">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats?.map((stat) => (
            <div key={stat?.id} className="text-center">
              <div className="flex justify-center mb-3 md:mb-4">
                <Icon name={stat?.icon} size={32} className="text-primary" />
              </div>
              <div className="font-data text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 whitespace-nowrap">
                {stat?.value}
              </div>
              <p className="text-sm md:text-base text-gray-400 line-clamp-2">
                {stat?.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

StatsCounter.propTypes = {
  stats: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      icon: PropTypes?.string?.isRequired,
      value: PropTypes?.string?.isRequired,
      label: PropTypes?.string?.isRequired
    })
  )?.isRequired
};