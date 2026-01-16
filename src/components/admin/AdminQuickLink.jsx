'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useState, useEffect } from 'react';

export default function AdminQuickLink() {
    const { user } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const role = user?.user_metadata?.role || user?.app_metadata?.role;
        const isEmailAdmin = user?.email === 'admin@muscfit.com';
        setIsAdmin(role === 'admin' || isEmailAdmin);
    }, [user]);

    if (!isAdmin) return null;

    return (
        <div className={`fixed bottom-8 left-8 z-[9999] transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="relative group">
                <Link
                    href="/admin"
                    className="flex items-center gap-3 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all border border-white/20 active:scale-95 group"
                >
                    <div className="w-6 h-6 flex items-center justify-center">
                        <Icon name="UsersIcon" size={20} className="group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 font-bold whitespace-nowrap text-sm tracking-widest uppercase">
                        Admin Console
                    </span>
                </Link>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                    <Icon name="XMarkIcon" size={12} />
                </button>
            </div>
        </div>
    );
}
