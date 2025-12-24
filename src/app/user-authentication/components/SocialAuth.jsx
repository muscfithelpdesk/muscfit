'use client';

import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function SocialAuth({ isLoading }) {
  const socialProviders = [
    { id: 'google', name: 'Google', icon: 'GlobeAltIcon', color: 'hover:bg-red-500/10 hover:border-red-500' },
    { id: 'facebook', name: 'Facebook', icon: 'GlobeAltIcon', color: 'hover:bg-blue-500/10 hover:border-blue-500' },
    { id: 'apple', name: 'Apple', icon: 'DevicePhoneMobileIcon', color: 'hover:bg-gray-500/10 hover:border-gray-500' }
  ];

  const handleSocialAuth = (provider) => {
    console.log(`Authenticating with ${provider}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-text-secondary font-caption">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            onClick={() => handleSocialAuth(provider?.id)}
            disabled={isLoading}
            className={`h-12 flex items-center justify-center border border-border rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${provider?.color}`}
            aria-label={`Sign in with ${provider?.name}`}
          >
            <Icon name={provider?.icon} size={20} className="text-text-secondary" />
          </button>
        ))}
      </div>
    </div>
  );
}

SocialAuth.propTypes = {
  isLoading: PropTypes?.bool?.isRequired
};