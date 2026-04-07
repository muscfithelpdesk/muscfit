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

  // Target Date: April 21, 2026
  useEffect(() => {
    const launchDate = new Date('2026-04-21T00:00:00').getTime();

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
    alert(`Registration successful! ${email} will get early access.`);
    setEmail('');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden select-none">
      
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <AppImage 
          src="/muscfit-premium-bg.png" 
          alt="Cinematic background"
          className="w-full h-full object-cover grayscale opacity-30 scale-110 blur-[2px]"
        />
        {/* Amber Glow/Light Leak Effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E07B2A]/5 via-transparent to-[#E07B2A]/10 mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-full bg-gradient-to-l from-[#E07B2A]/5 to-transparent blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-full bg-gradient-to-r from-[#E07B2A]/5 to-transparent blur-[150px] pointer-events-none"></div>
        
        {/* Grain/Noise Texture Overlay */}
        <div className="absolute inset-0 bg-repeat opacity-[0.03] pointer-events-none mix-blend-overlay animate-grain" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/p6-dark.png')` }}></div>
      </div>

      {/* Top Left Logo - NF MUSCFIT */}
      <div className="absolute top-10 left-10 z-50">
        <div className="flex items-center gap-3 cursor-default">
          <span className="font-bebas-neue text-4xl font-black italic tracking-tighter text-white">NF</span>
          <span className="font-outfit text-2xl font-black uppercase tracking-widest text-white">MUSCFIT</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <main className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-[1400px]">
        {/* Massive Headline */}
        <div className="flex flex-col mb-10 w-full group">
          <h1 
            className="text-[12vw] md:text-[180px] font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl font-bebas-neue"
            style={{ 
              background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 60%, #999999 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SOMETHING BIG
          </h1>
          <h1 
            className="text-[12vw] md:text-[180px] font-black uppercase leading-[0.8] tracking-tighter drop-shadow-2xl font-bebas-neue"
            style={{ 
              background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 60%, #999999 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            IS COMING
          </h1>
        </div>

        {/* Sub-headlines */}
        <div className="flex flex-col gap-6 mb-16">
          <p className="text-xl md:text-3xl font-extralight tracking-wide text-white/90 font-outfit">
            Built for the ones who train different.
          </p>
          <p className="text-xs md:text-sm font-black tracking-[0.8em] text-[#E07B2A] uppercase font-inter">
            WEAR THE GRIND. OWN THE GAME.
          </p>
        </div>

        {/* Global Countdown Timer */}
        <div className="flex gap-4 md:gap-8 mb-20 px-8 py-10">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center relative group">
              {/* Glass Card */}
              <div className="w-20 h-24 md:w-32 md:h-40 bg-white/[0.03] border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-all duration-500">
                <span className="text-4xl md:text-7xl font-black font-bebas-neue py-2">{String(item.value).padStart(2, '0')}</span>
                {/* Glow under each block */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#E07B2A] blur-lg animate-pulse" style={{ opacity: 0.3 }}></div>
              </div>
              <span className="mt-4 text-[10px] md:text-xs font-bold text-gray-400 tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Sleek One-line Email Capture */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col md:flex-row items-stretch gap-0 bg-white/[0.03] border border-white/10 p-0 rounded-none focus-within:border-white/30 transition-all overflow-hidden">
          <input
            type="email"
            required
            placeholder="ENTER YOUR EMAIL"
            className="flex-1 bg-transparent px-8 py-5 text-sm font-bold tracking-widest outline-none border-none placeholder:text-white/20 capitalize rounded-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white text-black font-black px-12 py-5 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#E07B2A] hover:text-white rounded-none border-none"
          >
            Get Early Access
          </button>
        </form>
      </main>

      {/* Social Icons - Bottom */}
      <div className="absolute bottom-12 flex gap-10 z-20">
        {['INSTAGRAM', 'WHATSAPP', 'YOUTUBE'].map((social) => (
          <a
            key={social}
            href="#"
            className="text-[10px] font-black tracking-widest text-white/40 hover:text-white transition-all cursor-pointer"
          >
            {social}
          </a>
        ))}
      </div>

      {/* Particle Effect Styles */}
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
        .font-anton { font-family: var(--font-anton); }
      `}</style>
    </div>
  );
}
