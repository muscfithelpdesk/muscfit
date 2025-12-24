'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock order data
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
      { name: 'Elite Training Shorts', quantity: 1, price: 2001 }
    ],
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
      { name: 'Protein Shaker', quantity: 3, price: 1500 }
    ],
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
      { name: 'Running Shoes Pro', quantity: 1, price: 3299 }
    ],
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
      { name: 'Workout Gloves', quantity: 2, price: 1750 }
    ],
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
      { name: 'Smart Fitness Watch', quantity: 1, price: 12999 }
    ],
    shippingAddress: '654 Civil Lines, Jaipur, Rajasthan 302006'
  }
];

const statusColors = {
  Pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Processing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Shipped: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Delivered: 'bg-green-500/20 text-green-300 border-green-500/30',
  Cancelled: 'bg-red-500/20 text-red-300 border-red-500/30'
};

const paymentStatusColors = {
  Paid: 'text-green-400',
  Pending: 'text-yellow-400',
  Failed: 'text-red-400'
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
      {isExpanded && (
        <tr className="bg-surface/50">
          <td colSpan="8" className="px-4 py-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon name="ShoppingBagIcon" size={16} />
                  Order Items
                </h4>
                <div className="space-y-2">
                  {order?.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-background rounded border border-border">
                      <div>
                        <div className="text-sm text-foreground">{item?.name}</div>
                        <div className="text-xs text-text-secondary">Qty: {item?.quantity}</div>
                      </div>
                      <div className="font-data text-sm font-semibold text-primary">₹{item?.price?.toLocaleString('en-IN')}</div>
                    </div>
                  ))}
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
      )}
    </>
  );
}

OrderRow.propTypes = {
  order: PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    customer: PropTypes?.shape({
      name: PropTypes?.string?.isRequired,
      email: PropTypes?.string?.isRequired,
      phone: PropTypes?.string?.isRequired
    })?.isRequired,
    orderDate: PropTypes?.string?.isRequired,
    totalAmount: PropTypes?.number?.isRequired,
    paymentMethod: PropTypes?.string?.isRequired,
    paymentStatus: PropTypes?.string?.isRequired,
    orderStatus: PropTypes?.string?.isRequired,
    items: PropTypes?.arrayOf(PropTypes?.shape({
      name: PropTypes?.string?.isRequired,
      quantity: PropTypes?.number?.isRequired,
      price: PropTypes?.number?.isRequired
    }))?.isRequired,
    shippingAddress: PropTypes?.string?.isRequired
  })?.isRequired,
  onStatusChange: PropTypes?.func?.isRequired,
  onToggleExpand: PropTypes?.func?.isRequired,
  isExpanded: PropTypes?.bool?.isRequired
};

export default function AdminOrderManagement() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState('All');
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders?.map(order =>
      order?.id === orderId ? { ...order, orderStatus: newStatus } : order
    ));
  };

  const toggleExpand = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(orderId)) {
        newSet?.delete(orderId);
      } else {
        newSet?.add(orderId);
      }
      return newSet;
    });
  };

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      order?.customer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      order?.customer?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order?.orderStatus === filterStatus;
    const matchesPayment = filterPaymentMethod === 'All' || order?.paymentMethod === filterPaymentMethod;
    return matchesSearch && matchesStatus && matchesPayment;
  });

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

  // Revenue by date data for chart
  const revenueByDate = orders?.reduce((acc, order) => {
    if (order?.paymentStatus === 'Paid') {
      const existing = acc?.find(item => item?.date === order?.orderDate);
      if (existing) {
        existing.revenue += order?.totalAmount;
      } else {
        acc?.push({ date: order?.orderDate, revenue: order?.totalAmount });
      }
    }
    return acc;
  }, [])?.sort((a, b) => new Date(a?.date) - new Date(b?.date));

  // Order status distribution for pie chart
  const statusDistribution = Object.entries(
    orders?.reduce((acc, order) => {
      acc[order?.orderStatus] = (acc?.[order?.orderStatus] || 0) + 1;
      return acc;
    }, {})
  )?.map(([name, value]) => ({ name, value }));

  // Payment method chart data
  const paymentMethodChartData = Object.entries(paymentMethodStats)?.map(([method, count]) => ({
    method,
    count,
    revenue: orders?.filter(o => o?.paymentMethod === method && o?.paymentStatus === 'Paid')
      ?.reduce((sum, o) => sum + o?.totalAmount, 0)
  }));

  // Customer insights
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

  return (
    <div className="min-h-screen bg-background pt-[80px]">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
            <Icon name="ClipboardDocumentListIcon" size={32} />
            Admin Order Management
          </h1>
          <p className="text-text-secondary mt-2">Track and manage all customer orders with payment details</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  {orders?.filter(o => o?.orderStatus === 'Pending')?.length}
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
                  {orders?.filter(o => o?.orderStatus === 'Delivered')?.length}
                </p>
              </div>
              <Icon name="CheckCircleIcon" size={32} className="text-green-400" />
            </div>
          </div>
        </div>

        {/* Revenue Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
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
                  formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name="Daily Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Order Status Distribution */}
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
                  dataKey="value"
                >
                  {statusDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
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
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#8b5cf6" name="Order Count" />
              <Bar yAxisId="right" dataKey="revenue" fill="#06b6d4" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Insights */}
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
                {topCustomers?.map((customer, index) => (
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
                ))}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  placeholder="Order ID, Customer name, Email..."
                  className="w-full h-10 pl-10 pr-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
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
                {filteredOrders?.map((order) => (
                  <OrderRow
                    key={order?.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                    onToggleExpand={toggleExpand}
                    isExpanded={expandedOrders?.has(order?.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="InboxIcon" size={48} className="mx-auto text-text-secondary mb-4" />
              <p className="text-text-secondary">No orders found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}