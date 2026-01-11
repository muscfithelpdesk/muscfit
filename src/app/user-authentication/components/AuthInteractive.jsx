'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import AuthTabs from './AuthTabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SocialAuth from './SocialAuth';
import TrustSignals from './TrustSignals';
import Icon from '@/components/ui/AppIcon';

export default function AuthInteractive({ initialMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithPhone, verifyOTP, signUp, signIn } = useAuth();

  const [activeTab, setActiveTab] = useState(initialMode); // login or register
  const [step, setStep] = useState(1); // 1: Number/Email, 2: OTP/Password/Details
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' or 'email'
  const [identifier, setIdentifier] = useState(''); // phone or email
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const mode = searchParams?.get('mode');
    if (mode === 'register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
    setStep(1); // Reset step on mode change
  }, [searchParams]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleIdentifierSubmit = async (e) => {
    e?.preventDefault();
    if (!identifier) return;

    setIsLoading(true);
    if (authMethod === 'phone') {
      const result = await signInWithPhone(identifier);
      if (result.success) {
        setStep(2);
        showNotification('success', 'OTP sent successfully!');
      } else {
        showNotification('error', result.error || 'Failed to send OTP');
      }
    } else {
      // For email, we just move to password step
      setStep(2);
    }
    setIsLoading(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStep(1);
    const newUrl = tab === 'register' ? '/user-authentication?mode=register' : '/user-authentication';
    router?.push(newUrl);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto overflow-hidden bg-card rounded-2xl shadow-sharp-lg flex flex-col md:flex-row min-h-[500px] border border-border">
      {/* Left Side: Branding/Illustration (Flipkart Style) */}
      <div className="w-full md:w-2/5 bg-black p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 tracking-tighter italic">
            {activeTab === 'login' ? 'LOGIN' : 'SIGN UP'}
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[200px]">
            {activeTab === 'login'
              ? 'Get access to your Orders, Wishlist and Recommendations'
              : 'Sign up with your mobile number to get started'}
          </p>
        </div>

        {/* Abstract muscle/fitness decoration */}
        <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
          <Icon name="BoltIcon" size={240} variant="solid" />
        </div>

        <div className="relative z-10 hidden md:block">
          <Icon name="UserCircleIcon" size={120} className="text-white/20" />
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-3/5 p-8 md:p-12 bg-white flex flex-col">
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-scale-in ${notification.type === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
            }`}>
            <Icon name={notification.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'} size={20} />
            <p className="text-sm font-bold">{notification.message}</p>
          </div>
        )}

        {step === 1 ? (
          <div className="flex-1 flex flex-col justify-center">
            <form onSubmit={handleIdentifierSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  type={authMethod === 'phone' ? 'tel' : 'email'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-200 focus:border-black outline-none transition-all duration-300 text-lg font-medium peer placeholder-transparent"
                  placeholder={authMethod === 'phone' ? 'Enter Mobile Number' : 'Enter Email Address'}
                  required
                />
                <label className="absolute left-0 -top-3.5 text-gray-500 text-xs transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs pointer-events-none">
                  {authMethod === 'phone' ? 'Enter Mobile Number' : 'Enter Email Address'}
                </label>
              </div>

              <p className="text-[10px] text-gray-400 leading-tight">
                By continuing, you agree to MUSCFIT&apos;s{' '}
                <a href="/terms" className="text-black font-bold underline">Terms of Use</a> and{' '}
                <a href="/privacy" className="text-black font-bold underline">Privacy Policy</a>.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-black text-white font-black text-sm tracking-widest uppercase hover:bg-gray-800 transition-all rounded-sm shadow-lg disabled:bg-gray-400 group relative overflow-hidden"
              >
                <span className="relative z-10">{isLoading ? 'PROCESSING...' : 'CONTINUE'}</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </form>

            <div className="mt-8">
              <button
                onClick={() => setAuthMethod(authMethod === 'phone' ? 'email' : 'phone')}
                className="w-full py-4 border border-gray-200 text-gray-600 font-bold text-xs tracking-widest uppercase hover:bg-gray-50 transition-all rounded-sm"
              >
                {authMethod === 'phone' ? 'Use Email instead' : 'Use Phone Number instead'}
              </button>
            </div>

            <div className="mt-auto pt-8 text-center">
              <button
                onClick={() => handleTabChange(activeTab === 'login' ? 'register' : 'login')}
                className="text-black font-black text-xs tracking-widest uppercase border-b-2 border-black pb-1 hover:opacity-70 transition-opacity"
              >
                {activeTab === 'login' ? 'New to MUSCFIT? Create an account' : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            {activeTab === 'login' ? (
              <LoginForm
                identifier={identifier}
                authMethod={authMethod}
                onEdit={() => setStep(1)}
              />
            ) : (
              <RegisterForm
                identifier={identifier}
                authMethod={authMethod}
                onEdit={() => setStep(1)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

AuthInteractive.propTypes = {
  initialMode: PropTypes.oneOf(['login', 'register']).isRequired,
};
