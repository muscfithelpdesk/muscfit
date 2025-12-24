'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/AppIcon';

export default function PromoCodeInput({ onPromoApplied }) {
  const [promoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [appliedCode, setAppliedCode] = useState(null);

  const validatePromoCode = async () => {
    if (!promoCode?.trim()) {
      setMessage({ type: 'error', text: 'Please enter a promo code' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const { data, error } = await supabase
        ?.rpc('validate_promo_code', { promo_code_text: promoCode?.trim()?.toUpperCase() });

      if (error) throw error;

      const result = data?.[0];

      if (result?.is_valid) {
        setAppliedCode({
          code: promoCode?.trim()?.toUpperCase(),
          discount: result?.discount_percentage
        });
        setMessage({ type: 'success', text: result?.message });
        onPromoApplied?.(result?.discount_percentage);
        setPromoCode('');
      } else {
        setMessage({ type: 'error', text: result?.message });
        onPromoApplied?.(0);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err?.message || 'Failed to validate promo code' });
      onPromoApplied?.(0);
    } finally {
      setLoading(false);
    }
  };

  const removePromoCode = () => {
    setAppliedCode(null);
    setMessage(null);
    onPromoApplied?.(0);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
          placeholder="Enter promo code"
          disabled={appliedCode || loading}
          className="flex-1 px-4 py-2 bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          onKeyPress={(e) => {
            if (e?.key === 'Enter') {
              e?.preventDefault();
              validatePromoCode();
            }
          }}
        />
        {!appliedCode && (
          <button
            onClick={validatePromoCode}
            disabled={loading || !promoCode?.trim()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? 'Validating...' : 'Apply'}
          </button>
        )}
      </div>

      {message && (
        <div className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${
          message?.type === 'success' ?'bg-success/10 text-success border border-success/20' :'bg-error/10 text-error border border-error/20'
        }`}>
          <Icon 
            name={message?.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'} 
            size={16} 
          />
          <span>{message?.text}</span>
        </div>
      )}

      {appliedCode && (
        <div className="flex items-center justify-between px-4 py-3 bg-success/10 border border-success/20 rounded">
          <div className="flex items-center gap-2">
            <Icon name="TicketIcon" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-success">{appliedCode?.code}</p>
              <p className="text-xs text-success/70">{appliedCode?.discount}% discount applied</p>
            </div>
          </div>
          <button
            onClick={removePromoCode}
            className="p-1 hover:bg-success/20 rounded transition-colors"
            title="Remove promo code"
          >
            <Icon name="XMarkIcon" size={16} className="text-success" />
          </button>
        </div>
      )}
    </div>
  );
}

PromoCodeInput.propTypes = {
  onPromoApplied: PropTypes?.func
};