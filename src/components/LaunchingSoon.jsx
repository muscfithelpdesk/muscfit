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
    <div className="relative h-screen w-full flex flex-col items-center justify-between text-white overflow-hidden bg-[#060606] font-barlow">
      
      {/* 🌫️ Premium SVG Noise Filter */}
      <svg className="absolute w-0 h-0 invisible">
        <filter id="noiseLayer">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.04" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* 🌌 Multi-Layer Cinematic Background */}
      <div className="absolute inset-0 z-0">
        {/* Molten Amber Glow behind Hero */}
        <div className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] bg-orange-600/15 rounded-full blur-[140px] animate-breathe pointer-events-none"></div>
        
        {/* Red-Orange Glow Bottom Right */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] bg-[#cc3300]/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        {/* Diagonal Light Streak Lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
             style={{ 
               background: 'repeating-linear-gradient(35deg, transparent, transparent 40px, #ffffff 41px, transparent 42px)',
               backgroundSize: '100% 100%'
             }}></div>

        {/* Full Page Grain/Noise Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay" style={{ filter: 'url(#noiseLayer)' }}></div>
        
        {/* Breathing Edge Glows */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-orange-900/5 to-transparent animate-pulse opacity-50"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-orange-900/5 to-transparent animate-pulse opacity-50"></div>
      </div>

      {/* 🧭 TOP BAR Overlay */}
      <header className="w-full relative z-20 flex flex-col items-center">
        <div className="w-full flex justify-between items-center p-8 md:px-12 md:py-10 max-w-[1600px]">
          {/* Logo - Existing Brand Signature */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="relative w-40 md:w-52 h-14 md:h-18">
              <AppImage 
                src="/muscfit-exact-logo.png" 
                alt="MUSCFIT Logo"
                className="w-full h-full object-contain mix-blend-screen"
              />
            </div>
          </div>

          {/* Top Right SIGNAL */}
          <div className={`transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <span className="text-[10px] md:text-xs font-black text-orange-500/80 tracking-[0.6em] uppercase cursor-default select-none">
              » STAY TUNED «
            </span>
          </div>
        </div>
        {/* Sharp Blade Line Divider */}
        <div className="w-full h-[1px] bg-amber-500 opacity-20"></div>
      </header>

      {/* 🚀 MAIN VIBE SECTION (CENTERED) */}
      <main className="relative z-20 w-screen h-full flex flex-col items-center justify-center text-center px-4 -mt-10 overflow-hidden">
        
        {/* Hype Pill Badge */}
        <div className={`mb-8 flex transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-[#E07B2A]/10 border border-[#E07B2A]/20 px-4 py-1 rounded-full shadow-[0_0_20px_rgba(224,123,42,0.1)] group">
            <span className="text-[9px] md:text-[11px] font-black tracking-widest text-[#E07B2A] uppercase">
              🔥 DROP INCOMING
            </span>
          </div>
        </div>

        {/* Giant Bebas/Barlow Headline */}
        <div className={`flex flex-col mb-10 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative group">
            {/* 3D Depth Shadow Text Layer */}
            <h1 className="absolute inset-0 font-barlow-condensed font-black uppercase text-white/5 blur-[2px] translate-x-1 translate-y-1 pointer-events-none select-none"
                style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', lineHeight: '0.85' }}>
              SOMETHING BIG
            </h1>
            <h1 className="relative font-barlow-condensed font-black uppercase leading-[0.85] tracking-tight transition-all duration-500 group-hover:tracking-normal"
                style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', color: 'white' }}>
              SOMETHING BIG
            </h1>
          </div>
          <h1 
            className="font-barlow-condensed font-black uppercase leading-[0.85] tracking-tight"
            style={{ 
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              background: 'linear-gradient(to bottom, #ffffff 0%, #888888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            IS COMING
          </h1>
        </div>

        {/* Infinite Hype Ticker Marquee */}
        <div className={`w-full overflow-hidden bg-[#E07B2A]/5 py-3 mb-10 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100' : 'opacity-0 scale-x-0'}`}>
          <div className="flex animate-marquee whitespace-nowrap gap-10">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#E07B2A] uppercase select-none">
                WEAR THE GRIND · OWN THE GAME · MUSCFIT · TRAIN DIFFERENT · NEW DROP ·
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle Heading */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-barlow text-lg md:text-2xl font-light text-white/60 mb-6 italic tracking-tight">
            Built for the ones who train different.
          </p>
        </div>

        {/* Precision RAW Countdown row */}
        <div className={`flex gap-6 md:gap-16 mb-16 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex relative group">
              <div className="flex flex-col items-center">
                <span 
                  className={`font-barlow-condensed text-5xl md:text-[5rem] font-black transition-all duration-300 ${tick % 2 === 0 ? 'scale-[1.04]' : 'scale-100'}`}
                  style={{ textShadow: '0 0 15px rgba(224, 123, 42, 0.2)' }}
                >
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] md:text-[10px] font-black text-white/30 tracking-widest mt-2">{item.label}</span>
              </div>
              {i < 3 && <div className="absolute -right-3 md:-right-8 top-1/2 -translate-y-1/2 w-[1px] h-full bg-[#E07B2A]/20 scale-y-75"></div>}
            </div>
          ))}
        </div>

        {/* Be First Glass Email Section */}
        <div className={`w-full max-w-[520px] transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 mb-6 font-barlow-condensed">
            Be First. Get Early Access.
          </h3>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-1 group flex flex-col md:flex-row items-stretch focus-within:border-white/30 transition-all">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-grow bg-transparent px-6 py-4 text-xs font-bold tracking-widest outline-none border-none placeholder:text-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
            <button
              onClick={handleSubmit}
              className="bg-white text-black font-barlow-condensed font-bold px-10 py-5 text-xs tracking-widest uppercase transition-all duration-500 hover:bg-[#E07B2A] hover:text-white"
            >
              NOTIFY ME →
            </button>
          </div>
        </div>
      </main>

      {/* 🧭 FOOTER BAR Overlay */}
      <footer className={`w-full relative z-20 flex flex-col items-center transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        {/* Full Width Dividing Line */}
        <div className="w-full h-[1px] bg-amber-500/10 mb-8"></div>
        
        {/* Social GRID with labels */}
        <div className="flex gap-14 mb-8">
          {[
            { 
              name: 'INSTAGRAM', 
              icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> 
            },
            { 
              name: 'YOUTUBE', 
              icon: <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /> 
            },
            { 
              name: 'WHATSAPP', 
              icon: <path d="M17.472 14.382c-.301-.149-1.767-.872-2.04-.971-.272-.099-.47-.149-.669.149-.198.297-.769.971-.941 1.163-.173.192-.347.218-.648.07-.301-.149-1.27-.468-2.42-1.493-.894-.797-1.497-1.782-1.672-2.081-.173-.298-.018-.46.132-.607.135-.133.301-.347.452-.52.151-.172.2-.297.301-.495.101-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.206-.241-.579-.485-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.371-.272.298-1.04 1.015-1.04 2.472 0 1.458 1.065 2.871 1.213 3.07.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.711.226 1.359.195 1.871.118.571-.085 1.767-.721 2.016-1.412.247-.691.247-1.287.172-1.411-.073-.124-.269-.199-.57-.348zM12.067 0C5.412 0 0 5.412 0 12.067c0 2.124.551 4.197 1.603 6.024L0 24l6.104-1.603c1.767 1.013 3.771 1.547 5.86 1.55 6.643 0 12.055-5.412 12.055-12.067C24.019 5.412 18.607 0 12.067 0z" /> 
            }
          ].map((social, i) => (
            <a 
              key={i} 
              href="#" 
              aria-label={social.name}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="text-white/30 group-hover:text-[#E07B2A] group-hover:shadow-[0_0_15px_rgba(224,123,42,0.3)] group-hover:-translate-y-1 transition-all duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  {social.icon}
                </svg>
              </div>
              <span className="text-[7px] font-black tracking-widest mt-2 text-white/10 group-hover:text-white/40">{social.name}</span>
            </a>
          ))}
        </div>
        
        {/* Faint Legal Text */}
        <p className="text-[9px] uppercase font-bold tracking-[0.6em] text-white/10 pb-8 select-none">
          © 2025 MuscFIT · Wear The Grind. Own the Game.
        </p>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1) translate(-50%, -50%); opacity: 0.12; }
          50% { transform: scale(1.1) translate(-55%, -55%); opacity: 0.18; }
        }
        .animate-breathe {
          animation: breathe 10s ease-in-out infinite;
        }
        .font-barlow { font-family: var(--font-barlow); }
        .font-barlow-condensed { font-family: var(--font-barlow-condensed); }
        
        /* Hide scrollbars for true single viewport feel */
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
