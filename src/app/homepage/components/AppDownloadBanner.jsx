import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

// Direct SVG components for independence and performance
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
        <section className="w-full bg-gradient-to-r from-yellow-50 to-orange-100 overflow-hidden relative border-y border-orange-200">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">

                    {/* Left Side: Mockup Image */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                        <div className="relative w-64 md:w-80 lg:w-[400px] h-64 md:h-80 lg:h-[400px]">
                            {/* Hand holding phone mockup placeholder */}
                            <AppImage
                                src="https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?q=80&w=1000&auto=format&fit=crop"
                                alt="MuscFit App on Phone"
                                className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic tracking-tighter text-gray-900 leading-none">
                                MORE KNOCKOUT <span className="text-orange-600">OFFERS</span> WAITING!
                            </h2>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <p className="text-xl md:text-3xl font-bold text-gray-800">
                                    Only On The <span className="text-orange-600 font-extrabold italic">MUSCFIT</span> App
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                            <p className="text-xl font-bold text-gray-900 mr-2 hidden md:block">
                                Download Now
                            </p>

                            <Link
                                href="#"
                                className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg group w-48 justify-center"
                            >
                                <div className="shrink-0 transition-transform group-hover:scale-110 duration-300">
                                    <GooglePlayLogo />
                                </div>
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[10px] font-medium uppercase text-gray-300">Android App On</span>
                                    <span className="text-sm font-bold">Google Play</span>
                                </div>
                            </Link>

                            <Link
                                href="#"
                                className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-lg group w-48 justify-center"
                            >
                                <div className="shrink-0 transition-transform group-hover:scale-110 duration-300">
                                    <AppleLogo />
                                </div>
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[10px] font-medium uppercase text-gray-300">Download on the</span>
                                    <span className="text-sm font-bold">App Store</span>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-300 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        </section>
    );
}
