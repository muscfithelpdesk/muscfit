'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import ProfileHeader from './ProfileHeader';
import PersonalInfoSection from './PersonalInfoSection';
import OrderHistorySection from './OrderHistorySection';
import WishlistSection from './WishlistSection';
import AddressBookSection from './AddressBookSection';
import AccountSettingsSection from './AccountSettingsSection';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/lib/services/userService';
import { orderService } from '@/lib/services/orderService';
import { wishlistService } from '@/lib/services/wishlistService';

export default function UserProfileInteractive({ initialData }) {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState(initialData?.userData);
  const [orders, setOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [settings, setSettings] = useState(initialData?.settings);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'UserIcon' },
    { id: 'orders', label: 'Order History', icon: 'ShoppingBagIcon', badge: orders?.length },
    { id: 'wishlist', label: 'Wishlist', icon: 'HeartIcon', badge: wishlistItems?.length },
    { id: 'addresses', label: 'Addresses', icon: 'MapPinIcon', badge: addresses?.length },
    { id: 'settings', label: 'Settings', icon: 'Cog6ToothIcon' },
  ];

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      // Redirect if not logged in
      window.location.href = '/user-authentication';
      return;
    }

    if (user) {
      fetchUserData();
    }
  }, [user, authLoading]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const [profile, userOrders, userAddresses, userWishlist] = await Promise.all([
        userService.getProfile(user.id),
        orderService.getUserOrders(user.id),
        userService.getProfile(user.id),
        orderService.getUserOrders(user.id),
        userService.getAddresses(user.id),
        wishlistService.getWishlist(user.id),
      ]);

      if (profile) {
        setUserData({
          name: profile.name || user.user_metadata?.full_name || '',
          email: profile.email || user.email || '',
          phone: profile.phone || user.user_metadata?.phone || '',
          fitnessGoal: profile.fitness_goal || user.user_metadata?.fitness_goal || '',
          dateOfBirth: profile.date_of_birth || '',
          gender: profile.gender || '',
        });
      } else {
        // Fallback to auth metadata if profile doesn't exist yet
        setUserData({
          name: user.user_metadata?.full_name || '',
          email: user.email || '',
          phone: user.user_metadata?.phone || '',
          fitnessGoal: user.user_metadata?.fitness_goal || '',
          dateOfBirth: '',
          gender: '',
        });
      }

      setOrders(userOrders || []);
      setAddresses(userAddresses || []);
      setWishlistItems(userWishlist || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params?.get('tab');
    if (tabParam && tabs?.some((tab) => tab?.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  const calculateCompletionPercentage = () => {
    let completed = 0;
    const total = 6;

    if (userData?.name) completed++;
    if (userData?.email) completed++;
    if (userData?.phone) completed++;
    if (userData?.dateOfBirth) completed++;
    if (userData?.gender) completed++;
    if (addresses?.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const handleSavePersonalInfo = async (updatedData) => {
    if (!user) return;
    try {
      const result = await userService.updateProfile(user.id, {
        name: updatedData.name,
        email: updatedData.email,
        phone: updatedData.phone,
        fitness_goal: updatedData.fitnessGoal,
        date_of_birth: updatedData.dateOfBirth,
        gender: updatedData.gender,
      });

      if (result.success) {
        setUserData((prev) => ({ ...prev, ...updatedData }));
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    if (!user) return;
    try {
      await wishlistService.removeFromWishlist(user.id, itemId);
      setWishlistItems((prev) => prev?.filter((item) => item?.id !== itemId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
  };

  const handleAddAddress = async (newAddress) => {
    if (!user) return;
    try {
      const result = await userService.saveAddress(user.id, {
        name: newAddress.name,
        phone: newAddress.phone,
        address_line1: newAddress.addressLine1,
        address_line2: newAddress.addressLine2,
        city: newAddress.city,
        state: newAddress.state,
        pincode: newAddress.pincode,
        is_default: newAddress.isDefault,
      });

      if (result.success) {
        fetchUserData(); // Refresh addresses
      }
    } catch (error) {
      console.error('Failed to add address:', error);
    }
  };

  const handleEditAddress = async (addressId, updatedAddress) => {
    if (!user) return;
    try {
      const result = await userService.saveAddress(user.id, {
        id: addressId,
        name: updatedAddress.name,
        phone: updatedAddress.phone,
        address_line1: updatedAddress.addressLine1,
        address_line2: updatedAddress.addressLine2,
        city: updatedAddress.city,
        state: updatedAddress.state,
        pincode: updatedAddress.pincode,
        is_default: updatedAddress.isDefault,
      });

      if (result.success) {
        fetchUserData();
      }
    } catch (error) {
      console.error('Failed to update address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const result = await userService.deleteAddress(addressId);
      if (result.success) {
        setAddresses((prev) => prev?.filter((addr) => addr?.id !== addressId));
      }
    } catch (error) {
      console.error('Failed to delete address:', error);
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    if (!user) return;
    try {
      // Find current default and unset it, or just let backend handle if logic exists
      // Simpler: find the address, update it to default. Supabase/Service handles the rest.
      const addressToUpdate = addresses.find((a) => a.id === addressId);
      if (addressToUpdate) {
        const result = await userService.saveAddress(user.id, {
          ...addressToUpdate,
          is_default: true,
        });
        if (result.success) {
          fetchUserData();
        }
      }
    } catch (error) {
      console.error('Failed to set default address:', error);
    }
  };

  const handleUpdateSettings = (updatedSettings) => {
    setSettings((prev) => ({ ...prev, ...updatedSettings }));
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icon name="ArrowPathIcon" size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null; // Should redirect via effect

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader userData={userData} completionPercentage={calculateCompletionPercentage()} />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        {/* Tabs Navigation */}
        <div className="mb-6 md:mb-8">
          <div className="border-b border-border overflow-x-auto">
            <nav className="flex gap-2 md:gap-4 min-w-max" aria-label="Profile tabs">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 h-12 font-heading font-medium text-sm md:text-base whitespace-nowrap border-b-2 transition-all duration-250 flex-shrink-0 ${activeTab === tab?.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                    }`}
                >
                  <Icon name={tab?.icon} size={20} />
                  <span>{tab?.label}</span>
                  {tab?.badge !== undefined && tab?.badge > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full font-data">
                      {tab?.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'personal' && (
            <PersonalInfoSection userData={userData} onSave={handleSavePersonalInfo} />
          )}

          {activeTab === 'orders' && <OrderHistorySection orders={orders} />}

          {activeTab === 'wishlist' && (
            <WishlistSection
              wishlistItems={wishlistItems}
              onRemove={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
            />
          )}

          {activeTab === 'addresses' && (
            <AddressBookSection
              addresses={addresses}
              onAddAddress={handleAddAddress}
              onEditAddress={handleEditAddress}
              onDeleteAddress={handleDeleteAddress}
              onSetDefault={handleSetDefaultAddress}
            />
          )}

          {activeTab === 'settings' && (
            <AccountSettingsSection settings={settings} onUpdateSettings={handleUpdateSettings} />
          )}
        </div>
      </div>
    </div>
  );
}

UserProfileInteractive.propTypes = {
  initialData: PropTypes.shape({
    userData: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      fitnessGoal: PropTypes.string,
      dateOfBirth: PropTypes.string,
      gender: PropTypes.string,
    }).isRequired,
    orders: PropTypes.array.isRequired,
    wishlistItems: PropTypes.array.isRequired,
    addresses: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
  }).isRequired,
};
