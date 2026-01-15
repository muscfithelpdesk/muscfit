import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function AppComingSoon() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-4 py-20 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-transparent to-transparent opacity-50"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/30 to-transparent rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">

                {/* App Icon/Visual */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-black to-gray-800 rounded-3xl mx-auto shadow-2xl flex items-center justify-center transform -rotate-12 mb-8">
                    <span className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">MF</span>
                </div>

                <div className="space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-bold text-xs tracking-wider uppercase">
                        Coming Soon to IOS & Android
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-gray-900 leading-[0.9]">
                        SOMETHING <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">KNOCKOUT</span> IS LOADING...
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                        We're currently crafting the ultimate mobile training experience. The MUSCFIT App is under active development and will be launching soon.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 bg-black text-white text-base font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Return to Homepage
                    </Link>
                </div>

                <p className="text-sm text-gray-400 font-medium">
                    Stay tuned for updates!
                </p>
            </div>
        </div>
    );
}
