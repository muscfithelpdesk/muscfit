'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productService } from '@/lib/services/productService';
import ProductCard from '../../women-catalog/components/ProductCard';

export default function ProductCatalogInteractive() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProducts();
  }, [searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService?.getAll({ search: searchTerm, sortBy: 'newest' });
      setProducts(data);
      setError('');
    } catch (err) {
      setError(err?.message || 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Group products by gender for category display
  const womenProducts = products?.filter(p => p?.gender === 'women')?.slice(0, 6) || [];
  const menProducts = products?.filter(p => p?.gender === 'men')?.slice(0, 6) || [];
  const compressionProducts = products?.filter(p => p?.gender === 'compression')?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Browse our complete collection of premium athletic wear</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search all products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Category Navigation Cards */}
        {!searchTerm && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link href="/women-catalog" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    Women's Collection
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Premium women's athletic wear for peak performance
                  </p>
                  <span className="text-pink-600 font-semibold group-hover:underline">
                    Shop Women's →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/men-catalog" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Men's Collection
                  </h2>
                  <p className="text-gray-600 mb-4">
                    High-performance men's training gear and apparel
                  </p>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    Shop Men's →
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/compression-wear-catalog" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    Compression Wear
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Specialized compression gear for enhanced support
                  </p>
                  <span className="text-orange-600 font-semibold group-hover:underline">
                    Shop Compression →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : searchTerm ? (
          /* Search Results */
          (<div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Search Results ({products?.length || 0})
            </h2>
            {products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products?.map(product => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-black hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>)
        ) : (
          /* Category Sections */
          (<div className="space-y-12">
            {/* Women's Products */}
            {womenProducts?.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Women's Favorites</h2>
                  <Link href="/women-catalog" className="text-pink-600 hover:underline font-semibold">
                    View All Women's →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {womenProducts?.map(product => (
                    <ProductCard key={product?.id} product={product} />
                  ))}
                </div>
              </div>
            )}
            {/* Men's Products */}
            {menProducts?.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Men's Favorites</h2>
                  <Link href="/men-catalog" className="text-blue-600 hover:underline font-semibold">
                    View All Men's →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menProducts?.map(product => (
                    <ProductCard key={product?.id} product={product} />
                  ))}
                </div>
              </div>
            )}
            {/* Compression Products */}
            {compressionProducts?.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Compression Favorites</h2>
                  <Link href="/compression-wear-catalog" className="text-orange-600 hover:underline font-semibold">
                    View All Compression →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {compressionProducts?.map(product => (
                    <ProductCard key={product?.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>)
        )}
      </div>
    </div>
  );
}