'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';

export default function PerformanceVisuals({ title, subtitle, features }) {
    return (
        <section className="py-16 md:py-24 bg-black overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tight">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Main Visual */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-xl bg-gray-900 border border-white/10">
                            <AppImage
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop"
                                alt="High-performance athlete"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                            {/* Technical Overlay */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-4">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    Live Tech Analysis
                                </div>
                                <div className="text-white font-bold text-xl md:text-2xl">
                                    BORN FOR THE GRIND
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tech Features */}
                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-xl font-bold">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* CTA */}
                        <div className="pt-6">
                            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-primary/20">
                                EXPLORE TECHNOLOGY
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative ambient light */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        </section>
    );
}
