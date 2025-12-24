'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function Newsletter({ title, subtitle }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!email || !email?.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setEmail('');
    
    setTimeout(() => {
      setStatus('idle');
    }, 3000);
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-black">
      <div className="max-w-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
            {title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 md:mb-8">
            {subtitle}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                placeholder="Enter your email address"
                className="w-full h-12 md:h-14 px-4 md:px-6 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-250 text-sm md:text-base"
                required
              />
            </div>
            <button
              type="submit"
              className="h-12 md:h-14 px-6 md:px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold rounded-md flex items-center justify-center gap-2 transition-all duration-250 hover:scale-[0.98] active:scale-95 whitespace-nowrap text-sm md:text-base"
            >
              Subscribe
              <Icon name="PaperAirplaneIcon" size={20} />
            </button>
          </form>

          {status === 'success' && (
            <p className="mt-4 text-sm md:text-base text-green-400 flex items-center justify-center gap-2">
              <Icon name="CheckCircleIcon" size={20} />
              Successfully subscribed to our newsletter!
            </p>
          )}

          {status === 'error' && (
            <p className="mt-4 text-sm md:text-base text-red-400 flex items-center justify-center gap-2">
              <Icon name="ExclamationCircleIcon" size={20} />
              Please enter a valid email address
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

Newsletter.propTypes = {
  title: PropTypes?.string?.isRequired,
  subtitle: PropTypes?.string?.isRequired
};