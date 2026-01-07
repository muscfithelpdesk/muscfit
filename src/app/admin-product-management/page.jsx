'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import { productService } from '@/lib/services/productService';
import Icon from '@/components/ui/AppIcon';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminProductManagementPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Guard: Simple check for generic 'admin' role or just allow standard user for now if no role system
    // NOTE: For production, implement strict RLS and role checks.

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        imageUrl: '', // Simple URL input for now
        category: 'T-Shirts',
        gender: 'men',
        tag: '',
        stockQuantity: 100,
        isActive: true
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAll({ sortBy: 'newest' });
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch products. Is the database set up?');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            originalPrice: '',
            imageUrl: '',
            category: 'T-Shirts',
            gender: 'men',
            tag: '',
            stockQuantity: 100,
            isActive: true
        });
        setIsEditing(false);
        setCurrentProduct(null);
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price,
            originalPrice: product.originalPrice || '',
            imageUrl: product.image || '',
            category: product.category || 'T-Shirts',
            gender: product.gender || 'men',
            tag: product.tag || '',
            stockQuantity: product.stockQuantity || 0,
            isActive: product.isActive
        });
        // Scroll to top to see form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await productService.deleteProduct(id);
            fetchProducts();
        } catch (err) {
            alert('Failed to delete product: ' + err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && currentProduct) {
                await productService.updateProduct(currentProduct.id, {
                    ...formData,
                    price: parseFloat(formData.price),
                    originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
                    stockQuantity: parseInt(formData.stockQuantity)
                });
                alert('Product updated successfully!');
            } else {
                await productService.createProduct({
                    ...formData,
                    price: parseFloat(formData.price),
                    originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
                    stockQuantity: parseInt(formData.stockQuantity)
                });
                alert('Product created successfully!');
            }
            resetForm();
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert('Error saving product: ' + err.message);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header isFixed={true} />
            <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold uppercase">Admin: Product Management</h1>
                    <button
                        onClick={fetchProducts}
                        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                        title="Refresh List"
                    >
                        <Icon name="ArrowPathIcon" size={20} />
                    </button>
                </div>

                {/* Product Form */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-12">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">
                        {isEditing ? `Edit Product: ${currentProduct?.name}` : 'Add New Product'}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Original Price (₹)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={formData.originalPrice}
                                        onChange={e => setFormData({ ...formData, originalPrice: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">Image URL</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">Provide a direct link to an image.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">Description</label>
                                <textarea
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Category</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="T-Shirts">T-Shirts</option>
                                        <option value="Joggers">Joggers</option>
                                        <option value="Hoodies">Hoodies</option>
                                        <option value="Leggings">Leggings</option>
                                        <option value="Shorts">Shorts</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Gender</label>
                                    <select
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={formData.gender}
                                        onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                        <option value="men">Men</option>
                                        <option value="women">Women</option>
                                        <option value="unisex">Unisex</option>
                                        <option value="compression">Compression</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">Tag (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. BESTSELLER, NEW, SALE"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={formData.tag}
                                    onChange={e => setFormData({ ...formData, tag: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Stock</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border border-gray-300 rounded"
                                        value={formData.stockQuantity}
                                        onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <label className="flex items-center gap-2 cursor-pointer pb-2">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5"
                                            checked={formData.isActive}
                                            onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <span className="font-bold">Is Active?</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-black text-white font-bold py-3 rounded hover:bg-zinc-800 transition"
                                >
                                    {isEditing ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
                                </button>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-6 py-3 border border-gray-300 font-bold rounded hover:bg-gray-100 transition"
                                    >
                                        CANCEL
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Product List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">Existing Products</h2>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : products.length === 0 ? (
                        <p className="text-gray-500 italic">No products found. Add one above!</p>
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="p-4 font-bold text-xs uppercase text-gray-500">Image</th>
                                        <th className="p-4 font-bold text-xs uppercase text-gray-500">Name</th>
                                        <th className="p-4 font-bold text-xs uppercase text-gray-500">Price</th>
                                        <th className="p-4 font-bold text-xs uppercase text-gray-500">Category</th>
                                        <th className="p-4 font-bold text-xs uppercase text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold">{product.name}</td>
                                            <td className="p-4">₹{product.price}</td>
                                            <td className="p-4">
                                                <span className="px-2 py-1 bg-gray-100 text-xs rounded-full font-medium">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Edit"
                                                    >
                                                        <Icon name="PencilSquareIcon" size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                        title="Delete"
                                                    >
                                                        <Icon name="TrashIcon" size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
