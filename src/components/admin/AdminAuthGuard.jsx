'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function AdminAuthGuard({ children }) {
    const { user, signIn, loading: authLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            const role = user?.user_metadata?.role || user?.app_metadata?.role;
            if (user && role === 'admin') {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        }
    }, [user, authLoading]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await signIn(email, password);
            if (result.success) {
                const role = result.data.user?.user_metadata?.role || result.data.user?.app_metadata?.role;
                if (role !== 'admin') {
                    setError('Access denied. Admin privileges required.');
                }
            } else {
                setError(result.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans selection:bg-white selection:text-black">
                <div className="max-w-md w-full">
                    <div className="mb-12 text-center animate-fade-in-down">
                        <Link href="/" className="inline-block mb-8">
                            <h1 className="text-4xl font-black text-white tracking-[0.2em] uppercase">MUSCFIT</h1>
                        </Link>
                        <h2 className="text-xl font-bold text-white/90 tracking-widest uppercase mb-2">Admin Terminal</h2>
                        <div className="h-1 w-12 bg-white mx-auto"></div>
                    </div>

                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl animate-scale-in">
                        <p className="text-white/60 text-sm mb-8 text-center font-medium">
                            Secure authentication required to access administrative systems.
                        </p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 px-1">
                                    Access Key (Email)
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Icon name="EnvelopeIcon" size={18} className="text-white/30 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-medium"
                                        placeholder="admin@muscfit.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 px-1">
                                    Security Token (Password)
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Icon name="LockClosedIcon" size={18} className="text-white/30 group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs font-bold animate-shake">
                                    <Icon name="ExclamationTriangleIcon" size={16} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-xl shadow-white/5"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Decrypt Access</span>
                                        <Icon name="ArrowRightIcon" size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link href="/" className="text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2 group">
                                <Icon name="HomeIcon" size={12} className="group-hover:-translate-x-1 transition-transform" />
                                Return to Surface
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 text-center text-white/20 text-[10px] uppercase tracking-[0.5em]">
                        &copy; 2026 MuscFIT System Ops
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
