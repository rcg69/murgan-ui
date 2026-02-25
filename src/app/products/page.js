import React from 'react';
import ProductGrid from '@/components/ProductGrid';
import ProductSidebar from '@/components/ProductSidebar';
import Hero from '@/components/Hero';
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
      {/* Hero Section */}
      {/* <Hero /> */}
      <Hero
        videoSrc="/hero.mp4"
        overlayOpacity={0.2}
      />


      {/* Products Title & Description */}
{/*       <div className="container-custom mt-8 mb-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
        <p className="text-gray-600 text-lg">Discover our complete collection of premium women's dresses and fashion items</p>
      </div> */}

      {/* Products Section with Sidebar */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <ProductSidebar />

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600 font-medium">Showing {storedProducts.length} products</p>
              </div>
              <ProductGrid products={storedProducts} loading={loading} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
