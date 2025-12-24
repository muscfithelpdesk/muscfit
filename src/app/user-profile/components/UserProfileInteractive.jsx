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

export default function UserProfileInteractive({ initialData }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState(initialData?.userData);
  const [orders, setOrders] = useState(initialData?.orders);
  const [wishlistItems, setWishlistItems] = useState(initialData?.wishlistItems);
  const [addresses, setAddresses] = useState(initialData?.addresses);
  const [settings, setSettings] = useState(initialData?.settings);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'UserIcon' },
    { id: 'orders', label: 'Order History', icon: 'ShoppingBagIcon', badge: orders?.length },
    { id: 'wishlist', label: 'Wishlist', icon: 'HeartIcon', badge: wishlistItems?.length },
    { id: 'addresses', label: 'Addresses', icon: 'MapPinIcon', badge: addresses?.length },
    { id: 'settings', label: 'Settings', icon: 'Cog6ToothIcon' },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params?.get('tab');
    if (tabParam && tabs?.some(tab => tab?.id === tabParam)) {
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

  const handleSavePersonalInfo = (updatedData) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleAddToCart = (item) => {
    console.log('Adding to cart:', item);
  };

  const handleAddAddress = (newAddress) => {
    const address = {
      ...newAddress,
      id: `addr_${Date.now()}`,
    };
    setAddresses(prev => [...prev, address]);
  };

  const handleEditAddress = (addressId, updatedAddress) => {
    setAddresses(prev =>
      prev?.map(addr => (addr?.id === addressId ? { ...addr, ...updatedAddress } : addr))
    );
  };

  const handleDeleteAddress = (addressId) => {
    setAddresses(prev => prev?.filter(addr => addr?.id !== addressId));
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(prev =>
      prev?.map(addr => ({
        ...addr,
        isDefault: addr?.id === addressId,
      }))
    );
  };

  const handleUpdateSettings = (updatedSettings) => {
    setSettings(prev => ({ ...prev, ...updatedSettings }));
  };

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader 
        userData={userData} 
        completionPercentage={calculateCompletionPercentage()} 
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        {/* Tabs Navigation */}
        <div className="mb-6 md:mb-8">
          <div className="border-b border-border overflow-x-auto">
            <nav className="flex gap-2 md:gap-4 min-w-max" aria-label="Profile tabs">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 h-12 font-heading font-medium text-sm md:text-base whitespace-nowrap border-b-2 transition-all duration-250 flex-shrink-0 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
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
            <PersonalInfoSection 
              userData={userData} 
              onSave={handleSavePersonalInfo} 
            />
          )}
          
          {activeTab === 'orders' && (
            <OrderHistorySection orders={orders} />
          )}
          
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
            <AccountSettingsSection
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
            />
          )}
        </div>
      </div>
    </div>
  );
}

UserProfileInteractive.propTypes = {
  initialData: PropTypes?.shape({
    userData: PropTypes?.shape({
      name: PropTypes?.string?.isRequired,
      email: PropTypes?.string?.isRequired,
      phone: PropTypes?.string?.isRequired,
      dateOfBirth: PropTypes?.string,
      gender: PropTypes?.string,
    })?.isRequired,
    orders: PropTypes?.array?.isRequired,
    wishlistItems: PropTypes?.array?.isRequired,
    addresses: PropTypes?.array?.isRequired,
    settings: PropTypes?.object?.isRequired,
  })?.isRequired,
};