'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock product data
const mockProducts = [
  {
    id: 'PROD-001',
    name: 'Performance Compression Tee',
    category: 'Men',
    price: 1299,
    stock: 45,
    status: 'Active',
    image: '/assets/images/product-1.jpg',
    sales: 234,
    views: 1250
  },
  {
    id: 'PROD-002',
    name: 'Elite Training Shorts',
    category: 'Men',
    price: 2001,
    stock: 12,
    status: 'Active',
    image: '/assets/images/product-2.jpg',
    sales: 189,
    views: 980
  },
  {
    id: 'PROD-003',
    name: 'Premium Yoga Mat',
    category: 'Women',
    price: 2499,
    stock: 0,
    status: 'Out of Stock',
    image: '/assets/images/product-3.jpg',
    sales: 456,
    views: 2100
  },
  {
    id: 'PROD-004',
    name: 'Resistance Bands Set',
    category: 'Compression',
    price: 1500,
    stock: 78,
    status: 'Active',
    image: '/assets/images/product-4.jpg',
    sales: 312,
    views: 1450
  },
  {
    id: 'PROD-005',
    name: 'Smart Fitness Watch',
    category: 'Men',
    price: 12999,
    stock: 5,
    status: 'Active',
    image: '/assets/images/product-5.jpg',
    sales: 67,
    views: 890
  },
  {
    id: 'PROD-006',
    name: 'Running Shoes Pro',
    category: 'Women',
    price: 3299,
    stock: 0,
    status: 'Draft',
    image: '/assets/images/product-6.jpg',
    sales: 0,
    views: 120
  }
];

const statusColors = {
  Active: 'bg-green-500/20 text-green-300 border-green-500/30',
  Draft: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  'Out of Stock': 'bg-red-500/20 text-red-300 border-red-500/30'
};

function ProductCard({ product, onEdit, onDelete, onQuickEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(product?.price);
  const [editStock, setEditStock] = useState(product?.stock);

  const handleQuickSave = () => {
    onQuickEdit(product?.id, { price: editPrice, stock: editStock });
    setIsEditing(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-sharp-lg transition-all duration-250">
      <div className="aspect-square bg-muted relative">
        <div className="absolute top-2 right-2 z-10">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${statusColors?.[product?.status]}`}>
            {product?.status}
          </span>
        </div>
        {product?.stock <= 10 && product?.stock > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-yellow-500/90 text-black px-2 py-1 rounded text-xs font-semibold">
            Low Stock
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{product?.name}</h3>
          <p className="text-sm text-text-secondary">{product?.category}</p>
          <p className="text-xs text-text-secondary mt-1">ID: {product?.id}</p>
        </div>

        {isEditing ? (
          <div className="space-y-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Price (₹)</label>
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(Number(e?.target?.value))}
                className="w-full px-3 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Stock</label>
              <input
                type="number"
                value={editStock}
                onChange={(e) => setEditStock(Number(e?.target?.value))}
                className="w-full px-3 py-2 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleQuickSave}
                className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
                aria-label="Save changes">
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 px-3 py-2 bg-muted text-foreground rounded-md text-sm font-semibold hover:bg-muted/80 transition-colors"
                aria-label="Cancel editing">
                Cancel
              </button>
            </div>
          </div>
        ) : (
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
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 px-3 py-2 bg-muted text-foreground rounded-md text-sm font-semibold hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
            aria-label="Quick edit product">
            <Icon name="PencilIcon" size={16} />
            Quick Edit
          </button>
          <button
            onClick={() => onEdit(product?.id)}
            className="px-3 py-2 bg-primary/20 text-primary rounded-md text-sm font-semibold hover:bg-primary/30 transition-colors"
            aria-label="Full edit product">
            <Icon name="Cog6ToothIcon" size={16} />
          </button>
          <button
            onClick={() => onDelete(product?.id)}
            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-md text-sm font-semibold hover:bg-red-500/30 transition-colors"
            aria-label="Delete product">
            <Icon name="TrashIcon" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    name: PropTypes?.string?.isRequired,
    category: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    stock: PropTypes?.number?.isRequired,
    status: PropTypes?.string?.isRequired,
    image: PropTypes?.string?.isRequired,
    sales: PropTypes?.number?.isRequired,
    views: PropTypes?.number?.isRequired
  })?.isRequired,
  onEdit: PropTypes?.func?.isRequired,
  onDelete: PropTypes?.func?.isRequired,
  onQuickEdit: PropTypes?.func?.isRequired
};

export default function AdminProductManagement() {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Men',
    price: 0,
    stock: 0,
    status: 'Draft'
  });

  const handleQuickEdit = (productId, updates) => {
    setProducts(products?.map(product => 
      product?.id === productId ? { ...product, ...updates } : product
    ));
  };

  const handleEdit = (productId) => {
    alert(`Full edit form for product ${productId} would open here`);
  };

  const handleDelete = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products?.filter(product => product?.id !== productId));
    }
  };

  const handleAddProduct = (e) => {
    e?.preventDefault();
    const product = {
      ...newProduct,
      id: `PROD-${String(products?.length + 1)?.padStart(3, '0')}`,
      image: '/assets/images/no_image.png',
      sales: 0,
      views: 0
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', category: 'Men', price: 0, stock: 0, status: 'Draft' });
    setShowAddForm(false);
  };

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         product?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product?.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || product?.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products?.length;
  const activeProducts = products?.filter(p => p?.status === 'Active')?.length;
  const outOfStock = products?.filter(p => p?.status === 'Out of Stock')?.length;
  const lowStock = products?.filter(p => p?.stock > 0 && p?.stock <= 10)?.length;

  // Product performance metrics
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

  // Top performing products
  const topProducts = [...products]
    ?.sort((a, b) => (b?.sales * b?.price) - (a?.sales * a?.price))
    ?.slice(0, 5);

  // Stock value by category
  const stockValueByCategory = Object.entries(
    products?.reduce((acc, product) => {
      if (!acc?.[product?.category]) {
        acc[product.category] = 0;
      }
      acc[product?.category] += product?.stock * product?.price;
      return acc;
    }, {})
  )?.map(([category, value]) => ({ category, value }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-3">
                <Icon name="CubeIcon" size={32} />
                Admin Product Management
              </h1>
              <p className="text-text-secondary mt-2">Manage your product catalog and inventory</p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
              aria-label="Add new product">
              <Icon name="PlusIcon" size={20} />
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
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

        {/* Performance Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Performance */}
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
                  }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#8b5cf6" name="Sales" />
                <Bar dataKey="views" fill="#06b6d4" name="Views" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stock Value Distribution */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Icon name="CurrencyRupeeIcon" size={20} />
              Inventory Value by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockValueByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="category" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                  formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Inventory Value']}
                />
                <Legend />
                <Bar dataKey="value" fill="#10b981" name="Stock Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Products */}
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topProducts?.map((product, index) => {
                  const revenue = product?.sales * product?.price;
                  const conversion = product?.views > 0 ? ((product?.sales / product?.views) * 100)?.toFixed(1) : 0;
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
                      <td className="px-4 py-3">
                        <span className={`text-sm font-semibold ${
                          conversion > 20 ? 'text-green-400' : 
                          conversion > 10 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {conversion}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Revenue Chart */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-8">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="ChartPieIcon" size={20} />
            Revenue by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="category" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Revenue']}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#f59e0b" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
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
                  placeholder="Enter product name"
                />
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
                  placeholder="0"
                />
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
                  placeholder="0"
                />
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
              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="flex-1 h-10 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors"
                  aria-label="Save product">
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 h-10 bg-muted text-foreground rounded-md font-semibold hover:bg-muted/80 transition-colors"
                  aria-label="Cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="bg-surface border border-border rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  placeholder="Product name or ID..."
                  className="w-full h-10 pl-10 pr-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e?.target?.value)}
                className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onQuickEdit={handleQuickEdit}
            />
          ))}
        </div>

        {filteredProducts?.length === 0 && (
          <div className="text-center py-12 bg-surface border border-border rounded-lg">
            <Icon name="InboxIcon" size={48} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-secondary">No products found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}