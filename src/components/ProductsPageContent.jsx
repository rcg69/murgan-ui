'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { categories, priceRanges, ratingFilters } from '@/data/products';
import { getProductsFromStorage } from '@/utils/storageHelpers';

export default function ProductsPageContent({ initialProducts }) {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All Products'
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    const storedProducts = getProductsFromStorage(initialProducts);
    setProducts(storedProducts);
    setLoading(false);
  }, [initialProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Products') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Price filter
    if (selectedPriceRange) {
      filtered = filtered.filter(
        (p) => p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
      );
    }

    // Rating filter
    if (selectedRating) {
      filtered = filtered.filter((p) => p.rating >= selectedRating);
    }

    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [products, selectedCategory, selectedPriceRange, selectedRating, searchQuery, sortBy]);

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
          <div className="sticky top-24">
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPriceRange?.label === range.label}
                      onChange={() => setSelectedPriceRange(selectedPriceRange?.label === range.label ? null : range)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Ratings</h3>
              <div className="space-y-2">
                {ratingFilters.map((filter) => (
                  <label key={filter.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRating === filter.value}
                      onChange={() => setSelectedRating(selectedRating === filter.value ? null : filter.value)}
                      className="mr-3"
                    />
                    <span className="text-gray-700">{filter.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCategory('All Products');
                setSelectedPriceRange(null);
                setSelectedRating(null);
                setSearchQuery('');
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-2">Products</h2>
              <p className="text-gray-600 text-sm">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <div className="flex gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded hover:border-gray-400 transition"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Filters
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition"
            />
          </div>

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} loading={loading} />

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-gray-300 mb-4 block"></i>
              <p className="text-gray-600 text-lg">No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
