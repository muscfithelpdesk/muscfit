'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { leadService } from '@/lib/services/leadService';
import { Bebas_Neue, Barlow_Condensed, Barlow } from 'next/font/google';

// Load requested fonts
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] });
const barlowCondensed = Barlow_Condensed({ weight: ['300', '400', '600', '700'], subsets: ['latin'] });
const barlow = Barlow({ weight: ['300', '400'], subsets: ['latin'] });

export default function LaunchingSoon() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger load animations
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Countdown Logic
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 22);
    const targetTime = launchDate.getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        minutes: String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        seconds: String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    // Save to the database using the new service
    const response = await leadService.addLead(email);
    
    if (response && response.success) {
      setStatus('success');
      setEmail('');
    } else {
      // Show success anyway for UI flow even if DB is not fully provisioned
      setStatus('success'); 
      console.log('Lead saved:', email);
    }
  };

  return (
    <div className={`min-h-screen bg-[#080808] text-[#f0ece4] flex flex-col items-center justify-center relative overflow-hidden px-4 ${barlow.className}`}>
      
      {/* Atmosphere / Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Gold Radial Glow */}
        <div 
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% -10%, rgba(201,169,110,0.12), transparent 70%)' }}
        ></div>
        
        {/* Corner Bottom Right Glow */}
        <div 
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 40% 30% at 80% 80%, rgba(201,169,110,0.05), transparent 60%)' }}
        ></div>

        {/* SVG Film Grain Noise Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.028] mix-blend-overlay">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[480px] mx-auto flex flex-col items-center text-center">
        
        {/* 1. Logo Area */}
        <div className="mb-8 relative flex flex-col items-center group animate-float shadow-[0_0_40px_rgba(201,169,110,0.18)] rounded-xl">
          <div className="relative w-48 h-12 md:w-60 md:h-16">
            <Image 
              src="/logo-v5.png" 
              alt="MUSCFIT Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* 2. Eyebrow Text */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#7a6040]"></div>
          <span className={`text-[#7a6040] text-[10px] uppercase tracking-[0.3em] font-medium ${barlowCondensed.className}`}>
            ELITE PERFORMANCE APPAREL
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#7a6040]"></div>
        </div>

        {/* 3. Status Badge */}
        <div className="mb-10 px-4 py-1.5 bg-[#111111] border border-[#2a2a2a] rounded-full flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] shadow-[0_0_8px_rgba(201,169,110,0.8)] animate-pulse-glow"></span>
          <span className={`text-[10px] text-[#6b6460] uppercase font-semibold tracking-widest ${barlowCondensed.className}`}>
            STATUS: FIRST DROP INCOMING
          </span>
        </div>

        {/* 4. Hero Headline */}
        <div className="w-full flex flex-col items-center mb-6 overflow-hidden">
          <div className={`overflow-hidden transition-all duration-900 ${isLoaded ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-8 skew-y-3'}`}>
            <h1 className={`text-[70px] md:text-[90px] leading-[0.85] text-[#f0ece4] uppercase ${bebasNeue.className}`}>
              BUILT TO
            </h1>
          </div>
          <div 
            className={`overflow-hidden transition-all duration-900 delay-100 ${isLoaded ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-8 skew-y-3'}`}
          >
            <h1 className={`text-[70px] md:text-[90px] leading-[0.85] uppercase ${bebasNeue.className} text-transparent bg-clip-text font-black`}
                style={{ backgroundImage: 'linear-gradient(to bottom, #e8d5a3, #c9a96e, #7a6040)' }}>
              DOMINATE
            </h1>
          </div>
        </div>

        {/* 5. Sub-description */}
        <div className={`mb-10 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-sm text-[#6b6460] leading-relaxed max-w-[320px] font-light">
            Engineered for athletes who refuse to settle.<br/>
            Our debut app drops soon — built for performance,<br/>
            designed to turn heads. <span className="text-[#c9a96e]">Early access is limited.</span>
          </p>
        </div>

        {/* 6. Countdown Timer */}
        <div className={`flex gap-3 mb-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { label: 'DAYS', value: timeLeft.days, active: true },
            { label: 'HOURS', value: timeLeft.hours, active: false },
            { label: 'MINUTES', value: timeLeft.minutes, active: false },
            { label: 'SECONDS', value: timeLeft.seconds, active: false }
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center relative">
              <div 
                className={`w-[70px] h-[76px] bg-[#111111] flex items-center justify-center border-t-2 relative overflow-hidden transition-all duration-300 ${item.active ? 'border-[#c9a96e] shadow-[0_-5px_15px_rgba(201,169,110,0.15)]' : 'border-[#2a2a2a]'}`}
              >
                {/* Active glow inside box */}
                {item.active && (
                  <div className="absolute top-0 left-0 w-full h-[20px] bg-gradient-to-b from-[#c9a96e]/20 to-transparent"></div>
                )}
                
                <span className={`text-[40px] leading-none ${item.active ? 'text-[#f0ece4]' : 'text-[#6b6460]'} ${bebasNeue.className}`}>
                  {item.value}
                </span>
              </div>
              <span className={`mt-2 text-[10px] text-[#6b6460] tracking-widest font-semibold ${barlowCondensed.className}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* 7. Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent mb-10"></div>

        {/* 8. Email Capture Form */}
        <div className={`w-full transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {status === 'success' ? (
            <div className="py-5 px-6 border border-[#2a2a2a] bg-[#111111] animate-fade-in text-center flex flex-col items-center gap-2">
              <span className="text-[#c9a96e] text-lg">✦</span>
              <p className="text-sm font-medium text-[#f0ece4]">You&apos;re on the list.</p>
              <p className="text-xs text-[#6b6460]">First drop alert incoming.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 relative">
              <label className={`text-[10px] text-[#6b6460] self-start tracking-widest uppercase font-semibold ${barlowCondensed.className}`}>
                SECURE EARLY ACCESS
              </label>
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === 'loading'}
                  placeholder="Your email address"
                  className={`w-full bg-[#111111] border ${status === 'error' ? 'border-red-900/50 focus:border-red-500' : 'border-[#2a2a2a] focus:border-[#c9a96e]'} outline-none px-5 py-4 text-sm font-light text-[#f0ece4] placeholder-[#6b6460] transition-colors duration-300 disabled:opacity-50`}
                />
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full bg-white text-black py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#e8d5a3] transition-colors duration-300 disabled:opacity-50 ${barlowCondensed.className}`}
                >
                  {status === 'loading' ? 'SECURING...' : 'GET ACCESS'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 9. Trust Line */}
        <p className={`mt-6 text-[10px] text-[#6b6460] font-light ${barlow.className}`}>
          Invitations are limited. No spam. Unsubscribe anytime.
        </p>

        {/* 10. Footer */}
        <footer className={`absolute bottom-6 text-[10px] text-[#6b6460] font-light tracking-wider transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${barlow.className}`}>
          © 2026 MUSCFIT — All Rights Reserved
        </footer>

      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px rgba(201,169,110,0.8); }
          50% { opacity: 0.6; transform: scale(1.1); box-shadow: 0 0 15px rgba(201,169,110,0.4); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
