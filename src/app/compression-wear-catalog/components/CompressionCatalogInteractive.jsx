'use client';
import { useState, useEffect } from 'react';
import { productService } from '@/lib/services/productService';
import FilterSidebar from '../../women-catalog/components/FilterSidebar';
import ProductCard from '../../women-catalog/components/ProductCard';
import MobileFilterSheet from '../../women-catalog/components/MobileFilterSheet';

export default function CompressionCatalogInteractive() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    gender: 'compression',
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 10000 },
    sizes: [],
    colors: [],
    tags: []
  });
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [filters, sortBy, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const filterParams = {
        gender: 'compression',
        search: searchTerm,
        sortBy: sortBy,
        minPrice: filters?.priceRange?.min,
        maxPrice: filters?.priceRange?.max
      };

      if (filters?.categories?.length > 0) {
        filterParams.category = filters?.categories?.[0];
      }
      if (filters?.brands?.length > 0) {
        filterParams.brand = filters?.brands?.[0];
      }
      if (filters?.tags?.length > 0) {
        filterParams.tag = filters?.tags?.[0];
      }

      const data = await productService?.getAll(filterParams);
      setProducts(data);
      setError('');
    } catch (err) {
      setError(err?.message || 'Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (e) => {
    setSortBy(e?.target?.value);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-black pt-[80px]">
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-white text-black px-6 py-3 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Compression Gear</h1>
          <p className="text-gray-300">High-performance compression gear for enhanced support and recovery</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search compression products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              gender="compression"
            />
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <MobileFilterSheet
              filters={filters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowMobileFilters(false)}
              gender="compression"
            />
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-300">
                {loading ? 'Loading...' : `${products?.length || 0} products`}
              </p>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map(product => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No products found matching your criteria</p>
                <button
                  onClick={() => {
                    setFilters({
                      gender: 'compression',
                      categories: [],
                      brands: [],
                      priceRange: { min: 0, max: 10000 },
                      sizes: [],
                      colors: [],
                      tags: []
                    });
                    setSearchTerm('');
                  }}
                  className="mt-4 text-white hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}