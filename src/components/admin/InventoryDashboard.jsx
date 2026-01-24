'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { productService } from '@/lib/services/productService';

/**
 * Reusable Inventory Component
 * @param {boolean} isEmbedded - If true, hides major page headers to fit into dashboard tabs.
 */
export default function InventoryDashboard({ isEmbedded = false, initialProducts = [] }) {
    const [loading, setLoading] = useState(initialProducts.length === 0);
    const [products, setProducts] = useState(initialProducts);
    const [isSaving, setIsSaving] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Form Initial State
    const initialProductState = {
        name: '', category: 'Men', gender: 'men', price: 0, originalPrice: 0,
        stockQuantity: 0, isActive: true, description: '', brand: 'MUSCFIT',
        tag: 'NEW', remarks: '', imageUrl: '',
        productVariants: [],
        productAttributes: []
    };

    const [newProduct, setNewProduct] = useState(initialProductState);

    useEffect(() => {
        // Always refresh to ensure advanced data (variants/attributes) is present
        // The basic list from admin dashboard might be lightweight
        loadData();
    }, []);

    const loadData = async () => {
        // Only show spinner if we don't have data yet
        if (products.length === 0) setLoading(true);
        try {
            const data = await productService.getAllForAdmin();
            setProducts(data || []);
        } catch (err) {
            console.error(err);
            setError('Failed to load inventory: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- VARIANT MANAGERS ---
    const addVariant = (isUpdate, currentList, setter) => {
        const newVar = { id: `temp-${Date.now()}`, size: 'M', color: 'Black', stockQuantity: 10 };
        setter({ ...currentList, productVariants: [...(currentList.productVariants || []), newVar] });
    };

    const updateVariant = (isUpdate, currentList, setter, index, field, value) => {
        const updated = [...(currentList.productVariants || [])];
        updated[index] = { ...updated[index], [field]: value };
        setter({ ...currentList, productVariants: updated });
    };

    const removeVariant = (isUpdate, currentList, setter, index) => {
        const updated = [...(currentList.productVariants || [])];
        updated.splice(index, 1);
        setter({ ...currentList, productVariants: updated });
    };

    // --- ATTRIBUTE MANAGERS ---
    const addAttribute = (isUpdate, currentList, setter) => {
        const newAttr = { id: `temp-${Date.now()}`, attributeName: '', attributeValue: '' };
        setter({ ...currentList, productAttributes: [...(currentList.productAttributes || []), newAttr] });
    };

    const updateAttribute = (isUpdate, currentList, setter, index, field, value) => {
        const updated = [...(currentList.productAttributes || [])];
        updated[index] = { ...updated[index], [field]: value };
        setter({ ...currentList, productAttributes: updated });
    };

    const removeAttribute = (isUpdate, currentList, setter, index) => {
        const updated = [...(currentList.productAttributes || [])];
        updated.splice(index, 1);
        setter({ ...currentList, productAttributes: updated });
    };


    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            setIsSaving(true);
            await productService.createProduct(newProduct);
            await loadData();
            setShowAddForm(false);
            setNewProduct(initialProductState);
        } catch (err) {
            setError('Create failed: ' + err.message);
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
            // Basic "Toast" via alert for now as requested by user to know it worked
            // ideally we use a toast component but alert is reliable for "nhi ho rha" debug
        } catch (err) {
            setError('Update failed: ' + err.message);
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
            setError('Delete failed: ' + err.message);
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
                setError('Sync Error: ' + result.error);
            }
        } catch (err) {
            setError('Critical Error: ' + err.message);
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

    // Reusable Form Component (to avoid duplication between Create/Edit)
    const ProductForm = ({ data, setData, onSubmit, title, close }) => (
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {/* LEFT COLUMN: BASIC INFO */}
            <div className="space-y-6">
                <div>
                    <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Basic Info</label>
                    <input required value={data.name} onChange={e => setData({ ...data, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none mb-4" placeholder="Product Name" />
                    <textarea value={data.description} onChange={e => setData({ ...data, description: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none min-h-[100px]" placeholder="Description..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Price (₹)</label>
                        <input type="number" required value={data.price} onChange={e => setData({ ...data, price: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Original (₹)</label>
                        <input type="number" value={data.originalPrice} onChange={e => setData({ ...data, originalPrice: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Category</label>
                        <select value={data.category} onChange={e => setData({ ...data, category: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none">
                            <option value="tshirts">T-Shirts</option>
                            <option value="shorts">Shorts</option>
                            <option value="joggers">Joggers</option>
                            <option value="hoodies">Hoodies</option>
                            <option value="accessories">Accessories</option>
                            <option value="compression_wear">Comp. Wear</option>
                            <option value="winter-arc">Winter Arc</option>
                            <option value="supplements">Supplements</option>
                            <option value="equipment">Equipment</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Gender</label>
                        <select value={data.gender} onChange={e => setData({ ...data, gender: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none">
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="compression">Compression</option>
                            <option value="unisex">Unisex</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Stock & Status</label>
                        <input type="number" required value={data.stockQuantity} onChange={e => setData({ ...data, stockQuantity: Number(e.target.value) })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none mb-2" placeholder="Total Stock" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Tag</label>
                        <select value={data.tag} onChange={e => setData({ ...data, tag: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none">
                            <option value="NEW">NEW</option>
                            <option value="HOT">HOT</option>
                            <option value="BESTSELLER">BESTSELLER</option>
                            <option value="TRENDING">TRENDING</option>
                            <option value="PRO">PRO</option>
                            <option value="SALE">SALE</option>
                            <option value="LIMITED">LIMITED</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={data.isActive} onChange={e => setData({ ...data, isActive: e.target.checked })} className="w-5 h-5 accent-green-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-white">Product is Active & Visible</span>
                    </label>
                </div>

                <div>
                    <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-2">Image URL</label>
                    <input value={data.imageUrl} onChange={e => setData({ ...data, imageUrl: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-bold outline-none" placeholder="https://..." />
                    {data.imageUrl && <img src={data.imageUrl} className="mt-4 w-full h-48 object-cover rounded-xl border border-white/10" />}
                </div>
            </div>

            {/* RIGHT COLUMN: ADVANCED (VARIANTS & ATTRIBUTES) */}
            <div className="space-y-8">

                {/* VARIANTS */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Stock Variants</h4>
                        <button type="button" onClick={() => addVariant(true, data, setData)} className="text-[10px] font-black uppercase tracking-widest text-green-500 hover:text-green-400">+ Add Variant</button>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {(!data.productVariants || data.productVariants.length === 0) && (
                            <p className="text-center text-white/20 text-xs py-4">No variants defined (using master stock).</p>
                        )}
                        {data.productVariants?.map((v, idx) => (
                            <div key={idx} className="grid grid-cols-7 gap-2 items-center bg-black/40 p-3 rounded-lg border border-white/5">
                                <div className="col-span-2">
                                    <input placeholder="Size" value={v.size} onChange={(e) => updateVariant(true, data, setData, idx, 'size', e.target.value)} className="w-full bg-transparent text-white text-xs font-bold uppercase text-center border-b border-white/10 focus:border-white/50 outline-none pb-1" />
                                </div>
                                <div className="col-span-2">
                                    <input placeholder="Color" value={v.color} onChange={(e) => updateVariant(true, data, setData, idx, 'color', e.target.value)} className="w-full bg-transparent text-white text-xs font-bold uppercase text-center border-b border-white/10 focus:border-white/50 outline-none pb-1" />
                                </div>
                                <div className="col-span-2">
                                    <input type="number" placeholder="Qty" value={v.stockQuantity} onChange={(e) => updateVariant(true, data, setData, idx, 'stockQuantity', Number(e.target.value))} className="w-full bg-transparent text-white text-xs font-bold uppercase text-center border-b border-white/10 focus:border-white/50 outline-none pb-1" />
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <button type="button" onClick={() => removeVariant(true, data, setData, idx)} className="text-white/20 hover:text-red-500"><Icon name="XMarkIcon" size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ATTRIBUTES */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Specifications</h4>
                        <button type="button" onClick={() => addAttribute(true, data, setData)} className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400">+ Add Spec</button>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {(!data.productAttributes || data.productAttributes.length === 0) && (
                            <p className="text-center text-white/20 text-xs py-4">No specifications added.</p>
                        )}
                        {data.productAttributes?.map((a, idx) => (
                            <div key={idx} className="grid grid-cols-7 gap-2 items-center bg-black/40 p-3 rounded-lg border border-white/5">
                                <div className="col-span-3">
                                    <input placeholder="Name (e.g. Material)" value={a.attributeName} onChange={(e) => updateAttribute(true, data, setData, idx, 'attributeName', e.target.value)} className="w-full bg-transparent text-white text-xs font-bold uppercase border-b border-white/10 focus:border-white/50 outline-none pb-1" />
                                </div>
                                <div className="col-span-3">
                                    <input placeholder="Value (e.g. Cotton)" value={a.attributeValue} onChange={(e) => updateAttribute(true, data, setData, idx, 'attributeValue', e.target.value)} className="w-full bg-transparent text-white text-xs font-bold uppercase border-b border-white/10 focus:border-white/50 outline-none pb-1" />
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <button type="button" onClick={() => removeAttribute(true, data, setData, idx)} className="text-white/20 hover:text-red-500"><Icon name="XMarkIcon" size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-6">
                    <button type="submit" disabled={isSaving} className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-zinc-200 transition-colors shadow-xl">
                        {isSaving ? 'Processing...' : (title === 'Create' ? 'DEPLOY ASSET' : 'SAVE UPDATES')}
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <div className={`${isEmbedded ? 'w-full' : 'min-h-screen bg-black pt-[80px]'}`}>
            {/* Header */}
            {!isEmbedded && (
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
                                Global Supply Chain • Asset Management
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
            )}

            {/* Embedded Header Stats (if embedded) */}
            {isEmbedded && (
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Live Inventory</h2>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Asset Value</p>
                            <p className="text-lg font-black text-white italic">₹{totalValue.toLocaleString()}</p>
                        </div>
                        <div className="text-right border-l border-white/10 pl-4">
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Low Stock</p>
                            <p className={`text-lg font-black italic ${lowStockCount > 0 ? 'text-red-500' : 'text-green-500'}`}>{lowStockCount}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`${isEmbedded ? 'w-full' : 'max-w-7xl mx-auto px-6 py-12'} text-left`}>

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
                                                <div className="w-12 h-12 rounded-lg border border-white/10 overflow-hidden bg-white/5 relative">
                                                    {p.imageUrl || p.productImages?.[0]?.imageUrl ? (
                                                        <img src={p.imageUrl || p.productImages?.[0]?.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/10"><Icon name="PhotoIcon" size={20} /></div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-sm text-white tracking-tight">{p.name}</div>
                                                <div className="text-[10px] text-white/40 font-medium uppercase tracking-widest mt-1">{p.brand} • {p.gender}</div>
                                                {(p.productVariants?.length > 0) && (
                                                    <div className="flex gap-1 mt-2">
                                                        {p.productVariants.slice(0, 3).map((v, i) => <span key={i} className="text-[8px] bg-white/10 px-1 rounded text-white/60">{v.size}</span>)}
                                                        {p.productVariants.length > 3 && <span className="text-[8px] text-white/40">+{p.productVariants.length - 3}</span>}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-block bg-white/5 border border-white/10 px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                                                    {p.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-data font-bold text-white">₹{p.price.toLocaleString()}</div>
                                                {p.originalPrice > p.price && <div className="text-[10px] text-white/30 line-through">₹{p.originalPrice?.toLocaleString()}</div>}
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
                    <div className="bg-zinc-900 border border-white/10 w-full max-w-6xl p-8 rounded-3xl animate-scale-in relative max-h-full overflow-y-auto custom-scrollbar">
                        <button onClick={() => setShowAddForm(false)} className="absolute top-8 right-8 text-white/40 hover:text-white"><Icon name="XMarkIcon" size={24} /></button>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8">Deploy New Asset</h2>
                        <ProductForm data={newProduct} setData={setNewProduct} onSubmit={handleCreate} title="Create" close={() => setShowAddForm(false)} />
                    </div>
                </div>
            )}

            {/* ERROR MONITOR */}
            {error && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-6">
                    <div className="bg-red-500/10 border border-red-500/50 w-full max-w-lg p-8 rounded-2xl relative shadow-[0_0_100px_rgba(239,68,68,0.2)]">
                        <div className="flex items-start gap-4">
                            <Icon name="ExclamationTriangleIcon" size={48} className="text-red-500 shrink-0" />
                            <div>
                                <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Operation Failed</h3>
                                <p className="text-red-200 text-sm font-medium leading-relaxed mb-6">
                                    {error.replace('row-level security', 'PERMISSION DENIED: You do not have admin write access.')}
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setError(null)}
                                        className="bg-white text-black px-6 py-3 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-zinc-200"
                                    >
                                        Dismiss
                                    </button>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="bg-red-500 text-white px-6 py-3 rounded-lg font-black uppercase text-xs tracking-widest hover:bg-red-600"
                                    >
                                        Reload System
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                    <div className="bg-zinc-900 border border-white/10 w-full max-w-6xl p-8 rounded-3xl animate-scale-in relative max-h-full overflow-y-auto custom-scrollbar">
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 text-white/40 hover:text-white"><Icon name="XMarkIcon" size={24} /></button>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-8">Modify Asset</h2>
                        <ProductForm data={selectedProduct} setData={setSelectedProduct} onSubmit={handleUpdate} title="Update" close={() => setSelectedProduct(null)} />
                    </div>
                </div>
            )}
        </div>
    );
}
