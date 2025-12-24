import Icon from '@/components/ui/AppIcon';

export default function TrustSignals() {
  const trustFeatures = [
    { icon: 'ShieldCheckIcon', text: 'Secure SSL Encryption' },
    { icon: 'LockClosedIcon', text: 'Privacy Protected' },
    { icon: 'CheckBadgeIcon', text: 'Verified Platform' }
  ];

  return (
    <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <Icon name={feature?.icon} size={16} className="text-success" />
            <span className="text-xs text-text-secondary">{feature?.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}