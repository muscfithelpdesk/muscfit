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

  // Calculate countdown to 14 days from now
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 14);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate.getTime() - now;

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
    alert(`Thank you! ${email} has been registered for early access.`);
    setEmail('');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden selection:bg-orange-500/30">
      
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0a0a0a]/80 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60 z-10"></div>
        <AppImage 
          src="/launching-bg.png" 
          alt="Cinematic gym background"
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-screen"
        />
        {/* Amber Glow Effects */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
        
        {/* Particles / Noise (CSS Texture) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6-dark.png')]"></div>
      </div>

      {/* Top Left Logo */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter flex items-center group cursor-default">
          <span className="bg-red-600 text-white px-2 py-0.5 transform -skew-x-12 font-black transition-transform group-hover:-skew-x-6">NF</span>
          <span className="text-white tracking-widest font-bebas-neue ml-2">MUSCFIT</span>
        </h1>
      </div>

      {/* Main Content */}
      <main className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl">
        {/* Red Arrow Accents */}
        <div className="flex items-center gap-6 mb-10">
          <span className="text-red-600 text-3xl font-bold animate-bounce-horizontal opacity-70">»</span>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          <span className="text-red-600 text-3xl font-bold animate-bounce-horizontal-rev opacity-70">«</span>
        </div>

        {/* Headline */}
        <h2 className="text-6xl md:text-[140px] font-black uppercase tracking-tighter leading-[0.8] mb-8 font-bebas-neue drop-shadow-[0_0_30px_rgba(251,146,60,0.1)]">
          Something Big <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Is Coming
          </span>
        </h2>

        {/* Sub-headline */}
        <p className="text-xl md:text-3xl font-light text-white/80 mb-6 tracking-wide max-w-2xl font-inter">
          Built for the ones who train different.
        </p>

        {/* Tagline */}
        <p className="text-sm md:text-lg font-bold tracking-[0.6em] text-orange-500 uppercase mb-16 drop-shadow-sm">
          WEAR THE GRIND. OWN THE GAME.
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 px-4 py-6 border-y border-white/10 backdrop-blur-sm bg-white/5 rounded-2xl w-full">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl md:text-5xl font-black font-bebas-neue">{String(item.value).padStart(2, '0')}</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/50">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Subscribe Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md group">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="YOUR@EMAIL.COM"
              className="flex-1 bg-white/5 border border-white/20 px-6 py-4 rounded-xl text-sm font-bold tracking-widest focus:outline-none focus:border-orange-500 transition-all placeholder:text-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-black px-8 py-4 rounded-xl text-sm tracking-widest uppercase transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-900/20"
            >
              Get Early Access
            </button>
          </div>
          <p className="mt-4 text-[10px] text-white/40 uppercase tracking-widest">
            Be the first to know when the shop opens.
          </p>
        </form>
      </main>

      {/* Bottom Text */}
      <div className="absolute bottom-12 left-0 right-0 z-20 text-center">
        <p className="text-[10px] md:text-xs font-medium tracking-[0.6em] text-white/30 uppercase">
          Launching Soon — Stay Tuned
        </p>
      </div>

      {/* Red Accent Lines */}
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-20">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-orange-600"></div>
        <div className="absolute bottom-0 right-0 h-full w-[1px] bg-orange-600"></div>
      </div>

      <style jsx>{`
        @keyframes bounce-horizontal {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        @keyframes bounce-horizontal-rev {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-5px); }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 2s ease-in-out infinite;
        }
        .animate-bounce-horizontal-rev {
          animation: bounce-horizontal-rev 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
