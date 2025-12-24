'use client';

import { useState, useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/AppIcon';

export default function AdminPromoManagement() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState({
    code: '',
    discount_percentage: 10,
    max_uses: 100,
    valid_from: new Date()?.toISOString()?.slice(0, 16),
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)?.toISOString()?.slice(0, 16),
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchPromoCodes();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      
      if (!user) {
        setError('Please log in to access this page');
        setLoading(false);
        return;
      }

      const isUserAdmin = user?.user_metadata?.role === 'admin' || 
                         user?.app_metadata?.role === 'admin';
      
      setIsAdmin(isUserAdmin);
      
      if (!isUserAdmin) {
        setError('Access denied. Admin privileges required.');
      }
      
      setLoading(false);
    } catch (err) {
      setError(err?.message || 'Failed to verify admin status');
      setLoading(false);
    }
  };

  const fetchPromoCodes = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        ?.from('promo_codes')
        ?.select('*')
        ?.order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPromoCodes(data || []);
      setError(null);
    } catch (err) {
      setError(err?.message || 'Failed to fetch promo codes');
    } finally {
      setLoading(false);
    }
  };

  const createPromoCode = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase?.auth?.getUser();
      
      const { data, error: createError } = await supabase
        ?.from('promo_codes')
        ?.insert([{
          ...newPromoCode,
          created_by: user?.id,
          status: 'active'
        }])
        ?.select()
        ?.single();

      if (createError) throw createError;

      setPromoCodes([data, ...promoCodes]);
      setShowCreateModal(false);
      setNewPromoCode({
        code: '',
        discount_percentage: 10,
        max_uses: 100,
        valid_from: new Date()?.toISOString()?.slice(0, 16),
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)?.toISOString()?.slice(0, 16),
      });
      setError(null);
    } catch (err) {
      setError(err?.message || 'Failed to create promo code');
    } finally {
      setLoading(false);
    }
  };

  const updatePromoCodeStatus = async (id, newStatus) => {
    try {
      const { error: updateError } = await supabase
        ?.from('promo_codes')
        ?.update({ status: newStatus })
        ?.eq('id', id);

      if (updateError) throw updateError;

      setPromoCodes(promoCodes?.map(code => 
        code?.id === id ? { ...code, status: newStatus } : code
      ));
      setError(null);
    } catch (err) {
      setError(err?.message || 'Failed to update promo code status');
    }
  };

  const deletePromoCode = async (id) => {
    if (!confirm('Are you sure you want to delete this promo code?')) return;

    try {
      const { error: deleteError } = await supabase
        ?.from('promo_codes')
        ?.delete()
        ?.eq('id', id);

      if (deleteError) throw deleteError;

      setPromoCodes(promoCodes?.filter(code => code?.id !== id));
      setError(null);
    } catch (err) {
      setError(err?.message || 'Failed to delete promo code');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'expired':
        return 'text-error';
      case 'disabled':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getUsagePercentage = (currentUses, maxUses) => {
    return (currentUses / maxUses) * 100;
  };

  if (loading && !promoCodes?.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Icon name="ShieldExclamationIcon" size={64} className="text-error mx-auto mb-4" />
          <h1 className="text-h3 font-heading mb-2">Access Denied</h1>
          <p className="text-text-secondary mb-4">{error || 'You do not have permission to access this page.'}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-h2 font-heading mb-2">Promo Code Management</h1>
            <p className="text-text-secondary">Create and manage promotional discount codes</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            <Icon name="PlusIcon" size={20} />
            Create Promo Code
          </button>
        </div>

        {error && (
          <div className="bg-error/10 border border-error text-error px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {promoCodes?.map(code => (
            <div key={code?.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-h4 font-heading">{code?.code}</h3>
                    <span className={`text-sm font-caption ${getStatusColor(code?.status)}`}>
                      {code?.status?.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-text-secondary mb-3">
                    {code?.discount_percentage}% discount
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-text-secondary">Valid From</p>
                      <p className="text-text-primary font-data">
                        {new Date(code?.valid_from)?.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Valid Until</p>
                      <p className="text-text-primary font-data">
                        {new Date(code?.valid_until)?.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary">Usage</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full transition-all duration-300"
                            style={{ width: `${getUsagePercentage(code?.current_uses, code?.max_uses)}%` }}
                          />
                        </div>
                        <span className="text-text-primary font-data whitespace-nowrap">
                          {code?.current_uses} / {code?.max_uses}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {code?.status === 'active' && (
                    <button
                      onClick={() => updatePromoCodeStatus(code?.id, 'disabled')}
                      className="p-2 text-warning hover:bg-warning/10 rounded transition-colors"
                      title="Disable"
                    >
                      <Icon name="PauseIcon" size={20} />
                    </button>
                  )}
                  {code?.status === 'disabled' && (
                    <button
                      onClick={() => updatePromoCodeStatus(code?.id, 'active')}
                      className="p-2 text-success hover:bg-success/10 rounded transition-colors"
                      title="Enable"
                    >
                      <Icon name="PlayIcon" size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => deletePromoCode(code?.id)}
                    className="p-2 text-error hover:bg-error/10 rounded transition-colors"
                    title="Delete"
                  >
                    <Icon name="TrashIcon" size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {promoCodes?.length === 0 && !loading && (
          <div className="text-center py-12">
            <Icon name="TicketIcon" size={64} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-h4 font-heading mb-2">No Promo Codes Yet</h3>
            <p className="text-text-secondary mb-4">Create your first promo code to get started</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Create Promo Code
            </button>
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border border-border rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-h3 font-heading">Create Promo Code</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>

              <form onSubmit={createPromoCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Code
                  </label>
                  <input
                    type="text"
                    value={newPromoCode?.code}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, code: e?.target?.value?.toUpperCase() })}
                    className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="SUMMER2024"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Discount Percentage (%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newPromoCode?.discount_percentage}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, discount_percentage: parseInt(e?.target?.value) })}
                    className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Maximum Uses
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newPromoCode?.max_uses}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, max_uses: parseInt(e?.target?.value) })}
                    className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Valid From
                  </label>
                  <input
                    type="datetime-local"
                    value={newPromoCode?.valid_from}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, valid_from: e?.target?.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Valid Until
                  </label>
                  <input
                    type="datetime-local"
                    value={newPromoCode?.valid_until}
                    onChange={(e) => setNewPromoCode({ ...newPromoCode, valid_until: e?.target?.value })}
                    className="w-full px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-muted text-text-primary rounded hover:bg-muted/80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}