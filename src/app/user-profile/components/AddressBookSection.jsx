'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function AddressBookSection({ addresses, onAddAddress, onEditAddress, onDeleteAddress, onSetDefault }) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (editingId) {
      onEditAddress(editingId, formData);
      setEditingId(null);
    } else {
      onAddAddress(formData);
      setIsAddingNew(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address?.id);
    setIsAddingNew(true);
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="bg-card border border-border rounded-md p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Address Book
        </h2>
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm"
          >
            <Icon name="PlusIcon" size={18} />
            Add New Address
          </button>
        )}
      </div>
      {/* Add/Edit Form */}
      {isAddingNew && (
        <div className="bg-surface border border-border rounded-md p-4 md:p-6 mb-6">
          <h3 className="font-heading text-base md:text-lg font-semibold text-foreground mb-4">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  required
                  className="w-full h-12 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
                  placeholder="Enter full name"
                />
              </div>
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
                  required
                  className="w-full h-12 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div>
              <label htmlFor="addressLine1" className="block text-sm font-medium text-foreground mb-2">
                Address Line 1 *
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData?.addressLine1}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
                placeholder="House No., Building Name"
              />
            </div>

            <div>
              <label htmlFor="addressLine2" className="block text-sm font-medium text-foreground mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData?.addressLine2}
                onChange={handleChange}
                className="w-full h-12 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
                placeholder="Road Name, Area, Colony"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData?.city}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
                  placeholder="City"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData?.state}
                  onChange={handleChange}
                  required
                  className="w-full h-12 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
                  placeholder="State"
                />
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-foreground mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData?.pincode}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{6}"
                  className="w-full h-12 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-250"
                  placeholder="123456"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData?.isDefault}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="isDefault" className="text-sm text-foreground cursor-pointer">
                Set as default address
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
              >
                <Icon name="CheckIcon" size={20} />
                {editingId ? 'Update Address' : 'Save Address'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 h-12 bg-surface hover:bg-muted text-foreground border border-border rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95"
              >
                <Icon name="XMarkIcon" size={20} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses?.map((address) => (
          <div
            key={address?.id}
            className={`bg-surface border rounded-md p-4 md:p-6 ${
              address?.isDefault ? 'border-primary' : 'border-border'
            }`}
          >
            {address?.isDefault && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-sm mb-3">
                <Icon name="CheckCircleIcon" size={14} />
                Default Address
              </span>
            )}
            
            <h4 className="font-heading text-base font-semibold text-foreground mb-2">
              {address?.name}
            </h4>
            <p className="text-sm text-text-secondary mb-1">{address?.phone}</p>
            <p className="text-sm text-foreground">
              {address?.addressLine1}
              {address?.addressLine2 && `, ${address?.addressLine2}`}
            </p>
            <p className="text-sm text-foreground">
              {address?.city}, {address?.state} - {address?.pincode}
            </p>

            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              <button
                onClick={() => handleEdit(address)}
                className="flex items-center gap-1 px-3 h-9 bg-surface hover:bg-muted text-foreground border border-border rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm"
              >
                <Icon name="PencilIcon" size={16} />
                Edit
              </button>
              <button
                onClick={() => onDeleteAddress(address?.id)}
                className="flex items-center gap-1 px-3 h-9 bg-surface hover:bg-error/10 text-text-secondary hover:text-error border border-border hover:border-error/50 rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm"
              >
                <Icon name="TrashIcon" size={16} />
                Delete
              </button>
              {!address?.isDefault && (
                <button
                  onClick={() => onSetDefault(address?.id)}
                  className="flex items-center gap-1 px-3 h-9 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-md transition-all duration-250 hover:scale-[0.98] active:scale-95 text-sm"
                >
                  <Icon name="CheckCircleIcon" size={16} />
                  Set Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {addresses?.length === 0 && !isAddingNew && (
        <div className="text-center py-12">
          <Icon name="MapPinIcon" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary text-sm md:text-base">No addresses saved yet</p>
        </div>
      )}
    </div>
  );
}

AddressBookSection.propTypes = {
  addresses: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      phone: PropTypes?.string?.isRequired,
      addressLine1: PropTypes?.string?.isRequired,
      addressLine2: PropTypes?.string,
      city: PropTypes?.string?.isRequired,
      state: PropTypes?.string?.isRequired,
      pincode: PropTypes?.string?.isRequired,
      isDefault: PropTypes?.bool?.isRequired,
    })
  )?.isRequired,
  onAddAddress: PropTypes?.func?.isRequired,
  onEditAddress: PropTypes?.func?.isRequired,
  onDeleteAddress: PropTypes?.func?.isRequired,
  onSetDefault: PropTypes?.func?.isRequired,
};