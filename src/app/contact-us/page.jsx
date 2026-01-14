'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ContactUsPage() {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate submission
        setTimeout(() => {
            setFormStatus('success');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background pt-[120px] pb-20">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tight mb-4">
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">Touch</span>
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Have questions about your order, sizing, or just want to say hello? We're here to help you crush your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-surface/50 border border-border p-8 rounded-2xl hover:border-primary/30 transition-colors">
                            <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                                <Icon name="ChatBubbleLeftRightIcon" size={28} className="text-primary" />
                                Contact Info
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Icon name="EnvelopeIcon" size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Email Us</p>
                                        <a href="mailto:muscfithelpdesk@gmail.com" className="text-lg font-bold hover:text-primary transition-colors">
                                            muscfithelpdesk@gmail.com
                                        </a>
                                        <p className="text-sm text-text-secondary mt-1">We respond within 24 hours.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Icon name="PhoneIcon" size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Call Us</p>
                                        <div className="space-y-1">
                                            <a href="tel:+919911386842" className="block text-lg font-bold hover:text-primary transition-colors">
                                                +91 99113 86842
                                            </a>
                                            <a href="tel:+919876543210" className="block text-lg font-bold hover:text-primary transition-colors text-text-secondary">
                                                +91 98765 43210
                                            </a>
                                        </div>
                                        <p className="text-sm text-text-secondary mt-1">Mon-Sat, 9AM - 7PM IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Icon name="MapPinIcon" size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">HQ Location</p>
                                        <p className="text-lg font-medium">
                                            New Delhi, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQs Link Card */}
                        <div className="bg-black text-white p-8 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-colors"></div>
                            <div className="relative z-10">
                                <h3 className="font-heading text-2xl font-bold mb-2">Need Quick Answers?</h3>
                                <p className="text-gray-400 mb-6">Check our Frequently Asked Questions for instant help regarding shipping, returns, and more.</p>
                                <a href="/info/faqs" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                                    Read FAQs <Icon name="ArrowRightIcon" size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white border border-gray-100 shadow-sharp-lg p-8 rounded-2xl">
                        <h3 className="font-heading text-2xl font-bold mb-6">Send a Message</h3>

                        {formStatus === 'success' ? (
                            <div className="h-[400px] flex flex-col items-center justify-center text-center animate-fade-in-up">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <Icon name="CheckIcon" size={32} />
                                </div>
                                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                                <p className="text-gray-500">We'll get back to you as soon as possible.</p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="mt-6 text-primary font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</label>
                                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                                        <option>Order Inquiry</option>
                                        <option>Product Question</option>
                                        <option>Return/Exchange</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className="w-full py-4 bg-black text-white font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {formStatus === 'submitting' ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
