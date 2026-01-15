import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const AppleLogo = () => (
    <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
    </svg>
);

const GooglePlayLogo = () => (
    <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
);

export default function AppDownloadBanner() {
    return (
        <section className="w-full relative overflow-hidden bg-background">

            {/* Subtle Ambient Background - Seamless blend */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-transparent opacity-50"></div>

            {/* Reduced decorative elements for cleaner look */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/20 to-transparent rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">

                    {/* Left Side: Mockup with floating effect */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative group">
                        <div className="relative w-36 md:w-52 lg:w-[240px] h-36 md:h-52 lg:h-[260px] flex items-center justify-center">

                            {/* Phone Frame Glow */}
                            <div className="absolute inset-0 bg-orange-500/5 rounded-[3rem] blur-3xl transform scale-90"></div>

                            <div className="relative w-full h-full animate-[float_6s_ease-in-out_infinite]">
                                {/* Using the custom MuscFit app mockup */}
                                <AppImage
                                    src="/assets/images/muscfit-app-mockup.png"
                                    alt="MuscFit Mobile App Profile Screen"
                                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:rotate-1 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full md:flex-1 text-center md:text-left space-y-3">
                        <div className="space-y-4">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-bold text-xs tracking-wider uppercase mb-2">
                                Level Up Your Training
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic tracking-tighter text-gray-900 leading-[0.9] drop-shadow-sm overflow-visible pb-2">
                                MORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 pb-2 pr-2">KNOCKOUT</span> OFFERS WAITING!
                            </h2>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <p className="text-xl md:text-3xl font-bold text-gray-800 tracking-tight">
                                    Only On The <span className="text-orange-600 font-extrabold italic relative inline-block">
                                        MUSCFIT
                                    </span> App
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                            <Link
                                href="#"
                                className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group min-w-[170px] justify-center"
                            >
                                <div className="shrink-0 transition-transform group-hover:scale-110 duration-300">
                                    <GooglePlayLogo />
                                </div>
                                <div className="flex flex-col items-start leading-none space-y-1">
                                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Get it on</span>
                                    <span className="text-base font-bold text-white">Google Play</span>
                                </div>
                            </Link>

                            <Link
                                href="#"
                                className="flex items-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group min-w-[170px] justify-center"
                            >
                                <div className="shrink-0 transition-transform group-hover:scale-110 duration-300">
                                    <AppleLogo />
                                </div>
                                <div className="flex flex-col items-start leading-none space-y-1">
                                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Download on the</span>
                                    <span className="text-base font-bold text-white">App Store</span>
                                </div>
                            </Link>
                        </div>

                        <p className="text-sm text-gray-500 font-medium max-w-md mx-auto md:mx-0 pt-2">
                            Download now and get <span className="font-bold text-gray-800">10% OFF</span> your first in-app order.
                        </p>
                    </div>

                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
        </section>
    );
}
