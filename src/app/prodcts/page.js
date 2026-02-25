import React from 'react';
import ProductGrid from '@/components/ProductGrid';
import { dressProducts } from '@/data/products';
import { getProductsFromStorage } from '@/utils/storageHelpers';

// SEO Metadata for Products Page
export const metadata = {
  title: 'Products - Murgan Store | Premium Women\'s Fashion',
  description: 'Browse our complete collection of premium women\'s dresses and fashion items. Find the perfect dress for any occasion with our wide selection.',
  keywords: 'women dresses, fashion, shop dresses, online shopping, women clothing',
  openGraph: {
    title: 'Products - Murgan Store | Premium Women\'s Fashion',
    description: 'Browse our complete collection of premium women\'s dresses and fashion items',
    type: 'website',
    url: 'https://yourshop.com/prodcts',
    image: 'https://yourshop.com/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products - Murgan Store | Premium Women\'s Fashion',
    description: 'Browse our complete collection of premium women\'s dresses',
  },
};

export default function ProductsPage() {
  // SSR: Fetch products server-side
  const storedProducts = getProductsFromStorage(dressProducts);
  const loading = false;

  return (
    <>
      {/* Products Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-300 text-lg">Discover our complete collection of premium women's dresses and fashion items</p>
        </div>
      </section>

      {/* Filters Section (Optional - can be implemented later) */}
      <section className="bg-gray-50 py-6 md:py-8 border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">Showing {storedProducts.length} products</p>
            {/* Add filter options here */}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <ProductGrid products={storedProducts} loading={loading} />
        </div>
      </section>
    </>
  );
}
