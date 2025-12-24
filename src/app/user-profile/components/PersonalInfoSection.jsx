'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PersonalInfoSection({ userData, onSave }) {
  const [formData, setFormData] = useState({
    name: userData?.name,
    email: userData?.email,
    phone: userData?.phone,
    dateOfBirth: userData?.dateOfBirth,
    gender: userData?.gender,
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      setIsSaving(true);
      setTimeout(() => {
        onSave(formData);
        setIsSaving(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-card border border-border rounded-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Personal Information
        </h2>
        <Icon name="UserIcon" size={24} className="text-primary" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              className={`w-full h-12 px-4 bg-input text-foreground border ${
                errors?.name ? 'border-error' : 'border-border'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250`}
              placeholder="Enter your full name"
            />
            {errors?.name && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                {errors?.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className={`w-full h-12 px-4 bg-input text-foreground border ${
                errors?.email ? 'border-error' : 'border-border'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250`}
              placeholder="your.email@example.com"
            />
            {errors?.email && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                {errors?.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              className={`w-full h-12 px-4 bg-input text-foreground border ${
                errors?.phone ? 'border-error' : 'border-border'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250`}
              placeholder="9876543210"
            />
            {errors?.phone && (
              <p className="text-xs text-error mt-1 flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                {errors?.phone}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-foreground mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData?.dateOfBirth}
              onChange={handleChange}
              className="w-full h-12 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
            />
          </div>

          {/* Gender */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Gender
            </label>
            <div className="flex flex-wrap gap-3">
              {['Male', 'Female', 'Other', 'Prefer not to say']?.map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData?.gender === option}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 md:px-8 h-12 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-text-secondary text-primary-foreground font-heading font-semibold rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
          >
            {isSaving ? (
              <>
                <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Icon name="CheckIcon" size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

PersonalInfoSection.propTypes = {
  userData: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    email: PropTypes?.string?.isRequired,
    phone: PropTypes?.string?.isRequired,
    dateOfBirth: PropTypes?.string,
    gender: PropTypes?.string,
  })?.isRequired,
  onSave: PropTypes?.func?.isRequired,
};