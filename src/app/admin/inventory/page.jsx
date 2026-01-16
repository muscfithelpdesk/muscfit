'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { productService } from '@/lib/services/productService';

export default function InventoryPage() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Form State
    const [newProduct, setNewProduct] = useState({
        name: '', category: 'Men', gender: 'men', price: 0, originalPrice: 0,
        stockQuantity: 0, isActive: true, description: '', brand: 'MUSCFIT',
        tag: 'NEW', remarks: '', imageUrl: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await productService.getAllForAdmin();
            setProducts(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await productService.createProduct(newProduct);
            await loadData();
            setShowAddForm(false);
            setNewProduct({
                name: '', category: 'Men', gender: 'men', price: 0, originalPrice: 0,
                stockQuantity: 0, isActive: true, description: '', brand: 'MUSCFIT',
                tag: 'NEW', remarks: '', imageUrl: ''
            }); // Reset
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await productService.updateProduct(selectedProduct.id, selectedProduct);
            await loadData();
            setSelectedProduct(null);
        } catch (err) {
            alert('Update failed: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Permanently delete this product?')) return;
        try {
            await productService.deleteProduct(id);
            await loadData();
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    };

    const handleSync = async () => {
        if (!confirm('Migrate hardcoded catalog to database? Duplicate IDs will be updated.')) return;
        try {
            setIsSaving(true);
            const result = await productService.syncBasicCatalog();
            if (result.success) {
                await loadData();
                alert(`Sync Complete! Processed ${result.count} items.`);
            } else {
                alert('Sync Error: ' + result.error);
            }
        } catch (err) {
            alert('Critical Error: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lowStockCount = products.filter(p => p.stockQuantity < 10).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockQuantity), 0);

    return (
        <div className="min-h-screen bg-black pt-[80px]">
            {/* Header */}
            <div className="bg-zinc-900 border-b border-white/10 px-6 py-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <Link href="/admin" className="text-white/40 hover:text-white transition-colors">
                                <Icon name="ArrowLeftIcon" size={24} />
                            </Link>
                            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Inventory Control</h1>
                        </div>
                        <p className="text-white/40 font-medium tracking-widest uppercase text-xs pl-10">
                            Manage Stock • Values • Catalog
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl min-w-[150px]">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Total Asset Value</p>
                            <p className="text-xl font-black text-white italic">₹{totalValue.toLocaleString()}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl min-w-[150px]">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Low Stock Alert</p>
                            <p className={`text-xl font-black italic ${lowStockCount > 0 ? 'text-red-500' : 'text-green-500'}`}>{lowStockCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Actions Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    <div className="relative w-full md:w-96">
                        <Icon name="MagnifyingGlassIcon" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                        <input
                            type="text"
                            placeholder="SEARCH INVENTORY..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white uppercase text-xs font-bold tracking-widest outline-none focus:border-white/30 transition-all"
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={handleSync}
                            disabled={isSaving}
                            className="bg-zinc-800 text-white/60 hover:text-white hover:bg-zinc-700 px-6 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center gap-2 border border-white/5"
                        >
                            <Icon name="ArrowPathRoundedSquareIcon" size={16} />
                            Sync DB
                        </button>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex-1 md:flex-none bg-white text-black px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                        >
                            <Icon name="PlusIcon" size={18} />
                            Add Product
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin mb-4"></div>
                        <p className="text-white/20 font-black uppercase tracking-[0.3em] text-xs">Loading Assets...</p>
                    </div>
                ) : (
                    <div className="bg-zinc-900/50 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Image</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Product Details</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Category</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Financials</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Stock</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Status</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredProducts.map(p => (
                                        <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="w-12 h-12 rounded-lg border border-white/10 overflow-hidden bg-white/5">
                                                    <img src={p.imageUrl || p.productImages?.[0]?.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-sm text-white tracking-tight">{p.name}</div>
                                                <div className="text-[10px] text-white/40 font-medium uppercase tracking-widest mt-1">{p.brand} • {p.gender}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-block bg-white/5 border border-white/10 px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                                                    {p.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-data font-bold text-white">₹{p.price.toLocaleString()}</div>
                                                <div className="text-[10px] text-white/30 line-through">₹{p.originalPrice?.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`font-bold text-sm ${p.stockQuantity < 10 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {p.stockQuantity} UNITS
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`w-2 h-2 rounded-full inline-block mr-2 ${p.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                <span className="text-[10px] font-bold text-white/60 uppercase">{p.isActive ? 'Active' : 'Hidden'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setSelectedProduct(p)} className="p-2 bg-white/5 hover:bg-white text-white/60 hover:text-black rounded-lg transition-colors">
                                                        <Icon name="PencilSquareIcon" size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-colors">
                                                        <Icon name="TrashIcon" size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* CREATE MODAL */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                    <div className="bg-zinc-900 border border-white/10 w-full max-w-4xl p-8 rounded-3xl animate-scale-in relative">
                        <button onClick={() => setShowAddForm(false)} className="absolute top-8 right-8 text-white/40 hover:text-white"><Icon name="XMarkIcon" size={24} /></button>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8">Deploy New Asset</h2>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Product Identification</label>
                                <input required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-white/30" placeholder="Product Name" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Pricing (₹)</label>
                                <input type="number" required value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Stock Level</label>
                                <input type="number" required value={newProduct.stockQuantity} onChange={e => setNewProduct({ ...newProduct, stockQuantity: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Taxonomy</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none">
                                        <option value="tshirts">T-Shirts</option>
                                        <option value="shorts">Shorts</option>
                                        <option value="joggers">Joggers</option>
                                        <option value="hoodies">Hoodies</option>
                                        {/* Leggings map to Joggers in DB schema */}
                                        <option value="accessories">Accessories</option>
                                        <option value="compression_wear">Comp. Wear</option>
                                    </select>
                                    <select value={newProduct.gender} onChange={e => setNewProduct({ ...newProduct, gender: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none">
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="compression">Compression</option>
                                        <option value="unisex">Unisex</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Tag</label>
                                <select value={newProduct.tag} onChange={e => setNewProduct({ ...newProduct, tag: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none">
                                    <option value="NEW">NEW</option>
                                    <option value="HOT">HOT</option>
                                    <option value="BESTSELLER">BESTSELLER</option>
                                    <option value="TRENDING">TRENDING</option>
                                    <option value="PRO">PRO</option>
                                    <option value="SALE">SALE</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Image Source</label>
                                <input value={newProduct.imageUrl} onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" placeholder="https://" />
                            </div>
                            <div className="md:col-span-2 pt-6">
                                <button type="submit" disabled={isSaving} className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-zinc-200 transition-colors">
                                    {isSaving ? 'Processing...' : 'Confirm Entry'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                    <div className="bg-zinc-900 border border-white/10 w-full max-w-4xl p-8 rounded-3xl animate-scale-in relative">
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-white/40 hover:text-white"><Icon name="XMarkIcon" size={24} /></button>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8">Modify Asset</h2>
                        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Product Name</label>
                                <input required value={selectedProduct.name} onChange={e => setSelectedProduct({ ...selectedProduct, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Price</label>
                                <input type="number" value={selectedProduct.price} onChange={e => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Stock</label>
                                <input type="number" value={selectedProduct.stockQuantity} onChange={e => setSelectedProduct({ ...selectedProduct, stockQuantity: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                            </div>
                            <div className="md:col-span-2 pt-6">
                                <button type="submit" disabled={isSaving} className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-zinc-200 transition-colors">
                                    {isSaving ? 'Updating...' : 'Save Updates'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

