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
  const [activeTab, setActiveTab] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const mockCredentials = {
    email: 'john.doe@example.com',
    password: 'Fitness@123'
  };

  useEffect(() => {
    const mode = searchParams?.get('mode');
    if (mode === 'register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [searchParams]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        showNotification('success', 'Login successful! Redirecting to your profile...');
        setTimeout(() => {
          router?.push('/user-profile');
        }, 1500);
      } else {
        showNotification(
          'error',
          `Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`
        );
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    setTimeout(() => {
      showNotification('success', 'Account created successfully! Redirecting to your profile...');
      setTimeout(() => {
        router?.push('/user-profile');
      }, 1500);
    }, 2000);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newUrl = tab === 'register' ? '/user-authentication?mode=register' : '/user-authentication';
    router?.push(newUrl);
  };

  return (
    <div className="w-full">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4 p-4 rounded-md shadow-sharp-lg animate-scale-in ${
            notification?.type === 'success' ?'bg-success text-success-foreground' :'bg-error text-error-foreground'
          }`}
        >
          <div className="flex items-start gap-3">
            <Icon
              name={notification?.type === 'success' ? 'CheckCircleIcon' : 'ExclamationCircleIcon'}
              size={24}
              variant="solid"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{notification?.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-current hover:opacity-80 transition-opacity duration-250"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          </div>
        </div>
      )}
      {/* Auth Card */}
      <div className="w-full max-w-md mx-auto bg-card border border-border rounded-lg shadow-sharp-lg p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Welcome to MUSCFIT
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            {activeTab === 'login' ?'Sign in to access your personalized fitness journey' :'Create your account and start your transformation'}
          </p>
        </div>

        {/* Tabs */}
        <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Forms */}
        {activeTab === 'login' ? (
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        ) : (
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        )}

        {/* Social Auth */}
        <div className="mt-6">
          <SocialAuth isLoading={isLoading} />
        </div>

        {/* Trust Signals */}
        <TrustSignals />
      </div>
      {/* Additional Info */}
      <div className="max-w-md mx-auto mt-6 text-center">
        <p className="text-xs text-text-secondary">
          By continuing, you agree to MUSCFIT&apos;s{' '}
          <a href="/terms" className="text-primary hover:text-primary/80 transition-colors duration-250">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary hover:text-primary/80 transition-colors duration-250">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

AuthInteractive.propTypes = {
  initialMode: PropTypes?.oneOf(['login', 'register'])?.isRequired
};