'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/AppIcon';

export default function LoginForm({ identifier, authMethod, onEdit }) {
  const router = useRouter();
  const { signIn, verifyOTP } = useAuth();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    let result;
    if (authMethod === 'phone') {
      result = await verifyOTP(identifier, code);
    } else {
      result = await signIn(identifier, code);
    }

    if (result?.success) {
      router?.push('/user-profile');
    } else {
      setError(result?.error || 'Authentication failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-center h-full">
      <div className="mb-8">
        <button
          onClick={onEdit}
          className="text-xs font-bold text-gray-400 flex items-center gap-1 hover:text-black transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={14} />
          {identifier}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-lg animate-shake">
            <p className="text-red-600 text-xs font-bold flex items-center gap-2">
              <Icon name="ExclamationCircleIcon" size={16} />
              {error}
            </p>
          </div>
        )}

        <div className="relative group">
          <input
            type={authMethod === 'phone' ? 'text' : 'password'}
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            autoFocus
            className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-black outline-none transition-all duration-300 text-lg font-medium peer placeholder-transparent"
            placeholder={authMethod === 'phone' ? 'Enter 6-digit OTP' : 'Enter Password'}
          />
          <label className="absolute left-0 -top-3.5 text-gray-500 text-xs transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs pointer-events-none">
            {authMethod === 'phone' ? 'Enter OTP' : 'Enter Password'}
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-black text-white font-black text-sm tracking-widest uppercase hover:bg-gray-800 transition-all rounded-sm shadow-lg disabled:bg-gray-400 group relative overflow-hidden"
        >
          <span className="relative z-10">{loading ? 'VERIFYING...' : 'LOGIN'}</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </form>

      {authMethod === 'phone' && (
        <div className="mt-6 text-center">
          <button className="text-xs font-bold text-gray-500 hover:text-black transition-colors">
            Resend OTP?
          </button>
        </div>
      )}

      <div className="mt-auto pt-8 text-center text-[10px] text-gray-400">
        By continuing, you agree to MUSCFIT&apos;s Terms of Use and Privacy Policy.
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  identifier: PropTypes.string.isRequired,
  authMethod: PropTypes.oneOf(['phone', 'email']).isRequired,
  onEdit: PropTypes.func.isRequired,
};
