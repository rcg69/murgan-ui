import React, { Suspense } from 'react';
import { dressProducts, categories, priceRanges, ratingFilters } from '@/data/products';
import ProductsPageContent from '@/components/ProductsPageContent';

// SEO Metadata for Products Page
export const metadata = {
  title: 'Shop Women\'s Dresses Online | All Products | Murgan Store',
  description: 'Browse our complete collection of women\'s dresses. Filter by category, price, rating, and find the perfect dress for any occasion. Fast shipping on all orders.',
  keywords: 'women dresses, buy dresses online, dress collection, casual dresses, evening dresses',
  openGraph: {
    title: 'Shop Women\'s Dresses | All Products',
    description: 'Browse our complete collection of women\'s dresses with various styles and sizes',
    type: 'website',
    url: 'https://yourshop.com/products',
  },
};

export default function ProductsPage() {
  // SSR: Products are rendered server-side
  const dressProductsData = dressProducts;
  
  return (
    <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
      <ProductsPageContent initialProducts={dressProductsData} />
    </Suspense>
  );
}
