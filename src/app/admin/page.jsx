'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { supabase } from '@/lib/supabase';
import { productService } from '@/lib/services/productService';
import { uploadService } from '@/lib/services/uploadService';
import { orderService } from '@/lib/services/orderService';
import { userService } from '@/lib/services/userService';
import InventoryDashboard from '@/components/admin/InventoryDashboard';

// --- Shared Constants ---
const statusColors = {
    Pending: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/50',
    Processing: 'bg-blue-500/10 text-blue-700 border-blue-500/50',
    Shipped: 'bg-purple-500/10 text-purple-700 border-purple-500/50',
    Delivered: 'bg-green-500/10 text-green-700 border-green-500/50',
    Cancelled: 'bg-red-500/10 text-red-700 border-red-500/50',
    Active: 'bg-green-500/10 text-green-700 border-green-500/50',
    Draft: 'bg-gray-500/10 text-gray-700 border-gray-500/50',
    'Out of Stock': 'bg-red-500/10 text-red-700 border-red-500/50',
};

const paymentStatusColors = {
    Paid: 'text-green-600',
    Pending: 'text-yellow-600',
    Failed: 'text-red-600',
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// --- Sub-Components ---

function OrderRow({ order, onStatusChange, onToggleExpand, isExpanded }) {
    return (
        <>
            <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                    <button
                        onClick={() => onToggleExpand(order?.id)}
                        className="text-white/40 hover:text-white transition-colors"
                    >
                        <Icon name={isExpanded ? 'ChevronDownIcon' : 'ChevronRightIcon'} size={20} />
                    </button>
                </td>
                <td className="px-6 py-4 font-black text-[10px] tracking-widest text-white/40 uppercase">{order?.id.slice(0, 8)}...</td>
                <td className="px-6 py-4">
                    <div className="text-sm font-bold text-white">{order?.customer?.name}</div>
                    <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">{order?.customer?.email}</div>
                </td>
                <td className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">{new Date(order?.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-black text-sm text-white italic">₹{order?.totalAmount?.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{order?.paymentMethod}</div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mt-1 ${order?.paymentStatus === 'Paid' ? 'text-green-500' : 'text-yellow-500'}`}>{order?.paymentStatus}</div>
                </td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded border text-[10px] font-black uppercase tracking-widest ${statusColors[order?.orderStatus]}`}>
                        {order?.orderStatus}
                    </span>
                </td>
                <td className="px-6 py-4">
                    <select
                        value={order?.orderStatus}
                        onChange={(e) => onStatusChange(order?.id, e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-white/30"
                    >
                        {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-white/[0.02]">
                    <td colSpan="8" className="px-10 py-8 border-b border-white/5">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <Icon name="ShoppingBagIcon" size={14} />
                                    Manifest
                                </h4>
                                <div className="space-y-3">
                                    {order?.items?.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                                            <div className="text-xs font-bold text-white uppercase tracking-tight">{item?.name} (x{item?.quantity})</div>
                                            <div className="font-black text-xs text-white italic">₹{item?.price?.toLocaleString('en-IN')}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                    <Icon name="MapPinIcon" size={14} />
                                    Deployment Intel
                                </h4>
                                <div className="p-6 bg-black/40 rounded-xl border border-white/5 space-y-4">
                                    <div>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Recipient</p>
                                        <p className="text-sm font-bold text-white uppercase">{order?.customer?.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Coordinates</p>
                                        <p className="text-sm font-medium text-white/60 leading-relaxed uppercase">{order?.shippingAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}

// --- Main Page ---

export default function UnifiedAdminPage() {
    const [activeTab, setActiveTab] = useState('orders');
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Common State
    const [isAdmin, setIsAdmin] = useState(false);

    // Orders State
    const [orders, setOrders] = useState([]);
    const [orderSearchQuery, setOrderSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [expandedOrders, setExpandedOrders] = useState(new Set());

    // Products State
    const [products, setProducts] = useState([]);
    const [productSearchQuery, setProductSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Men',
        gender: 'men',
        price: 0,
        originalPrice: 0,
        stockQuantity: 0,
        isActive: true,
        description: '',
        brand: 'MUSCFIT',
        tag: 'NEW',
        remarks: '',
        imageUrl: ''
    });

    // Promos State
    const [promoCodes, setPromoCodes] = useState([]);
    const [showCreatePromoModal, setShowCreatePromoModal] = useState(false);
    const [newPromoCode, setNewPromoCode] = useState({
        code: '', discount_percentage: 10, max_uses: 100,
        valid_from: new Date().toISOString().slice(0, 16),
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    });

    // Users & Stats State
    const [users, setUsers] = useState([]);
    const [adminStats, setAdminStats] = useState(null);
    const [userSearchQuery, setUserSearchQuery] = useState('');

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const isUserAdmin = user?.user_metadata?.role === 'admin' || user?.app_metadata?.role === 'admin' || user?.email === 'kakupro009@gmail.com';
            setIsAdmin(isUserAdmin);
            if (isUserAdmin) loadInitialData();
        };
        checkAdmin();
    }, []);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            const [orderData, productData, promoData, userData, statsData] = await Promise.all([
                orderService.getAllOrders(),
                productService.getAllForAdmin(),
                supabase.from('promo_codes').select('*').order('created_at', { ascending: false }),
                userService.getAllUsers(),
                userService.getAdminStats()
            ]);
            setOrders(orderData || []);
            setProducts(productData || []);
            setPromoCodes(promoData.data || []);
            setUsers(userData || []);
            setAdminStats(statsData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // --- Handlers ---

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setIsSaving(true);
            await orderService.updateOrderStatus(orderId, newStatus);
            const updated = await orderService.getAllOrders();
            setOrders(updated);
        } catch (err) {
            alert('Sync failed: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };



    // Product handlers moved to /admin/inventory


    const handleCreatePromo = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            const { data: { user } } = await supabase.auth.getUser();
            await supabase.from('promo_codes').insert([{ ...newPromoCode, created_by: user.id, status: 'active' }]);
            const { data } = await supabase.from('promo_codes').select('*').order('created_at', { ascending: false });
            setPromoCodes(data);
            setShowCreatePromoModal(false);
        } catch (err) {
            alert('Failed to create promo: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Catalog sync moved to /admin/inventory


    // --- Filtering & Analytics Logic ---
    const filteredOrders = orders.filter(o =>
        (o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) || o.customer?.name?.toLowerCase().includes(orderSearchQuery.toLowerCase())) &&
        (filterStatus === 'All' || o.orderStatus?.toLowerCase() === filterStatus.toLowerCase())
    );

    const totalRevenue = orders.reduce((sum, o) => (o.paymentStatus?.toLowerCase() === 'completed' || o.paymentStatus?.toLowerCase() === 'paid') ? sum + o.totalAmount : sum, 0);
    const pendingOrders = orders.filter(o => o.orderStatus?.toLowerCase() === 'pending').length;

    const tabs = [
        { id: 'orders', label: 'Orders', icon: 'ClipboardDocumentListIcon' },
        { id: 'products', label: 'Inventory', icon: 'CubeIcon' },
        { id: 'users', label: 'Users', icon: 'UserGroupIcon' },
        { id: 'promos', label: 'Promo Codes', icon: 'TicketIcon' },
        { id: 'analytics', label: 'Analytics', icon: 'ChartBarIcon' },
    ];

    if (!isAdmin && !loading) return <div className="p-20 text-center text-red-500 font-bold uppercase tracking-widest">Unauthorized Access Denied</div>;

    return (
        <div className="min-h-screen bg-black pt-[80px]">
            {/* Header */}
            <div className="bg-zinc-900 border-b border-white/10 px-6 py-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase flex items-center gap-3">
                            <Icon name="Cog6ToothIcon" size={36} className="text-white" />
                            Admin Command Center
                        </h1>
                        <p className="text-white/40 mt-2 font-medium tracking-widest uppercase text-xs">Unified Management Platform • Secure Node</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl min-w-[150px]">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Total Revenue</p>
                            <p className="text-xl font-black text-white italic">₹{totalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl min-w-[150px]">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Active Users</p>
                            <p className="text-xl font-black text-green-500 italic">{users.length}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl min-w-[150px]">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Pending Tasks</p>
                            <p className="text-xl font-black text-yellow-500 italic">{pendingOrders}</p>
                        </div>
                        <button
                            onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
                            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 p-4 rounded-xl transition-all group"
                            title="Sign Out"
                        >
                            <Icon name="PowerIcon" size={24} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-zinc-900 border-b border-white/10 sticky top-[80px] z-30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-8 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === tab.id ? 'text-white border-white bg-white/5' : 'text-white/30 border-transparent hover:text-white/60'
                                    }`}
                            >
                                <Icon name={tab.icon} size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
                        <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">Syncing with Supabase...</p>
                    </div>
                ) : (
                    <>
                        {/* ORDERS TAB */}
                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-4 justify-between bg-zinc-900/50 p-6 rounded-2xl border border-white/10">
                                    <div className="relative flex-1">
                                        <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                                        <input
                                            type="text"
                                            placeholder="SEARCH ORDER ID OR CUSTOMER..."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white uppercase text-xs font-bold tracking-widest outline-none focus:border-white/30 transition-all"
                                            value={orderSearchQuery}
                                            onChange={(e) => setOrderSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <select
                                        className="bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-white text-xs font-bold uppercase tracking-widest outline-none"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="All">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>

                                <div className="bg-zinc-900/50 rounded-2xl border border-white/10 overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-white/5 border-b border-white/10">
                                                <tr>
                                                    <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Expand</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">ID</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Customer</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Date</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Amount</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Payment</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Status</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-white">
                                                {filteredOrders.map(order => (
                                                    <OrderRow
                                                        key={order.id}
                                                        order={order}
                                                        isExpanded={expandedOrders.has(order.id)}
                                                        onToggleExpand={(id) => {
                                                            const next = new Set(expandedOrders);
                                                            next.has(id) ? next.delete(id) : next.add(id);
                                                            setExpandedOrders(next);
                                                        }}
                                                        onStatusChange={handleStatusChange}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PRODUCTS TAB */}
                        {activeTab === 'products' && (
                            <div className="w-full relative z-0">
                                <InventoryDashboard isEmbedded={true} initialProducts={products} />
                            </div>
                        )}

                        {/* USERS TAB */}
                        {activeTab === 'users' && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Registered Athletes ({users.length})</h2>
                                    <div className="relative w-72">
                                        <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                                        <input
                                            type="text"
                                            placeholder="SEARCH USERS..."
                                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white uppercase text-[10px] font-black tracking-widest outline-none"
                                            value={userSearchQuery}
                                            onChange={(e) => setUserSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="bg-zinc-900/50 rounded-2xl border border-white/10 overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-white/5 border-b border-white/10">
                                            <tr>
                                                <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Athlete</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Email</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Joined At</th>
                                                <th className="px-6 py-4 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-white">
                                            {users.filter(u => u.full_name?.toLowerCase().includes(userSearchQuery.toLowerCase()) || u.email?.toLowerCase().includes(userSearchQuery.toLowerCase())).map(u => (
                                                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-sm tracking-tight">{u.full_name || 'Incognito Athlete'}</td>
                                                    <td className="px-6 py-4 text-sm text-white/60">{u.email}</td>
                                                    <td className="px-6 py-4 text-[10px] font-black uppercase text-white/30">{new Date(u.created_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${u.role === 'admin' ? 'border-red-500/50 text-red-500 bg-red-500/10' : 'border-white/10 text-white/40 bg-white/5'}`}>
                                                            {u.role || 'user'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* PROMOS TAB */}
                        {activeTab === 'promos' && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Promotional Codes</h2>
                                    <button
                                        onClick={() => setShowCreatePromoModal(true)}
                                        className="bg-white text-black px-8 py-3 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-zinc-200"
                                    >
                                        <Icon name="TicketIcon" size={18} className="mr-2" />
                                        Generate New Code
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {promoCodes.map(code => (
                                        <div key={code.id} className="bg-zinc-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 -rotate-45 translate-x-12 -translate-y-12"></div>
                                            <h3 className="text-2xl font-black text-white italic mb-1 uppercase tracking-tighter">{code.code}</h3>
                                            <p className="text-4xl font-black text-white tracking-widest mt-4">{code.discount_percentage}<span className="text-lg">% OFF</span></p>
                                            <div className="mt-8 space-y-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                                                <div className="flex justify-between"><span>Max Uses: {code.max_uses}</span><span>Uses: {code.current_uses}</span></div>
                                                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                                    <div className="bg-white h-full" style={{ width: `${(code.current_uses / code.max_uses) * 100}%` }}></div>
                                                </div>
                                                <p className="pt-2">Valid Until: {new Date(code.valid_until).toLocaleDateString()}</p>
                                            </div>
                                            <div className="mt-6 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { if (confirm('Delete promo?')) supabase.from('promo_codes').delete().eq('id', code.id).then(loadInitialData) }} className="text-red-500/60 hover:text-red-500 transition-colors"><Icon name="TrashIcon" size={20} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ANALYTICS TAB */}
                        {activeTab === 'analytics' && (
                            <div className="space-y-8">
                                {/* Leaderboard Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Visitor Traffic</p>
                                        <p className="text-3xl font-black text-white italic">{adminStats?.traffic?.dailyVisits}</p>
                                        <p className="text-[10px] font-bold text-green-500 mt-1">+12% from yesterday</p>
                                    </div>
                                    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Conversion Rate</p>
                                        <p className="text-3xl font-black text-white italic">{adminStats?.traffic?.conversionRate}%</p>
                                        <p className="text-[10px] font-bold text-blue-500 mt-1">Goal: 5.0%</p>
                                    </div>
                                    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Total Users</p>
                                        <p className="text-3xl font-black text-white italic">{adminStats?.totalUsers}</p>
                                        <p className="text-[10px] font-bold text-white/20 mt-1">Verified Profiles</p>
                                    </div>
                                    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Inventory Health</p>
                                        <p className="text-3xl font-black text-white italic">{products.length - adminStats?.lowStockCount}/{products.length}</p>
                                        <p className="text-[10px] font-bold text-red-500 mt-1">{adminStats?.lowStockCount} Items Low Stock</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
                                        <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.3em] mb-8">Revenue Performance</h3>
                                        <div className="h-[400px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={products.map(p => ({ name: p.name, revenue: p.price * (p.sales || 0) }))}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                                                    <XAxis dataKey="name" hide />
                                                    <YAxis stroke="#ffffff20" fontSize={10} />
                                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10' }} />
                                                    <Bar dataKey="revenue" fill="#fff" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
                                        <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.3em] mb-8">Inventory Distribution</h3>
                                        <div className="h-[400px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={products.map(p => ({ name: p.name, value: p.stockQuantity }))}
                                                        innerRadius={60}
                                                        outerRadius={100}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {products.map((_, i) => <Cell key={i} fill={`hsl(${i * 137.5}, 50%, 50%)`} stroke="none" />)}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10' }} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl lg:col-span-2">
                                        <h3 className="text-sm font-black text-white/30 uppercase tracking-[0.3em] mb-8">Growth Momentum (Past 7 Days)</h3>
                                        <div className="h-[300px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={adminStats?.traffic?.growthHistory}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                                                    <XAxis dataKey="day" stroke="#ffffff20" fontSize={10} />
                                                    <YAxis stroke="#ffffff20" fontSize={10} />
                                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff10' }} />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="users" stroke="#00C49F" strokeWidth={3} dot={{ fill: '#00C49F' }} />
                                                    <Line type="monotone" dataKey="orders" stroke="#FFBB28" strokeWidth={3} dot={{ fill: '#FFBB28' }} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* MODALS */}
            {
                showCreatePromoModal && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                        <div className="bg-zinc-900 border border-white/10 w-full max-w-md p-10 rounded-3xl animate-scale-in">
                            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8">Generate Voucher</h2>
                            <form onSubmit={handleCreatePromo} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Promo Code</label>
                                    <input required value={newPromoCode.code} onChange={e => setNewPromoCode({ ...newPromoCode, code: e.target.value.toUpperCase() })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none uppercase" placeholder="MUSC20" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Discount %</label>
                                        <input type="number" required value={newPromoCode.discount_percentage} onChange={e => setNewPromoCode({ ...newPromoCode, discount_percentage: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Max Uses</label>
                                        <input type="number" required value={newPromoCode.max_uses} onChange={e => setNewPromoCode({ ...newPromoCode, max_uses: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Expires On</label>
                                    <input type="datetime-local" required value={newPromoCode.valid_until} onChange={e => setNewPromoCode({ ...newPromoCode, valid_until: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button type="submit" disabled={isSaving} className="flex-1 bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest">{isSaving ? 'Syncing...' : 'CREATE'}</button>
                                    <button type="button" onClick={() => setShowCreatePromoModal(false)} className="flex-1 bg-white/5 text-white/40 py-4 rounded-xl font-black uppercase text-xs tracking-widest">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }


        </div >
    );
}
