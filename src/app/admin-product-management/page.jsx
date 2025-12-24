'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { productService } from '@/lib/services/productService';

const statusColors = {
  Active: 'bg-green-500/20 text-green-300 border-green-500/30',
  Draft: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  'Out of Stock': 'bg-red-500/20 text-red-300 border-red-500/30'
};

function ProductCard({ product, onEdit, onDelete, onQuickEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrice, setEditPrice] = useState(product?.price);
  const [editStock, setEditStock] = useState(product?.stockQuantity || 0);

  const handleQuickSave = () => {
    onQuickEdit(product?.id, { price: editPrice, stockQuantity: editStock });
    setIsEditing(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-sharp-lg transition-all duration-250">
      <div className="aspect-square bg-muted relative">
        <img
          src={product?.productImages?.[0]?.imageUrl || '/assets/images/no_image.png'}
          alt={product?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 z-10">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${product?.isActive ? statusColors.Active : statusColors.Draft}`}>
            {product?.isActive ? 'Active' : 'Draft'}
          </span>
        </div>
        {product?.stockQuantity <= 10 && product?.stockQuantity > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-yellow-500/90 text-black px-2 py-1 rounded text-xs font-semibold">
            Low Stock
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{product?.name}</h3>
          <p className="text-sm text-text-secondary">{product?.category}</p>
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
              <span className={`text-sm font-semibold ${product?.stockQuantity > 10 ? 'text-green-400' : product?.stockQuantity > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                Stock: {product?.stockQuantity}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <Icon name="ShoppingBagIcon" size={14} />
                {product?.rating || 0} rating
              </span>
              <span className="flex items-center gap-1">
                <Icon name="EyeIcon" size={14} />
                {product?.reviewCount || 0} reviews
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
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onQuickEdit: PropTypes.func.isRequired
};

export default function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Men',
    price: 0,
    stockQuantity: 0,
    isActive: false,
    description: '',
    brand: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickEdit = async (productId, updates) => {
    try {
      await productService.updateProduct(productId, updates);
      await loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleEdit = (productId) => {
    alert(`Full edit form for product ${productId} would open here`);
  };

  const handleDelete = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        await loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleAddProduct = async (e) => {
    e?.preventDefault();
    try {
      await productService.createProduct(newProduct);
      await loadProducts();
      setNewProduct({
        name: '',
        category: 'Men',
        price: 0,
        stockQuantity: 0,
        isActive: false,
        description: '',
        brand: '',
        imageUrl: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      String(product?.id)?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product?.category === filterCategory;
    const matchesStatus = filterStatus === 'All' ||
      (filterStatus === 'Active' && product?.isActive) ||
      (filterStatus === 'Draft' && !product?.isActive) ||
      (filterStatus === 'Out of Stock' && product?.stockQuantity === 0);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products?.length;
  const activeProducts = products?.filter(p => p?.isActive)?.length;
  const outOfStock = products?.filter(p => p?.stockQuantity === 0)?.length;
  const lowStock = products?.filter(p => p?.stockQuantity > 0 && p?.stockQuantity <= 10)?.length;

  // Product performance metrics
  const categoryPerformance = Object.entries(
    products?.reduce((acc, product) => {
      if (!acc?.[product?.category]) {
        acc[product.category] = { sales: 0, views: 0, revenue: 0 };
      }
      // Assuming mock sales/views for now as they are not in DB, or use defaults
      const sales = product?.sales || 0; // Future: fetch from orders
      const views = product?.views || 0; // Future: fetch analytics

      acc[product?.category].sales += sales;
      acc[product?.category].views += views;
      acc[product?.category].revenue += product?.price * sales;
      return acc;
    }, {})
  )?.map(([category, stats]) => ({ category, ...stats }));

  // Top performing products (Mock logic for sales/views for now)
  const topProducts = [...products]
    ?.sort((a, b) => ((b?.sales || 0) * b?.price) - ((a?.sales || 0) * a?.price))
    ?.slice(0, 5);

  // Stock value by category
  const stockValueByCategory = Object.entries(
    products?.reduce((acc, product) => {
      if (!acc?.[product?.category]) {
        acc[product.category] = 0;
      }
      acc[product?.category] += product?.stockQuantity * product?.price;
      return acc;
    }, {})
  )?.map(([category, value]) => ({ category, value }));

  return (
    <div className="min-h-screen bg-background pt-[80px]">
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
                <p className="font-data text-2xl font-bold text-foreground mt-1">{loading ? '...' : totalProducts}</p>
              </div>
              <Icon name="CubeIcon" size={32} className="text-primary" />
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">Active Products</p>
                <p className="font-data text-2xl font-bold text-green-400 mt-1">{loading ? '...' : activeProducts}</p>
              </div>
              <Icon name="CheckCircleIcon" size={32} className="text-green-400" />
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">Low Stock</p>
                <p className="font-data text-2xl font-bold text-yellow-400 mt-1">{loading ? '...' : lowStock}</p>
              </div>
              <Icon name="ExclamationTriangleIcon" size={32} className="text-yellow-400" />
            </div>
          </div>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm">Out of Stock</p>
                <p className="font-data text-2xl font-bold text-red-400 mt-1">{loading ? '...' : outOfStock}</p>
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

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-surface border border-border rounded-lg p-6 mb-8">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea
                  value={newProduct?.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e?.target?.value })}
                  className="w-full p-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                  placeholder="Enter product description"
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
                <label className="block text-sm font-medium text-foreground mb-2">Brand</label>
                <input
                  type="text"
                  value={newProduct?.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e?.target?.value })}
                  className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Brand name"
                />
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
                  value={newProduct?.stockQuantity}
                  onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: Number(e?.target?.value) })}
                  required
                  min="0"
                  className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
                <input
                  type="text"
                  value={newProduct?.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e?.target?.value })}
                  className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  value={newProduct?.isActive}
                  onChange={(e) => setNewProduct({ ...newProduct, isActive: e?.target?.value === 'true' })}
                  className="w-full h-10 px-4 bg-input text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="false">Draft</option>
                  <option value="true">Active</option>
                </select>
              </div>
              <div className="flex items-end gap-2 md:col-span-2">
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
          {loading ? (
            <div className="col-span-3 text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-text-secondary">Loading products...</p>
            </div>
          ) : filteredProducts?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onQuickEdit={handleQuickEdit}
            />
          ))}
        </div>

        {!loading && filteredProducts?.length === 0 && (
          <div className="text-center py-12 bg-surface border border-border rounded-lg">
            <Icon name="InboxIcon" size={48} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-secondary">No products found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}