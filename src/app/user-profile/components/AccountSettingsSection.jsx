'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function AccountSettingsSection({ settings, onUpdateSettings }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [notifications, setNotifications] = useState(settings?.notifications);

  const handlePasswordChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    if (passwordErrors?.[name]) {
      setPasswordErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev?.[field]
    }));
  };

  const validatePasswordForm = () => {
    const errors = {};

    if (!passwordData?.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordData?.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordData?.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setPasswordErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    
    if (validatePasswordForm()) {
      setIsChangingPassword(true);
      setTimeout(() => {
        onUpdateSettings({ password: passwordData?.newPassword });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setIsChangingPassword(false);
      }, 1000);
    }
  };

  const handleNotificationChange = (key) => {
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications?.[key]
    };
    setNotifications(updatedNotifications);
    onUpdateSettings({ notifications: updatedNotifications });
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-card border border-border rounded-md p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            Change Password
          </h2>
          <Icon name="LockClosedIcon" size={24} className="text-primary" />
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-2">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords?.current ? 'text' : 'password'}
                id="currentPassword"
                name="currentPassword"
                value={passwordData?.currentPassword}
                onChange={handlePasswordChange}
                className={`w-full h-12 px-4 pr-12 bg-input text-foreground border ${
                  passwordErrors?.currentPassword ? 'border-error' : 'border-border'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250`}
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-colors duration-250"
              >
                <Icon name={showPasswords?.current ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {passwordErrors?.currentPassword && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                {passwordErrors?.currentPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords?.new ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={passwordData?.newPassword}
                onChange={handlePasswordChange}
                className={`w-full h-12 px-4 pr-12 bg-input text-foreground border ${
                  passwordErrors?.newPassword ? 'border-error' : 'border-border'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-colors duration-250"
              >
                <Icon name={showPasswords?.new ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {passwordErrors?.newPassword && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                {passwordErrors?.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showPasswords?.confirm ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData?.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full h-12 px-4 pr-12 bg-input text-foreground border ${
                  passwordErrors?.confirmPassword ? 'border-error' : 'border-border'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-foreground transition-colors duration-250"
              >
                <Icon name={showPasswords?.confirm ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {passwordErrors?.confirmPassword && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                {passwordErrors?.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isChangingPassword}
            className="flex items-center gap-2 px-6 h-12 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-text-secondary text-primary-foreground font-heading font-semibold rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
          >
            {isChangingPassword ? (
              <>
                <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Icon name="CheckIcon" size={20} />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>
      {/* Notification Preferences */}
      <div className="bg-card border border-border rounded-md p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            Notification Preferences
          </h2>
          <Icon name="BellIcon" size={24} className="text-primary" />
        </div>

        <div className="space-y-4">
          {[
            { key: 'orderUpdates', label: 'Order Updates', description: 'Get notified about your order status' },
            { key: 'promotions', label: 'Promotions & Offers', description: 'Receive exclusive deals and discounts' },
            { key: 'newArrivals', label: 'New Arrivals', description: 'Be the first to know about new products' },
            { key: 'newsletter', label: 'Newsletter', description: 'Weekly fitness tips and product highlights' },
          ]?.map((item) => (
            <div key={item?.key} className="flex items-start justify-between py-4 border-b border-border last:border-0">
              <div className="flex-1">
                <h4 className="font-heading text-base font-semibold text-foreground mb-1">
                  {item?.label}
                </h4>
                <p className="text-sm text-text-secondary">
                  {item?.description}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(item?.key)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  notifications?.[item?.key] ? 'bg-primary' : 'bg-muted'
                }`}
                role="switch"
                aria-checked={notifications?.[item?.key]}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-250 ${
                    notifications?.[item?.key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Privacy Settings */}
      <div className="bg-card border border-border rounded-md p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
            Privacy & Security
          </h2>
          <Icon name="ShieldCheckIcon" size={24} className="text-primary" />
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-surface hover:bg-muted border border-border rounded-md transition-all duration-250 text-left">
            <div className="flex items-center gap-3">
              <Icon name="DocumentTextIcon" size={20} className="text-text-secondary" />
              <div>
                <h4 className="font-heading text-sm font-semibold text-foreground">Download My Data</h4>
                <p className="text-xs text-text-secondary mt-1">Get a copy of your account data</p>
              </div>
            </div>
            <Icon name="ArrowDownTrayIcon" size={20} className="text-text-secondary" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-surface hover:bg-muted border border-border rounded-md transition-all duration-250 text-left">
            <div className="flex items-center gap-3">
              <Icon name="TrashIcon" size={20} className="text-error" />
              <div>
                <h4 className="font-heading text-sm font-semibold text-error">Delete Account</h4>
                <p className="text-xs text-text-secondary mt-1">Permanently delete your account</p>
              </div>
            </div>
            <Icon name="ChevronRightIcon" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}

AccountSettingsSection.propTypes = {
  settings: PropTypes?.shape({
    notifications: PropTypes?.shape({
      orderUpdates: PropTypes?.bool?.isRequired,
      promotions: PropTypes?.bool?.isRequired,
      newArrivals: PropTypes?.bool?.isRequired,
      newsletter: PropTypes?.bool?.isRequired,
    })?.isRequired,
  })?.isRequired,
  onUpdateSettings: PropTypes?.func?.isRequired,
};