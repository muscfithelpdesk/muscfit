'use client';

import React, { useState, useEffect } from 'react';
import AppImage from './ui/AppImage';

export default function LaunchingSoon() {
  const [email, setEmail] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [tick, setTick] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fade-in trigger
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Target Date: May 1, 2026
  useEffect(() => {
    const launchDate = new Date('2026-05-01T00:00:00').getTime();

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
      // Trigger a "tick" state for animation
      setTick(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration Successful: Early access for ${email}!`);
    setEmail('');
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between text-white overflow-hidden bg-[#060606] font-barlow select-none">
      
      {/* 🌫️ Premium SVG Noise Filter Overlay */}
      <svg className="absolute w-0 h-0 invisible pointer-events-none">
        <filter id="noiseFilterLayer">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.04" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* 🌌 Cinematic Background layers */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Main Amber Blob - Breathing Animation */}
        <div className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[rgba(224,100,20,0.22)] rounded-full blur-[80px] animate-breathe-glow opacity-80 shadow-[0_0_100px_rgba(224,100,20,0.1)]"></div>
        
        {/* Secondary Deep Red Glow - Pulse Animation */}
        <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-[rgba(180,30,10,0.14)] rounded-full blur-[60px] animate-pulse-slow"></div>
        
        {/* Refracted Glass Texture - Diagonal Streaks */}
        <div className="absolute inset-0 opacity-[0.025]"
             style={{ 
               background: 'repeating-linear-gradient(35deg, transparent, transparent 80px, #ffffff 81px, transparent 82px)',
               backgroundSize: '100% 100%'
             }}></div>

        {/* Global Cinema Grain Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay" style={{ filter: 'url(#noiseFilterLayer)' }}></div>
      </div>

      {/* 🏁 TOP NAVIGATION (No background box) */}
      <header className="w-full relative z-20 flex justify-between items-center px-8 py-6 md:px-12 md:py-8 max-w-[1600px]">
        {/* 🏹 NF MUSCFIT - Brand Signature Integration */}
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="relative w-48 md:w-64 h-16 md:h-20 select-none">
            <AppImage 
              src="/muscfit-exact-logo.png" 
              alt="MUSCFIT Logo"
              className="w-full h-full object-contain mix-blend-screen contrast-150 brightness-110"
            />
          </div>
        </div>

        {/* Stay Tuned Signal */}
        <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="text-[10px] md:text-sm font-black text-orange-500/80 tracking-[0.4em] uppercase">
            » STAY TUNED «
          </span>
        </div>
      </header>

      {/* 🌪️ MAIN HERO (Centered, One Viewport) */}
      <main className="relative z-20 w-full flex-grow flex flex-col items-center justify-center text-center px-4 -mt-4">
        
        {/* 🔥 Drop Incoming Badge */}
        <div className={`mb-6 flex transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-[rgba(224,100,20,0.2)] border border-[#E07B2A]/40 px-4 py-1 rounded-full shadow-[0_0_15px_rgba(224,123,42,0.2)] animate-pulse">
            <span className="text-[9px] md:text-[11px] font-black tracking-widest text-[#E07B2A] uppercase">
              🔥 DROP INCOMING
            </span>
          </div>
        </div>

        {/* Massive Headline - Scaled with clamp() to prevent cropping */}
        <div className={`flex flex-col mb-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 
            className="font-barlow-condensed font-black uppercase tracking-tight leading-[0.9]"
            style={{ fontSize: 'clamp(52px, 8.5vw, 110px)', color: 'white' }}
          >
            SOMETHING BIG
          </h1>
          <h1 
            className="font-barlow-condensed font-black uppercase tracking-tight leading-[0.9]"
            style={{ 
              fontSize: 'clamp(52px, 8.5vw, 110px)',
              background: 'linear-gradient(to bottom, #ffffff 0%, #888888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            IS COMING
          </h1>
        </div>

        {/* Infinite Amber Marquee Ticker */}
        <div className={`w-full overflow-hidden mb-8 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0 scale-x-0'}`}>
          <div className="flex animate-marquee whitespace-nowrap gap-12">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#E07B2A] uppercase">
                WEAR THE GRIND · OWN THE GAME · MUSCFIT · TRAIN DIFFERENT · NEW DROP ·
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle - Italic Subline */}
        <div className={`mb-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-barlow text-base md:text-xl font-light text-white/50 italic tracking-tight">
            Built for the ones who train different.
          </p>
        </div>

        {/* ⏳ RAW Precision Countdown */}
        <div className={`flex gap-6 md:gap-14 mb-12 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex relative items-center">
              <div className="flex flex-col items-center">
                <span 
                  className={`font-barlow-condensed text-5xl md:text-7xl font-black transition-all duration-300 ${tick % 2 === 0 ? 'scale-[1.03]' : 'scale-100'}`}
                  style={{ textShadow: '0 0 20px rgba(224,100,20,0.5)' }}
                >
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[8px] md:text-[9px] font-black text-white/20 tracking-widest mt-2">{item.label}</span>
              </div>
              {i < 3 && <div className="ml-6 md:ml-14 w-[1px] h-12 bg-[#E07B2A]/30 self-center"></div>}
            </div>
          ))}
        </div>

        {/* 📧 Sleek Notification Form Section */}
        <div className={`w-full max-w-[500px] transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-6 font-barlow-condensed">
            Be First. Get Early Access.
          </h3>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-1 flex flex-row items-stretch focus-within:border-white/30 transition-all rounded-sm">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-grow bg-transparent px-6 py-4 text-xs font-bold tracking-widest outline-none border-none placeholder:text-white/20 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-white text-black font-barlow-condensed font-black px-10 py-5 text-xs tracking-widest uppercase transition-all duration-500 hover:bg-[#E07B2A] hover:text-white shadow-xl"
            >
              NOTIFY ME →
            </button>
          </div>
        </div>
      </main>

      {/* 📱 FOOTER Overlay (Instagram Exclusive) */}
      <footer className={`w-full relative z-20 flex flex-col items-center pb-10 transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        
        {/* Instagram Row only */}
        <a 
          href="https://www.instagram.com/muscfitofficial/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="text-white/40 group-hover:text-[#E07B2A] group-hover:-translate-y-1 transition-all duration-300 transform">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-[0_0_10px_rgba(224,123,42,0.1)]">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
          <span className="text-[10px] font-black tracking-widest mt-2 text-[#E07B2A]/60 group-hover:text-[#E07B2A]">@muscfitofficial</span>
        </a>
        
        {/* Footer Legal */}
        <p className="text-[10px] uppercase font-bold tracking-[0.6em] text-white/10 mt-10">
          © 2025 MuscFIT · Wear The Grind. Own the Game.
        </p>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        @keyframes breathe-glow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-55%, -55%) scale(1.15); opacity: 1.0; }
        }
        .animate-breathe-glow {
          animation: breathe-glow 6s ease-in-out infinite alternate;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1.0; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite alternate;
        }
        .font-barlow { font-family: var(--font-barlow); }
        .font-barlow-condensed { font-family: var(--font-barlow-condensed); }
        
        /* Strict Viewport Control */
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
