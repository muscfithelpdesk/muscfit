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
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const messages = ["DROP INCOMING", "FOLLOW ON INSTAGRAM TO STAY TUNED"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    if (!email || !email.includes('@')) {
      return; // Handled by browser 'required' and 'type="email"' mostly, but safe to have
    }
    alert(`Registration Successful: Early access for ${email}!`);
    setEmail('');
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-between text-white overflow-hidden bg-[#0a0a0a] font-barlow select-none">
      
      {/* 🌫️ Premium SVG Noise Filter Overlay */}
      <svg className="absolute w-0 h-0 invisible pointer-events-none">
        <filter id="noiseFilterLayer">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.03" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* 🌌 Cinematic Background layers (Crimson Refinement) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Main Crimson Glow - Sharp Breathing Atmosphere */}
        <div className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(230,57,70,0.12)] rounded-full blur-[120px] animate-breathe-glow opacity-60"></div>
        
        {/* Secondary Gray Accents */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#1a1a1a] rounded-full blur-[100px] opacity-40 animate-pulse-slow"></div>

        {/* Refracted Glass Texture - Diagonal Streaks */}
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, #ffffff 101px, transparent 102px)',
            backgroundSize: '100% 100%'
          }}></div>

        {/* Global Cinema Grain Overlay */}
        <div className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay" style={{ filter: 'url(#noiseFilterLayer)' }}></div>
      </div>

      {/* 🧭 TOP BAR Overlay (Seamless Logo) */}
      <header className="w-full relative z-20 flex justify-between items-center px-4 py-6 md:px-12 md:py-8 max-w-[1600px]">
        {/* 🏹 OFFICIAL BRAND LOGO - Refined High-Performance Identity */}
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex items-center gap-3 md:gap-5 select-none">
            {/* 🛸 User Provided Symbol Asset */}
            <img 
              src="/muscfit-symbol-new.png" 
              alt="MUSCFIT Symbol"
              className="w-14 h-7 md:w-24 md:h-12 object-contain"
              style={{ filter: 'url(#remove-checkerboard) brightness(1.2)' }}
            />
            
            {/* 🖋️ MUSCFIT Custom Typography (Serif Contrast) */}
            <span 
              className="text-[20px] md:text-[34px] font-bold tracking-[0.1em] text-white"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              MUSCFIT
            </span>
          </div>
        </div>

        {/* Status Signal */}
        <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="text-[10px] md:text-sm font-black text-[#e63946] tracking-[0.4em] uppercase">
            » STATUS: PRE-DROP «
          </span>
        </div>
      </header>

      {/* 🌪️ MAIN HERO (Centered, Responsive) */}
      <main className="relative z-20 w-full flex-grow flex flex-col items-center justify-center text-center px-4 -mt-6 md:-mt-10">
        
        {/* 🚀 High-Impact Ultra-Hype Danger Sign */}
        <div className={`mb-4 flex flex-col items-center transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-[#e63946]/10 border-2 border-[#e63946] px-6 py-2 rounded-full shadow-[0_0_30px_rgba(230,57,70,0.3)] animate-bounce-slow flex items-center">
            <span key={activeMessageIndex} className="text-[9px] md:text-[11px] font-black tracking-[0.4em] text-white uppercase animate-message-fade">
              {messages[activeMessageIndex]}
            </span>
          </div>
        </div>

        {/* Massive Headline - Fluid Mobile Scaling */}
        <div className={`flex flex-col mb-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 
            className="font-barlow-condensed font-black uppercase tracking-tight leading-[0.9]"
            style={{ fontSize: 'clamp(42px, 12vw, 95px)', color: 'white' }}
          >
            SOMETHING BIG
          </h1>
          <h1 
            className="font-barlow-condensed font-black uppercase tracking-tight leading-[0.9]"
            style={{ 
              fontSize: 'clamp(42px, 12vw, 95px)',
              background: 'linear-gradient(to bottom, #ffffff 0%, #444444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            IS COMING
          </h1>
        </div>

        {/* Infinite Crimson Marquee Ticker */}
        <div className={`w-full overflow-hidden mb-4 md:mb-6 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0 scale-x-0'}`}>
          <div className="flex animate-marquee whitespace-nowrap gap-8 md:gap-12">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="text-[8px] md:text-xs font-black tracking-[0.25em] md:tracking-[0.3em] text-[#e63946] uppercase">
                WEAR THE GRIND · OWN THE GAME · MUSCFIT · TRAIN DIFFERENT · LIVE BOLD ·
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle - Sharp Athletic Copy */}
        <div className={`mb-6 md:mb-8 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-barlow text-xs md:text-lg font-light text-white/50 tracking-wide px-6 lg:px-0">
            Engineered for the ones who obsess over progress.
          </p>
        </div>

        {/* ⏳ Sharp Precision Countdown - Crimson Red */}
        <div className={`flex gap-3 md:gap-14 mb-8 md:mb-12 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex relative items-center">
              <div className="flex flex-col items-center">
                <span 
                  className={`font-barlow-condensed text-3xl md:text-6xl font-black transition-all duration-300 text-[#e63946]`}
                  style={{ textShadow: '0 0 30px rgba(230,57,70,0.3)' }}
                >
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[6px] md:text-[8px] font-black text-white/30 tracking-[0.3em] mt-1">{item.label}</span>
              </div>
              {i < 3 && <div className="ml-3 md:ml-14 w-[1px] h-8 md:h-10 bg-white/10 self-center"></div>}
            </div>
          ))}
        </div>

        {/* 📧 High-Intensity Notification Form - Crimson CTA */}
        <div className={`w-full max-w-[450px] px-4 md:px-0 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] text-white/60 mb-3 md:mb-4 font-barlow-condensed text-center">
            BE FIRST. SECURE THE DROP.
          </h3>
          <form 
            onSubmit={handleSubmit}
            className="bg-[#111111] border-2 border-white/10 p-1 flex flex-col md:flex-row items-stretch focus-within:border-[#e63946]/50 transition-all rounded-sm gap-1 md:gap-0"
          >
            <input
              type="email"
              required
              placeholder="YOUR@EMAIL.COM"
              className="flex-grow bg-transparent px-4 py-3 md:py-4 text-[10px] md:text-xs font-bold tracking-[0.2em] outline-none border-none placeholder:text-white/10 text-white text-center md:text-left uppercase"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#e63946] text-white font-barlow-condensed font-black px-6 md:px-10 py-3 md:py-4 text-[10px] md:text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-white hover:text-black shadow-xl"
            >
              NOTIFY ME →
            </button>
          </form>
        </div>
        <div className="h-12 md:h-16"></div> {/* Added spacer to prevent overlap */}
      </main>

      {/* 📱 FOOTER Overlay (Instagram Exclusive) */}
      <footer className={`w-full relative z-20 flex flex-col items-center pb-6 md:pb-8 transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        
        <a 
          href="https://www.instagram.com/muscfitofficial/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group cursor-pointer"
        >
          <div className="text-white/20 group-hover:text-[#e63946] group-hover:-translate-y-1 transition-all duration-300 transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
          <span className="text-[8px] font-black tracking-widest mt-1 text-white/20 group-hover:text-[#e63946]">@MUSCFITOFFICIAL</span>
        </a>
        
        <p className="text-[7px] md:text-[8px] uppercase font-bold tracking-[0.5em] text-white/5 mt-4 md:mt-6">
          © 2025 MUSCFIT · BEYOND THE GRIND.
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
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-52%, -52%) scale(1.1); opacity: 0.9; }
        }
        .animate-breathe-glow {
          animation: breathe-glow 6s ease-in-out infinite alternate;
        }
        @keyframes alert-pulse {
          0%, 100% { border-color: #e63946; box-shadow: 0 0 10px rgba(230,57,70, 0.2); }
          50% { border-color: #ffffff; box-shadow: 0 0 25px rgba(230,57,70, 0.5); }
        }
        .animate-alert-pulse {
          animation: alert-pulse 2s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite alternate;
        }

        @keyframes message-fade {
          0%, 100% { opacity: 0; transform: translateY(4px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
        }
        .animate-message-fade {
          animation: message-fade 5s infinite;
        }

        .font-barlow { font-family: var(--font-barlow); }
        .font-barlow-condensed { font-family: var(--font-barlow-condensed); }
        
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }

        .logo-img {
          object-fit: contain;
          filter: invert(1);
          mix-blend-mode: screen;
      `}</style>
      
      {/* 🎭 SVG Chroma-Key Filter for Background Removal */}
      <svg className="absolute w-0 h-0 invisible">
        <filter id="remove-checkerboard">
          <feColorMatrix type="matrix" values="
            0 0 0 0 1
            0 0 0 0 1
            0 0 0 0 1
            20 20 20 0 -59
          " />
        </filter>
      </svg>
    </div>
  );
}
