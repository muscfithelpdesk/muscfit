'use client';

import React, { useState, useEffect } from 'react';
import AppImage from './ui/AppImage';

export default function LaunchingSoon() {
  const [email, setEmail] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Fade-in trigger
  useEffect(() => {
    setIsLoaded(true);
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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration Successful: Early access for ${email}!`);
    setEmail('');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between text-white overflow-hidden bg-[#060606] selection:bg-orange-500/20">
      
      {/* 🌪️ Noise SVG Filter Definition */}
      <svg className="absolute w-0 h-0 invisible">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {/* Glow Effects (Breathed/Pulsed) */}
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[60vw] h-[60vh] bg-orange-600/10 rounded-full blur-[120px] animate-breathe pointer-events-none"></div>
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[60vw] h-[60vh] bg-amber-600/10 rounded-full blur-[120px] animate-breathe-delay pointer-events-none"></div>
        
        {/* SVG Noise Texture Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay" style={{ filter: 'url(#noiseFilter)' }}></div>
      </div>

      {/* 🏷️ Top Section Overlay (Logo + Signal) */}
      <div className="w-full relative z-20 flex justify-between items-center p-8 md:p-12">
        {/* Logo NF MUSCFIT */}
        <div className={`flex items-center gap-4 group transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="relative w-48 md:w-64 h-16 md:h-20">
            <AppImage 
              src="/muscfit-exact-logo.png" 
              alt="MUSCFIT Logo"
              className="w-full h-full object-contain mix-blend-screen transition-opacity group-hover:opacity-80"
            />
          </div>
        </div>

        {/* Top Right Stay Tuned Signal */}
        <div className={`transition-all duration-1000 delay-100 hidden md:block ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="text-[10px] font-bold text-orange-500/80 tracking-[0.4em] uppercase">
            » STAY TUNED «
          </span>
        </div>
      </div>

      {/* 🚀 Main Hero Content */}
      <main className="relative z-20 w-full flex flex-col items-center text-center px-6 -mt-12">
        {/* Tagline Tag */}
        <p className={`text-[10px] md:text-sm font-black tracking-[0.6em] text-orange-500 uppercase mb-4 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          WEAR THE GRIND. OWN THE GAME.
        </p>

        {/* Headline Massive */}
        <div className={`flex flex-col mb-10 group transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 
            className="font-barlow-condensed font-black uppercase leading-[0.85] tracking-tighter transition-all"
            style={{ 
              fontSize: 'clamp(5rem, 16vw, 15rem)',
              background: 'linear-gradient(to bottom, #ffffff 0%, #bbbbbb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SOMETHING BIG
          </h1>
          <h1 
            className="font-barlow-condensed font-black uppercase leading-[0.85] tracking-tighter"
            style={{ 
              fontSize: 'clamp(5rem, 16vw, 15rem)',
              background: 'linear-gradient(to bottom, #bbbbbb 0%, #777777 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            IS COMING
          </h1>
        </div>

        {/* Subtitle Heading */}
        <div className={`mb-12 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-barlow text-xl md:text-2xl font-light text-white/60 mb-6 italic tracking-tight">
            Built for the ones who train different.
          </p>
          <div className="w-[60px] h-[1px] bg-amber-500/50 mx-auto"></div>
        </div>

        {/* ⏳ Precision Countdown row */}
        <div className={`grid grid-cols-4 gap-6 md:gap-14 mb-20 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex relative group">
              <div className="flex flex-col items-center">
                <span 
                  className="font-barlow-condensed text-4xl md:text-7xl font-black transition-all group-hover:scale-105"
                  style={{ textShadow: '0 0 20px rgba(245, 158, 11, 0.2)' }}
                >
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs font-bold text-white/30 tracking-widest mt-2 px-1">{item.label}</span>
              </div>
              {i < 3 && <div className="absolute -right-3 md:-right-7 top-1/2 -translate-y-1/2 w-[1px] h-full bg-white/10 scale-y-60 opacity-60"></div>}
            </div>
          ))}
        </div>

        {/* 📩 Global Notification Field */}
        <div className={`w-full max-w-[520px] transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <label className="block text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
            Get notified on launch day
          </label>
          <form 
            onSubmit={handleSubmit} 
            className="relative flex items-stretch border border-white/10 bg-white/5 backdrop-blur-md focus-within:border-white/20 transition-all p-[1px]"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-grow bg-transparent px-6 py-4 text-xs font-bold tracking-widest outline-none border-none placeholder:text-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-black font-barlow-condensed font-black px-10 py-4 text-xs tracking-widest uppercase transition-all duration-500 hover:bg-orange-600 hover:text-white"
            >
              Get Early Access
            </button>
          </form>
        </div>
      </main>

      {/* 📱 Footer Social/Entity info */}
      <footer className={`flex flex-col items-center gap-6 py-12 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <div className="flex gap-10">
          {[
            { 
              name: 'Instagram', 
              icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> 
            },
            { 
              name: 'Youtube', 
              icon: <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /> 
            },
            { 
              name: 'WhatsApp', 
              icon: <path d="M17.472 14.382c-.301-.149-1.767-.872-2.04-.971-.272-.099-.47-.149-.669.149-.198.297-.769.971-.941 1.163-.173.192-.347.218-.648.07-.301-.149-1.27-.468-2.42-1.493-.894-.797-1.497-1.782-1.672-2.081-.173-.298-.018-.46.132-.607.135-.133.301-.347.452-.52.151-.172.2-.297.301-.495.101-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.206-.241-.579-.485-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.298-1.04 1.015-1.04 2.472 0 1.458 1.065 2.871 1.213 3.07.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.711.226 1.359.195 1.871.118.571-.085 1.767-.721 2.016-1.412.247-.691.247-1.287.172-1.411-.073-.124-.269-.199-.57-.348zM12.067 0C5.412 0 0 5.412 0 12.067c0 2.124.551 4.197 1.603 6.024L0 24l6.104-1.603c1.767 1.013 3.771 1.547 5.86 1.55 6.643 0 12.055-5.412 12.055-12.067C24.019 5.412 18.607 0 12.067 0z" /> 
            }
          ].map((social, i) => (
            <a 
              key={i} 
              href="#" 
              aria-label={social.name}
              className="text-white/40 hover:text-orange-500 transition-all duration-300 transform hover:scale-125"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/20">
          © 2025 MuscFIT. All rights reserved.
        </p>
      </footer>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1) translateY(-50%); opacity: 0.1; }
          50% { transform: scale(1.1) translateY(-55%); opacity: 0.15; }
        }
        .animate-breathe {
          animation: breathe 10s ease-in-out infinite;
        }
        .animate-breathe-delay {
          animation: breathe 10s ease-in-out infinite 5s;
        }
        .font-barlow { font-family: var(--font-barlow); }
        .font-barlow-condensed { font-family: var(--font-barlow-condensed); }
      `}</style>
    </div>
  );
}
