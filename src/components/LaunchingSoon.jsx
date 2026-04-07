'use client';

import React, { useState, useEffect } from 'react';
import AppImage from './ui/AppImage';

export default function LaunchingSoon() {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target Date: 25 days from now (May 2, 2026)
  useEffect(() => {
    const launchDate = new Date('2026-05-02T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! ${email} has been subscribed.`);
    setEmail('');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-[#080808] text-white overflow-hidden py-10 md:py-20 select-none">
      
      {/* Refined Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#080808] z-10 opacity-80"></div>
        {/* Soft Amber Light Leaks / Heat Blurs */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[40vw] h-[80vh] bg-[#E07B2A]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[40vw] h-[80vh] bg-[#E07B2A]/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Subtle Noise / Grain Overlay */}
        <div className="absolute inset-0 bg-repeat opacity-[0.04] pointer-events-none mix-blend-overlay animate-grain" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/p6-dark.png')` }}></div>
      </div>

      {/* Top Left Logo - Using actual logo from /muscfit-logo.png */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50">
        <div className="relative w-40 md:w-56 h-12">
          <AppImage 
            src="/muscfit-logo.png" 
            alt="MUSCFIT Logo"
            className="w-full h-full object-contain brightness-200"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-20 flex flex-col items-center text-center px-4 w-full flex-grow justify-center space-y-12 md:space-y-20">
        
        {/* Headline Section - Reduced Font Size to Fit Cleanly */}
        <div className="flex flex-col w-full max-w-7xl mx-auto space-y-2">
          <h1 className="text-[10vw] md:text-[110px] lg:text-[130px] font-black uppercase leading-[0.9] tracking-tighter transition-all font-bebas-neue drop-shadow-2xl">
            SOMETHING BIG
            <br />
            IS COMING
          </h1>
        </div>

        {/* Sub-headlines - Improved Vertical Hierarchy */}
        <div className="flex flex-col space-y-4">
          <p className="text-lg md:text-2xl font-light tracking-wide text-white/80 font-outfit">
            Built for the ones who train different.
          </p>
          <p className="text-[10px] md:text-sm font-bold tracking-[0.9em] text-[#E07B2A] uppercase font-inter pl-[0.9em]">
            WEAR THE GRIND. OWN THE GAME.
          </p>
        </div>

        {/* Minimalist Borderless Countdown Timer */}
        <div className="w-full max-w-4xl px-4 flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 w-full relative">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="flex relative group">
                <div className="flex flex-col items-center flex-1 py-4 md:py-8">
                  <div className="relative flex flex-col items-center">
                    <span className="text-5xl md:text-7xl font-black font-bebas-neue mb-2 tracking-tighter">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] md:text-[11px] font-bold text-white/50 tracking-widest">{item.label}</span>
                    {/* Subtle Amber Pulse Glow Under Each Number */}
                    <div className="absolute -bottom-4 md:-bottom-6 w-12 h-2 bg-[#E07B2A] blur-xl opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
                  </div>
                </div>
                {/* Thin Vertical White Divider (Visible on screens with more than 1 col) */}
                {i < 3 && (
                  <div className={`absolute top-1/2 -translate-y-1/2 right-0 w-[0.5px] h-12 md:h-16 bg-white/20 hidden md:block border-r border-white/10`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sleek One-line Email Capture (Max Width 600px) */}
        <div className="w-full max-w-[600px] flex flex-col space-y-4">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-0 bg-white/[0.03] border border-white/20 p-0 rounded-none focus-within:border-white/40 transition-all shadow-2xl backdrop-blur-md">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-6 py-4 text-xs font-bold tracking-widest outline-none border-none placeholder:text-white/30 uppercase rounded-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-black font-black px-10 py-5 text-xs tracking-widest uppercase transition-all duration-500 hover:bg-[#E07B2A] hover:text-white rounded-none border-none"
            >
              GET EARLY ACCESS
            </button>
          </form>
        </div>
      </main>

      {/* Social Icons - Bottom Center */}
      <div className="relative z-20 flex flex-col items-center space-y-12 w-full pt-12">
        <div className="flex items-center gap-10">
          {/* Using simple SVG placeholders or icons if available in font */}
          {['Instagram', 'Youtube', 'Whatsapp'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-white hover:text-[#E07B2A] transition-all opacity-80 hover:opacity-100 transform hover:scale-110 active:scale-95"
              aria-label={social}
            >
              <div className="w-6 h-6 border-2 border-current flex items-center justify-center rounded-sm text-[8px] font-black uppercase">
                {social.charAt(0)}
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform:translate(0, 0); }
          10% { transform:translate(-5%, -10%); }
          20% { transform:translate(-15%, 5%); }
          30% { transform:translate(7%, -25%); }
          40% { transform:translate(-5%, 25%); }
          50% { transform:translate(-15%, 10%); }
          60% { transform:translate(15%, 0%); }
          70% { transform:translate(0%, 15%); }
          80% { transform:translate(3%, 35%); }
          90% { transform:translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
        .font-bebas-neue { font-family: var(--font-bebas-neue); }
        .font-outfit { font-family: var(--font-outfit); }
        .font-inter { font-family: var(--font-inter); }
      `}</style>
    </div>
  );
}
