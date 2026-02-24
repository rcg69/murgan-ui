'use client';

import React, { useMemo } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading = false }) {
  const displayProducts = useMemo(() => {
    if (loading) return [];
    return products || [];
  }, [products, loading]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-96 animate-pulse border border-[#e8e8e8]"></div>
        ))}
      </div>
    );
  }

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg font-light">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
