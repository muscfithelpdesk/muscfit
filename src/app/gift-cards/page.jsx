'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function GiftCardsPage() {
    return (
        <div className="min-h-screen bg-background pt-[120px] pb-20">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Hero Section */}
                <div className="relative rounded-2xl overflow-hidden bg-black text-white min-h-[60vh] flex items-center justify-center mb-16">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2000&auto=format&fit=crop"
                            alt="Gift card background"
                            className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
                    </div>

                    <div className="relative z-10 text-center max-w-3xl px-6">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                            Coming Soon
                        </span>
                        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black mb-6 uppercase tracking-tight">
                            Give the Gift of <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">Power</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Digital gift cards are launching soon. The perfect gift for the athlete in your life who demands the best.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/men-catalog"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-full"
                            >
                                Shop Men
                            </Link>
                            <Link
                                href="/women-catalog"
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors rounded-full"
                            >
                                Shop Women
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="p-8 rounded-2xl bg-surface/50 border border-border hover:border-primary/30 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Icon name="BoltIcon" size={24} className="text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-bold mb-3">Instant Delivery</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Digital cards are delivered instantly via email, ready to be forwarded or printed for your champion.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-surface/50 border border-border hover:border-primary/30 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Icon name="CurrencyRupeeIcon" size={24} className="text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-bold mb-3">Flexible Values</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Choose from amounts ranging from ₹1,000 to ₹10,000 to suit any budget or occasion.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-surface/50 border border-border hover:border-primary/30 transition-colors group">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Icon name="ClockIcon" size={24} className="text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-bold mb-3">No Expiry</h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            Our gift cards never expire. They'll be ready whenever they decide to upgrade their gear.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
