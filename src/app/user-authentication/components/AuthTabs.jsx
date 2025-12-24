'use client';


import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function AuthTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'login', label: 'Sign In', icon: 'ArrowRightOnRectangleIcon' },
    { id: 'register', label: 'Create Account', icon: 'UserPlusIcon' }
  ];

  return (
    <div className="flex gap-2 p-1 bg-surface rounded-lg mb-6 md:mb-8">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-md font-heading font-semibold text-sm md:text-base transition-all duration-250 ${
            activeTab === tab?.id
              ? 'bg-primary text-primary-foreground shadow-sharp'
              : 'text-text-secondary hover:text-foreground hover:bg-muted'
          }`}
        >
          <Icon name={tab?.icon} size={20} />
          <span>{tab?.label}</span>
        </button>
      ))}
    </div>
  );
}

AuthTabs.propTypes = {
  activeTab: PropTypes?.oneOf(['login', 'register'])?.isRequired,
  onTabChange: PropTypes?.func?.isRequired
};