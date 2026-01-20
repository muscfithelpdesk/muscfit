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
    tags: [],
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
        maxPrice: filters?.priceRange?.max,
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
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (e) => {
    setSortBy(e?.target?.value);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-background pt-[80px]">
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="bg-foreground text-background px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-black/80 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Page Header with 3D Float Effect */}
        <div className="relative mb-12 text-center lg:text-left overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-gray-100 rounded-full blur-[100px] opacity-70 float-3d"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gray-200 rounded-full blur-[100px] opacity-50 float-3d animation-delay-2000"></div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 tracking-tighter uppercase italic">
              Compression Series
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="h-1 w-20 bg-black hidden md:block"></span>
              <p className="text-sm md:text-base font-bold text-gray-400 tracking-[0.3em] uppercase">
                Advanced performance gear for elite athletes
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar with Glass Effect */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto lg:mx-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="w-full px-6 py-4 pl-14 bg-white border-0 rounded-2xl premium-shadow focus:outline-none focus:ring-2 focus:ring-black transition-all text-sm font-bold tracking-wide"
            />
            <svg
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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
              <p className="text-text-secondary">
                {loading ? 'Loading...' : `${products?.length || 0} products`}
              </p>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 bg-white border border-gray-300 text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 md:gap-6">
                {products?.map((product) => (
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
                      tags: [],
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
