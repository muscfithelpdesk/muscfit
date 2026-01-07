'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
    const [password, setPassword] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (password === '9911') {
            setIsUnlocked(true);
            // Delay showing the main content slightly or let the curtain reveal it
            setTimeout(() => setShowContent(true), 500);
        } else if (password.length >= 4) {
            setError(true);
            setTimeout(() => {
                setPassword('');
                setError(false);
            }, 500);
        }
    }, [password]);

    return (
        <main className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-rose-500 selection:text-white font-sans">

            {/* Background Content (Revealed after unlock) */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>

                {/* Snow Effect */}
                {isUnlocked && <SnowEffect />}

                <div className="z-10 text-center animate-fade-in-up">
                    <h1 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-2xl mb-8">
                        Welcome Sui
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide mb-12">
                        Your premium experience awaits.
                    </p>

                    <Link
                        href="/homepage"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-medium overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.7)]"
                    >
                        <span className="relative z-10">Enter Store</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </Link>
                </div>

                {/* Decor Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black -z-10" />
            </div>

            {/* Curtains */}
            <div
                className={`absolute top-0 left-0 w-1/2 h-full bg-zinc-950 z-40 transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] border-r border-zinc-900/50 ${isUnlocked ? '-translate-x-full' : 'translate-x-0'}`}
            >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-30 mix-blend-overlay"></div>
            </div>

            <div
                className={`absolute top-0 right-0 w-1/2 h-full bg-zinc-950 z-40 transition-transform duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] border-l border-zinc-900/50 ${isUnlocked ? 'translate-x-full' : 'translate-x-0'}`}
            >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-30 mix-blend-overlay"></div>
            </div>

            {/* Lock Screen Interface */}
            <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 ${isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="w-full max-w-sm px-6">
                    <div className="mb-12 text-center">
                        <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white/70">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                        </div>
                        <h2 className="text-sm font-medium text-zinc-400 tracking-[0.2em] uppercase">Security Access</h2>
                    </div>

                    <div className="relative group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="PASSCODE"
                            className={`w-full bg-transparent border-b border-white/20 py-4 text-center text-3xl tracking-[0.5em] placeholder:text-zinc-700 placeholder:text-sm placeholder:tracking-widest focus:outline-none focus:border-white/60 transition-all duration-300 ${error ? 'border-rose-500 text-rose-500 animate-shake' : 'text-white'}`}
                            autoFocus
                            maxLength={4}
                        />
                        <div className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ease-out ${password.length > 0 ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-zinc-600 font-medium tracking-wider">ENTER 9911 TO UNLOCK</p>
                    </div>
                </div>
            </div>

            {/* Inline Styles for animations/snow not in Tailwind by default */}
            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(-10vh) translateX(-10px); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0.3; }
        }
        .snowflake {
          position: absolute;
          top: -10px;
          color: white;
          font-size: 1em;
          font-family: Arial;
          text-shadow: 0 0 1px #000;
          user-select: none;
          pointer-events: none;
          animation-name: float;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </main>
    );
}

// Simple Snow Component
function SnowEffect() {
    // Create an array of 50 snowflakes with random properties
    const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 5}s`, // 5-8s
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.3,
        size: Math.random() * 10 + 10, // 10px-20px
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: flake.left,
                        animationDuration: flake.animationDuration,
                        animationDelay: flake.animationDelay,
                        opacity: flake.opacity,
                        fontSize: `${flake.size}px`,
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
}
