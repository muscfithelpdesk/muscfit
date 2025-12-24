'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import PropTypes from 'prop-types';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '@/lib/supabase';

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: { name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '9876543210' },
    orderDate: '2024-12-20',
    totalAmount: 4599,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    items: [
      { name: 'Performance Compression Tee', quantity: 2, price: 1299 },
      { name: 'Elite Training Shorts', quantity: 1, price: 2001 }],

    shippingAddress: '123 MG Road, Bangalore, Karnataka 560001'
  },
  {
    id: 'ORD-2024-002',
    customer: { name: 'Priya Patel', email: 'priya.patel@example.com', phone: '9123456789' },
    orderDate: '2024-12-21',
    totalAmount: 8999,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    items: [
      { name: 'Premium Yoga Mat', quantity: 1, price: 2499 },
      { name: 'Resistance Bands Set', quantity: 1, price: 1500 },
      { name: 'Protein Shaker', quantity: 3, price: 1500 }],

    shippingAddress: '456 Park Street, Mumbai, Maharashtra 400001'
  },
  {
    id: 'ORD-2024-003',
    customer: { name: 'Amit Kumar', email: 'amit.kumar@example.com', phone: '9988776655' },
    orderDate: '2024-12-22',
    totalAmount: 3299,
    paymentMethod: 'Net Banking',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    items: [
      { name: 'Running Shoes Pro', quantity: 1, price: 3299 }],

    shippingAddress: '789 Connaught Place, New Delhi, Delhi 110001'
  },
  {
    id: 'ORD-2024-004',
    customer: { name: 'Sneha Reddy', email: 'sneha.reddy@example.com', phone: '9876512340' },
    orderDate: '2024-12-23',
    totalAmount: 5499,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    items: [
      { name: 'Gym Bag Premium', quantity: 1, price: 1999 },
      { name: 'Workout Gloves', quantity: 2, price: 1750 }],

    shippingAddress: '321 Jubilee Hills, Hyderabad, Telangana 500033'
  },
  {
    id: 'ORD-2024-005',
    customer: { name: 'Vikram Singh', email: 'vikram.singh@example.com', phone: '9123498765' },
    orderDate: '2024-12-19',
    totalAmount: 12999,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Cancelled',
    items: [
      { name: 'Smart Fitness Watch', quantity: 1, price: 12999 }],

    shippingAddress: '654 Civil Lines, Jaipur, Rajasthan 302006'
  }];


// Mock data for products
const mockProducts = [
  {
    id: 'PROD-001',
    name: 'Performance Compression Tee',
    category: 'Men',
    price: 1299,
    stock: 45,
    status: 'Active',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1241de563-1766566470696.png",
    sales: 234,
    views: 1250,
    description: 'High-performance compression tee for intense workouts'
  },
  {
    id: 'PROD-002',
    name: 'Elite Training Shorts',
    category: 'Men',
    price: 2001,
    stock: 12,
    status: 'Active',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_141043265-1765255836176.png",
    sales: 189,
    views: 980,
    description: 'Lightweight training shorts with moisture-wicking technology'
  },
  {
    id: 'PROD-003',
    name: 'Premium Yoga Mat',
    category: 'Women',
    price: 2499,
    stock: 0,
    status: 'Out of Stock',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1708cbc1d-1766130106686.png",
    sales: 456,
    views: 2100,
    description: 'Non-slip premium yoga mat with extra cushioning'
  },
  {
    id: 'PROD-004',
    name: 'Resistance Bands Set',
    category: 'Compression',
    price: 1500,
    stock: 78,
    status: 'Active',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc2f421c-1765027288584.png",
    sales: 312,
    views: 1450,
    description: 'Complete resistance bands set for home workouts'
  },
  {
    id: 'PROD-005',
    name: 'Smart Fitness Watch',
    category: 'Men',
    price: 12999,
    stock: 5,
    status: 'Active',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13cf61033-1766566469210.png",
    sales: 67,
    views: 890,
    description: 'Advanced fitness tracking with heart rate monitoring'
  },
  {
    id: 'PROD-006',
    name: 'Running Shoes Pro',
    category: 'Women',
    price: 3299,
    stock: 0,
    status: 'Draft',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19d012242-1764677610915.png",
    sales: 0,
    views: 120,
    description: 'Professional running shoes with cushioned support'
  }];


const statusColors = {
  Pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Processing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Shipped: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Delivered: 'bg-green-500/20 text-green-300 border-green-500/30',
  Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
  Active: 'bg-green-500/20 text-green-300 border-green-500/30',
  Draft: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  'Out of Stock': 'bg-red-500/20 text-red-300 border-red-500/30'
};

const paymentStatusColors = {
  Paid: 'text-green-400',
  Pending: 'text-yellow-400',
  Failed: 'text-red-400'
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Order Row Component
function OrderRow({ order, onStatusChange, onToggleExpand, isExpanded }) {
  return (
    <>
      <tr className="border-b border-border hover:bg-muted/30 transition-colors">
        <td className="px-4 py-4">
          <button
            onClick={() => onToggleExpand(order?.id)}
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label={isExpanded ? 'Collapse order details' : 'Expand order details'}>
            <Icon name={isExpanded ? 'ChevronDownIcon' : 'ChevronRightIcon'} size={20} />
          </button>
        </td>
        <td className="px-4 py-4">
          <div className="font-data text-sm font-semibold text-foreground">{order?.id}</div>
        </td>
        <td className="px-4 py-4">
          <div className="text-sm text-foreground">{order?.customer?.name}</div>
          <div className="text-xs text-text-secondary mt-1">{order?.customer?.email}</div>
        </td>
        <td className="px-4 py-4 text-sm text-text-secondary">{order?.orderDate}</td>
        <td className="px-4 py-4">
          <div className="font-data text-sm font-bold text-primary">₹{order?.totalAmount?.toLocaleString('en-IN')}</div>
        </td>
        <td className="px-4 py-4">
          <div className="text-sm text-foreground">{order?.paymentMethod}</div>
          <div className={`text-xs font-semibold mt-1 ${paymentStatusColors?.[order?.paymentStatus]}`}>
            {order?.paymentStatus}
          </div>
        </td>
        <td className="px-4 py-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors?.[order?.orderStatus]}`}>
            {order?.orderStatus}
          </span>
        </td>
        <td className="px-4 py-4">
          <select
            value={order?.orderStatus}
            onChange={(e) => onStatusChange(order?.id, e?.target?.value)}
            className="px-3 py-1.5 bg-input text-foreground border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            aria-label="Change order status">
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </td>
      </tr>
      {isExpanded &&
        <tr className="bg-surface/50">
          <td colSpan="8" className="px-4 py-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="ShoppingBagIcon" size={16} />
                  Order Items
                </h4>
                <div className="space-y-2">
                  {order?.items?.map((item, idx) =>
                    <div key={idx} className="flex justify-between items-center p-2 bg-background rounded border border-border">
                      <div>
                        <div className="text-sm text-foreground">{item?.name}</div>
                        <div className="text-xs text-text-secondary">Qty: {item?.quantity}</div>
                      </div>
                      <div className="font-data text-sm font-semibold text-primary">₹{item?.price?.toLocaleString('en-IN')}</div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="MapPinIcon" size={16} />
                  Shipping Information
                </h4>
                <div className="p-3 bg-background rounded border border-border">
                  <div className="text-sm text-foreground mb-2">{order?.customer?.name}</div>
                  <div className="text-sm text-text-secondary mb-1">{order?.customer?.phone}</div>
                  <div className="text-sm text-text-secondary">{order?.shippingAddress}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      }
    </>);

}

OrderRow.propTypes = {
  order: PropTypes?.object?.isRequired,
  onStatusChange: PropTypes?.func?.isRequired,
  onToggleExpand: PropTypes?.func?.isRequired,
  isExpanded: PropTypes?.bool?.isRequired
};

// Product Card Component with Enhanced Visual Editing
function ProductCard({ product, onEdit, onDelete, onImageClick }) {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-sharp-lg transition-all duration-250">
      <div className="aspect-square bg-muted relative group cursor-pointer" onClick={() => onImageClick(product)}>
        <AppImage
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Icon name="MagnifyingGlassIcon" size={32} className="text-white" />
        </div>
        <div className="absolute top-2 right-2 z-10">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${statusColors?.[product?.status]}`}>
            {product?.status}
          </span>
        </div>
        {product?.stock <= 10 && product?.stock > 0 &&
          <div className="absolute top-2 left-2 z-10 bg-yellow-500/90 text-black px-2 py-1 rounded text-xs font-semibold">
            Low Stock
          </div>
        }
      </div>
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{product?.name}</h3>
          <p className="text-sm text-text-secondary">{product?.category}</p>
          <p className="text-xs text-text-secondary mt-1">ID: {product?.id}</p>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-data text-xl font-bold text-primary">₹{product?.price?.toLocaleString('en-IN')}</span>
            <span className={`text-sm font-semibold ${product?.stock > 10 ? 'text-green-400' : product?.stock > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
              Stock: {product?.stock}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span className="flex items-center gap-1">
              <Icon name="ShoppingBagIcon" size={14} />
              {product?.sales} sales
            </span>
            <span className="flex items-center gap-1">
              <Icon name="EyeIcon" size={14} />
              {product?.views} views
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 px-3 py-2 bg-primary/20 text-primary rounded-md text-sm font-semibold hover:bg-primary/30 transition-colors flex items-center justify-center gap-2"
            aria-label="Edit product">
            <Icon name="PencilIcon" size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(product?.id)}
            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-md text-sm font-semibold hover:bg-red-500/30 transition-colors"
            aria-label="Delete product">
            <Icon name="TrashIcon" size={16} />
          </button>
        </div>
      </div>
    </div>);

}

ProductCard.propTypes = {
  product: PropTypes?.object?.isRequired,
  onEdit: PropTypes?.func?.isRequired,
  onDelete: PropTypes?.func?.isRequired,
  onImageClick: PropTypes?.func?.isRequired
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  // Orders state
  const [orders, setOrders] = useState(mockOrders);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('All');
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  // Products state
  const [products, setProducts] = useState(mockProducts);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterProductStatus, setFilterProductStatus] = useState('All');
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Men',
    price: 0,
    stock: 0,
    status: 'Draft',
    description: '',
    image: ''
  });

  // Promo codes state
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoLoading, setPromoLoading] = useState(true);
  const [promoError, setPromoError] = useState(null);
  const [showCreatePromoModal, setShowCreatePromoModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState({
    code: '',
    discount_percentage: 10,
    max_uses: 100,
    valid_from: new Date()?.toISOString()?.slice(0, 16),
    valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)?.toISOString()?.slice(0, 16)
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin && activeTab === 'promos') {
      fetchPromoCodes();
    }
  }, [isAdmin, activeTab]);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();

      if (!user) {
        setPromoError('Please log in to access this page');
        setPromoLoading(false);
        return;
      }

      const isUserAdmin = user?.user_metadata?.role === 'admin' ||
        user?.app_metadata?.role === 'admin';

      setIsAdmin(isUserAdmin);

      if (!isUserAdmin) {
        setPromoError('Access denied. Admin privileges required.');
      }

      setPromoLoading(false);
    } catch (err) {
      setPromoError(err?.message || 'Failed to verify admin status');
      setPromoLoading(false);
    }
  };

  const fetchPromoCodes = async () => {
    try {
      setPromoLoading(true);
      const { data, error: fetchError } = await supabase?.
        from('promo_codes')?.
        select('*')?.
        order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPromoCodes(data || []);
      setPromoError(null);
    } catch (err) {
      setPromoError(err?.message || 'Failed to fetch promo codes');
    } finally {
      setPromoLoading(false);
    }
  };

  const createPromoCode = async (e) => {
    e?.preventDefault();
    try {
      setPromoLoading(true);

      const { data: { user } } = await supabase?.auth?.getUser();

      const { data, error: createError } = await supabase?.
        from('promo_codes')?.
        insert([{
          ...newPromoCode,
          created_by: user?.id,
          status: 'active'
        }])?.
        select()?.
        single();

      if (createError) throw createError;

      setPromoCodes([data, ...promoCodes]);
      setShowCreatePromoModal(false);
      setNewPromoCode({
        code: '',
        discount_percentage: 10,
        max_uses: 100,
        valid_from: new Date()?.toISOString()?.slice(0, 16),
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)?.toISOString()?.slice(0, 16)
      });
      setPromoError(null);
    } catch (err) {
      setPromoError(err?.message || 'Failed to create promo code');
    } finally {
      setPromoLoading(false);
    }
  };

  const updatePromoCodeStatus = async (id, newStatus) => {
    try {
      const { error: updateError } = await supabase?.
        from('promo_codes')?.
        update({ status: newStatus })?.
        eq('id', id);

      if (updateError) throw updateError;

      setPromoCodes(promoCodes?.map((code) =>
        code?.id === id ? { ...code, status: newStatus } : code
      ));
      setPromoError(null);
    } catch (err) {
      setPromoError(err?.message || 'Failed to update promo code status');
    }
  };

  const deletePromoCode = async (id) => {
    if (!confirm('Are you sure you want to delete this promo code?')) return;

    try {
      const { error: deleteError } = await supabase?.
        from('promo_codes')?.
        delete()?.
        eq('id', id);

      if (deleteError) throw deleteError;

      setPromoCodes(promoCodes?.filter((code) => code?.id !== id));
      setPromoError(null);
    } catch (err) {
      setPromoError(err?.message || 'Failed to delete promo code');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'expired':
        return 'text-red-400';
      case 'disabled':
        return 'text-yellow-400';
      default:
        return 'text-text-secondary';
    }
  };

  const getUsagePercentage = (currentUses, maxUses) => {
    return currentUses / maxUses * 100;
  };

  // Order handlers
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders?.map((order) =>
      order?.id === orderId ? { ...order, orderStatus: newStatus } : order
    ));
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet?.has(orderId)) {
        newSet?.delete(orderId);
      } else {
        newSet?.add(orderId);
      }
      return newSet;
    });
  };

  // Product handlers
  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowImageModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = () => {
    if (selectedProduct) {
      setProducts(products?.map((p) =>
        p?.id === selectedProduct?.id ? selectedProduct : p
      ));
      setShowEditModal(false);
      setSelectedProduct(null);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products?.filter((product) => product?.id !== productId));
    }
  };

  const handleAddProduct = (e) => {
    e?.preventDefault();
    const product = {
      ...newProduct,
      id: `PROD-${String(products?.length + 1)?.padStart(3, '0')}`,
      sales: 0,
      views: 0
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', category: 'Men', price: 0, stock: 0, status: 'Draft', description: '', image: '' });
    setShowAddProductForm(false);
  };

  // Filtering
  const filteredOrders = orders?.filter((order) => {
    const matchesSearch = order?.id?.toLowerCase()?.includes(orderSearchQuery?.toLowerCase()) ||
      order?.customer?.name?.toLowerCase()?.includes(orderSearchQuery?.toLowerCase()) ||
      order?.customer?.email?.toLowerCase()?.includes(orderSearchQuery?.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order?.orderStatus === filterStatus;
    const matchesPayment = filterPaymentMethod === 'All' || order?.paymentMethod === filterPaymentMethod;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product?.name?.toLowerCase()?.includes(productSearchQuery?.toLowerCase()) ||
      product?.id?.toLowerCase()?.includes(productSearchQuery?.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product?.category === filterCategory;
    const matchesStatus = filterProductStatus === 'All' || product?.status === filterProductStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Analytics calculations
  const totalRevenue = orders?.reduce((sum, order) =>
    order?.paymentStatus === 'Paid' ? sum + order?.totalAmount : sum, 0
  );

  const paymentMethodStats = orders?.reduce((acc, order) => {
    const method = order?.paymentMethod;
    if (method) {
      acc[method] = (acc?.[method] || 0) + 1;
    }
    return acc;
  }, {});

  const revenueByDate = orders?.reduce((acc, order) => {
    if (order?.paymentStatus === 'Paid') {
      const existing = acc?.find((item) => item?.date === order?.orderDate);
      if (existing) {
        existing.revenue += order?.totalAmount;
      } else {
        acc?.push({ date: order?.orderDate, revenue: order?.totalAmount });
      }
    }
    return acc;
  }, [])?.sort((a, b) => new Date(a?.date) - new Date(b?.date));

  const statusDistribution = Object.entries(
    orders?.reduce((acc, order) => {
      acc[order?.orderStatus] = (acc?.[order?.orderStatus] || 0) + 1;
      return acc;
    }, {})
  )?.map(([name, value]) => ({ name, value }));

  const paymentMethodChartData = Object.entries(paymentMethodStats || {})?.map(([method, count]) => ({
    method,
    count,
    revenue: orders?.filter((o) => o?.paymentMethod === method && o?.paymentStatus === 'Paid')?.
      reduce((sum, o) => sum + o?.totalAmount, 0)
  }));

  const topCustomers = Object.values(
    orders?.reduce((acc, order) => {
      const email = order?.customer?.email;
      if (!acc?.[email]) {
        acc[email] = {
          name: order?.customer?.name,
          email: email,
          orders: 0,
          totalSpent: 0
        };
      }
      acc[email].orders += 1;
      if (order?.paymentStatus === 'Paid') {
        acc[email].totalSpent += order?.totalAmount;
      }
      return acc;
    }, {})
  )?.sort((a, b) => b?.totalSpent - a?.totalSpent)?.slice(0, 5);

  const totalProducts = products?.length;
  const activeProducts = products?.filter((p) => p?.status === 'Active')?.length;
  const outOfStock = products?.filter((p) => p?.status === 'Out of Stock')?.length;
  const lowStock = products?.filter((p) => p?.stock > 0 && p?.stock <= 10)?.length;

  const categoryPerformance = Object.entries(
    products?.reduce((acc, product) => {
      if (!acc?.[product?.category]) {
        acc[product.category] = { sales: 0, views: 0, revenue: 0 };
      }
      acc[product?.category].sales += product?.sales;
      acc[product?.category].views += product?.views;
      acc[product?.category].revenue += product?.price * product?.sales;
      return acc;
    }, {})
  )?.map(([category, stats]) => ({ category, ...stats }));

  const topProducts = [...products]?.
    sort((a, b) => b?.sales * b?.price - a?.sales * a?.price)?.
    slice(0, 5);

  const tabs = [
    { id: 'orders', label: 'Order Management', icon: 'ClipboardDocumentListIcon' },
    { id: 'products', label: 'Product Inventory', icon: 'CubeIcon' },
    { id: 'promos', label: 'Promo Codes', icon: 'TicketIcon' }];


  return (
    <div className="min-h-screen bg-background pt-[80px]">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
            <Icon name="Cog6ToothIcon" size={32} />
            Admin Dashboard
          </h1>
          <p className="text-text-secondary mt-2">Comprehensive admin control center for orders, inventory, and promotions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${activeTab === tab?.id ?
                    'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-foreground'}`
                }>
                <Icon name={tab?.icon} size={20} />
                {tab?.label}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Orders Tab */}
        {activeTab === 'orders' &&
          <>
            {/* Revenue Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Total Revenue</p>
                    <p className="font-data text-2xl font-bold text-primary mt-1">₹{totalRevenue?.toLocaleString('en-IN')}</p>
                  </div>
                  <Icon name="CurrencyRupeeIcon" size={32} className="text-primary" />
                </div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Total Orders</p>
                    <p className="font-data text-2xl font-bold text-foreground mt-1">{orders?.length}</p>
                  </div>
                  <Icon name="ShoppingBagIcon" size={32} className="text-blue-400" />
                </div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Pending Orders</p>
                    <p className="font-data text-2xl font-bold text-yellow-400 mt-1">
                      {orders?.filter((o) => o?.orderStatus === 'Pending')?.length}
                    </p>
                  </div>
                  <Icon name="ClockIcon" size={32} className="text-yellow-400" />
                </div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Delivered</p>
                    <p className="font-data text-2xl font-bold text-green-400 mt-1">
                      {orders?.filter((o) => o?.orderStatus === 'Delivered')?.length}
                    </p>
                  </div>
                  <Icon name="CheckCircleIcon" size={32} className="text-green-400" />
                </div>
              </div>
            </div>

            {/* Revenue Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="ChartBarIcon" size={20} />
                  Revenue Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueByDate}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                      formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Revenue']} />

                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name="Daily Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="ChartPieIcon" size={20} />
                  Order Status Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value">

                      {statusDistribution?.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                      )}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Method Performance */}
            <div className="bg-surface border border-border rounded-lg p-6 mb-8">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="CreditCardIcon" size={20} />
                Payment Method Performance
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={paymentMethodChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="method" stroke="#888" />
                  <YAxis yAxisId="left" orientation="left" stroke="#888" />
                  <YAxis yAxisId="right" orientation="right" stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    formatter={(value, name) => {
                      if (name === 'Revenue') return [`₹${value?.toLocaleString('en-IN')}`, name];
                      return [value, name];
                    }} />

                  <Legend />
                  <Bar yAxisId="left" dataKey="count" fill="#8b5cf6" name="Order Count" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#06b6d4" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Customers */}
            <div className="bg-surface border border-border rounded-lg p-6 mb-8">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="UserGroupIcon" size={20} />
                Top Customers
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Rank</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Total Orders</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers?.map((customer, index) =>
                      <tr key={customer?.email} className="border-b border-border hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm font-semibold text-foreground">{customer?.name}</div>
                          <div className="text-xs text-text-secondary">{customer?.email}</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{customer?.orders}</td>
                        <td className="px-4 py-3">
                          <span className="font-data text-sm font-bold text-primary">
                            ₹{customer?.totalSpent?.toLocaleString('en-IN')}
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-surface border border-border rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Search Orders</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e?.target?.value)}
                      placeholder="Order ID, Customer name, Email..."
                      className="w-full h-10 pl-10 pr-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all" />

                    <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Order Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e?.target?.value)}
                    className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Payment Method</label>
                  <select
                    value={filterPaymentMethod}
                    onChange={(e) => setFilterPaymentMethod(e?.target?.value)}
                    className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option value="All">All Methods</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="COD">COD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"></th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Payment</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders?.map((order) =>
                      <OrderRow
                        key={order?.id}
                        order={order}
                        onStatusChange={handleStatusChange}
                        onToggleExpand={toggleExpand}
                        isExpanded={expandedOrders?.has(order?.id)} />

                    )}
                  </tbody>
                </table>
              </div>
              {filteredOrders?.length === 0 &&
                <div className="text-center py-12">
                  <Icon name="InboxIcon" size={48} className="mx-auto text-text-secondary mb-4" />
                  <p className="text-text-secondary">No orders found matching your filters</p>
                </div>
              }
            </div>
          </>
        }

        {/* Products Tab */}
        {activeTab === 'products' &&
          <>
            {/* Product Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Total Products</p>
                    <p className="font-data text-2xl font-bold text-foreground mt-1">{totalProducts}</p>
                  </div>
                  <Icon name="CubeIcon" size={32} className="text-primary" />
                </div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Active Products</p>
                    <p className="font-data text-2xl font-bold text-green-400 mt-1">{activeProducts}</p>
                  </div>
                  <Icon name="CheckCircleIcon" size={32} className="text-green-400" />
                </div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Low Stock</p>
                    <p className="font-data text-2xl font-bold text-yellow-400 mt-1">{lowStock}</p>
                  </div>
                  <Icon name="ExclamationTriangleIcon" size={32} className="text-yellow-400" />
                </div>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm">Out of Stock</p>
                    <p className="font-data text-2xl font-bold text-red-400 mt-1">{outOfStock}</p>
                  </div>
                  <Icon name="XCircleIcon" size={32} className="text-red-400" />
                </div>
              </div>
            </div>

            {/* Product Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="ChartBarIcon" size={20} />
                  Category Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="category" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                      formatter={(value, name) => {
                        if (name === 'Revenue') return [`₹${value?.toLocaleString('en-IN')}`, name];
                        return [value, name];
                      }} />

                    <Legend />
                    <Bar dataKey="sales" fill="#8b5cf6" name="Sales" />
                    <Bar dataKey="views" fill="#06b6d4" name="Views" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="CurrencyRupeeIcon" size={20} />
                  Revenue by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="category" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                      formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Revenue']} />

                    <Legend />
                    <Bar dataKey="revenue" fill="#f59e0b" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-surface border border-border rounded-lg p-6 mb-8">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Icon name="TrophyIcon" size={20} />
                Top Performing Products
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Rank</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Product</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Sales</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Views</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts?.map((product, index) => {
                      const revenue = product?.sales * product?.price;
                      return (
                        <tr key={product?.id} className="border-b border-border hover:bg-muted/30">
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm font-semibold text-foreground">{product?.name}</div>
                            <div className="text-xs text-text-secondary">{product?.id}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-text-secondary">{product?.category}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{product?.sales}</td>
                          <td className="px-4 py-3 text-sm text-text-secondary">{product?.views}</td>
                          <td className="px-4 py-3">
                            <span className="font-data text-sm font-bold text-primary">
                              ₹{revenue?.toLocaleString('en-IN')}
                            </span>
                          </td>
                        </tr>);

                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Filters and Add Button */}
            <div className="bg-surface border border-border rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-lg font-semibold text-foreground">Product Inventory</h3>
                <button
                  onClick={() => setShowAddProductForm(!showAddProductForm)}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-all flex items-center gap-2">
                  <Icon name="PlusIcon" size={20} />
                  Add Product
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Search Products</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e?.target?.value)}
                      placeholder="Product name or ID..."
                      className="w-full h-10 pl-10 pr-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all" />

                    <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e?.target?.value)}
                    className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option value="All">All Categories</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Compression">Compression</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                  <select
                    value={filterProductStatus}
                    onChange={(e) => setFilterProductStatus(e?.target?.value)}
                    className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Add Product Form */}
            {showAddProductForm &&
              <div className="bg-surface border border-border rounded-lg p-6 mb-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                    <input
                      type="text"
                      value={newProduct?.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e?.target?.value })}
                      required
                      className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter product name" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={newProduct?.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e?.target?.value })}
                      className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Compression">Compression</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={newProduct?.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e?.target?.value) })}
                      required
                      min="0"
                      className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      value={newProduct?.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e?.target?.value) })}
                      required
                      min="0"
                      className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0" />

                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                    <select
                      value={newProduct?.status}
                      onChange={(e) => setNewProduct({ ...newProduct, status: e?.target?.value })}
                      className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                    <input
                      type="url"
                      value={newProduct?.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e?.target?.value })}
                      className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="https://example.com/image.jpg" />

                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      value={newProduct?.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e?.target?.value })}
                      className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Product description" />

                  </div>
                  <div className="flex items-end gap-2 md:col-span-2">
                    <button
                      type="submit"
                      className="flex-1 h-10 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors">
                      Save Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddProductForm(false)}
                      className="flex-1 h-10 bg-muted text-foreground rounded-md font-semibold hover:bg-muted/80 transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            }

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map((product) =>
                <ProductCard
                  key={product?.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onImageClick={handleImageClick} />

              )}
            </div>

            {filteredProducts?.length === 0 &&
              <div className="text-center py-12 bg-surface border border-border rounded-lg">
                <Icon name="InboxIcon" size={48} className="mx-auto text-text-secondary mb-4" />
                <p className="text-text-secondary">No products found matching your filters</p>
              </div>
            }
          </>
        }

        {/* Promo Codes Tab */}
        {activeTab === 'promos' &&
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Promo Code Management</h2>
                <p className="text-text-secondary">Create and manage promotional discount codes</p>
              </div>
              <button
                onClick={() => setShowCreatePromoModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold">
                <Icon name="PlusIcon" size={20} />
                Create Promo Code
              </button>
            </div>

            {promoError &&
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded mb-6">
                {promoError}
              </div>
            }

            <div className="grid gap-4">
              {promoCodes?.map((code) =>
                <div key={code?.id} className="bg-surface border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-xl font-bold text-foreground">{code?.code}</h3>
                        <span className={`text-sm font-semibold ${getStatusColor(code?.status)}`}>
                          {code?.status?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-3">
                        {code?.discount_percentage}% discount
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-text-secondary">Valid From</p>
                          <p className="text-foreground font-data">
                            {new Date(code?.valid_from)?.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Valid Until</p>
                          <p className="text-foreground font-data">
                            {new Date(code?.valid_until)?.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Usage</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-primary h-full transition-all duration-300"
                                style={{ width: `${getUsagePercentage(code?.current_uses, code?.max_uses)}%` }} />

                            </div>
                            <span className="text-foreground font-data whitespace-nowrap">
                              {code?.current_uses} / {code?.max_uses}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {code?.status === 'active' &&
                        <button
                          onClick={() => updatePromoCodeStatus(code?.id, 'disabled')}
                          className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors"
                          title="Disable">
                          <Icon name="PauseIcon" size={20} />
                        </button>
                      }
                      {code?.status === 'disabled' &&
                        <button
                          onClick={() => updatePromoCodeStatus(code?.id, 'active')}
                          className="p-2 text-green-400 hover:bg-green-400/10 rounded transition-colors"
                          title="Enable">
                          <Icon name="PlayIcon" size={20} />
                        </button>
                      }
                      <button
                        onClick={() => deletePromoCode(code?.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                        title="Delete">
                        <Icon name="TrashIcon" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {promoCodes?.length === 0 && !promoLoading &&
              <div className="text-center py-12 bg-surface border border-border rounded-lg">
                <Icon name="TicketIcon" size={64} className="text-text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">No Promo Codes Yet</h3>
                <p className="text-text-secondary mb-4">Create your first promo code to get started</p>
                <button
                  onClick={() => setShowCreatePromoModal(true)}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold">
                  Create Promo Code
                </button>
              </div>
            }
          </>
        }
      </div>

      {/* Image Preview Modal */}
      {showImageModal && selectedProduct &&
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowImageModal(false)}>
          <div className="bg-surface border border-border rounded-lg max-w-4xl w-full p-6" onClick={(e) => e?.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">{selectedProduct?.name}</h2>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
              <AppImage
                src={selectedProduct?.image}
                alt={selectedProduct?.name}
                className="w-full h-full object-contain" />

            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Product ID</p>
                <p className="text-foreground font-data">{selectedProduct?.id}</p>
              </div>
              <div>
                <p className="text-text-secondary">Category</p>
                <p className="text-foreground">{selectedProduct?.category}</p>
              </div>
              <div>
                <p className="text-text-secondary">Price</p>
                <p className="text-primary font-data text-xl font-bold">₹{selectedProduct?.price?.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-text-secondary">Stock</p>
                <p className="text-foreground font-data">{selectedProduct?.stock} units</p>
              </div>
            </div>
            {selectedProduct?.description &&
              <div className="mt-4">
                <p className="text-text-secondary text-sm mb-1">Description</p>
                <p className="text-foreground">{selectedProduct?.description}</p>
              </div>
            }
          </div>
        </div>
      }

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct &&
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">Edit Product</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedProduct(null);
                }}
                className="p-1 hover:bg-muted rounded transition-colors">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e?.preventDefault();
              handleUpdateProduct();
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                <input
                  type="text"
                  value={selectedProduct?.name}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e?.target?.value })}
                  className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required />

              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    value={selectedProduct?.category}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e?.target?.value })}
                    className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Compression">Compression</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                  <select
                    value={selectedProduct?.status}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, status: e?.target?.value })}
                    className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={selectedProduct?.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e?.target?.value) })}
                    className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                    required />

                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Stock</label>
                  <input
                    type="number"
                    value={selectedProduct?.stock}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: Number(e?.target?.value) })}
                    className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    min="0"
                    required />

                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="url"
                  value={selectedProduct?.image}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e?.target?.value })}
                  className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />

              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  value={selectedProduct?.description}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e?.target?.value })}
                  className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3} />

              </div>

              {selectedProduct?.image &&
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Preview</p>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <AppImage
                      src={selectedProduct?.image}
                      alt={selectedProduct?.name}
                      className="w-full h-full object-contain" />

                  </div>
                </div>
              }

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors font-semibold">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      {/* Create Promo Code Modal */}
      {showCreatePromoModal &&
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-bold text-foreground">Create Promo Code</h2>
              <button
                onClick={() => setShowCreatePromoModal(false)}
                className="p-1 hover:bg-muted rounded transition-colors">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>

            <form onSubmit={createPromoCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Code</label>
                <input
                  type="text"
                  value={newPromoCode?.code}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, code: e?.target?.value?.toUpperCase() })}
                  className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="SUMMER2024"
                  required />

              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Discount Percentage (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newPromoCode?.discount_percentage}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, discount_percentage: parseInt(e?.target?.value) })}
                  className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required />

              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Maximum Uses</label>
                <input
                  type="number"
                  min="1"
                  value={newPromoCode?.max_uses}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, max_uses: parseInt(e?.target?.value) })}
                  className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required />

              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Valid From</label>
                <input
                  type="datetime-local"
                  value={newPromoCode?.valid_from}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, valid_from: e?.target?.value })}
                  className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required />

              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Valid Until</label>
                <input
                  type="datetime-local"
                  value={newPromoCode?.valid_until}
                  onChange={(e) => setNewPromoCode({ ...newPromoCode, valid_until: e?.target?.value })}
                  className="w-full px-4 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required />

              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreatePromoModal(false)}
                  className="flex-1 px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors font-semibold">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={promoLoading}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 font-semibold">
                  {promoLoading ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>);

}