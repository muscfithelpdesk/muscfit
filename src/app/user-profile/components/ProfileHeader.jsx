'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ProfileHeader({ userData, completionPercentage }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                <Icon name="UserCircleIcon" size={48} className="text-text-secondary" />
              </div>
              {completionPercentage === 100 && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-success rounded-full border-2 border-background flex items-center justify-center">
                  <Icon name="BoltIcon" size={16} className="text-success-foreground" />
                </div>
              )}
            </div>
            
            <div>
              <h1 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                {userData?.name}
              </h1>
              <p className="text-sm md:text-base text-text-secondary mt-1">
                {userData?.email}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 w-32 md:w-40 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-250"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <span className="text-xs md:text-sm font-data text-text-secondary">
                  {completionPercentage}% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 md:px-6 h-10 md:h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
            >
              <Icon name="PencilIcon" size={18} />
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-surface hover:bg-muted text-text-secondary hover:text-primary border border-border rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95">
              <Icon name="Cog6ToothIcon" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  userData: PropTypes?.shape({
    name: PropTypes?.string?.isRequired,
    email: PropTypes?.string?.isRequired,
  })?.isRequired,
  completionPercentage: PropTypes?.number?.isRequired,
};