'use client';
import { useState, useEffect } from 'react';
import { productService } from '@/lib/services/productService';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';
import MobileFilterSheet from './MobileFilterSheet';

export default function WomenCatalogInteractive() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    gender: 'women',
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
        gender: 'women',
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
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-black text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Women's Athletic Wear</h1>
          <p className="text-gray-600">Premium fitness apparel designed for peak performance</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search women's products..."
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              gender="women"
            />
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <MobileFilterSheet
              filters={filters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowMobileFilters(false)}
              gender="women"
            />
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${products?.length || 0} products`}
              </p>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
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
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map(product => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                <button
                  onClick={() => {
                    setFilters({
                      gender: 'women',
                      categories: [],
                      brands: [],
                      priceRange: { min: 0, max: 10000 },
                      sizes: [],
                      colors: [],
                      tags: []
                    });
                    setSearchTerm('');
                  }}
                  className="mt-4 text-black hover:underline"
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