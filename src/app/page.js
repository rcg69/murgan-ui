import React from 'react';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CollectionsGrid from '@/components/CollectionsGrid';
import ProductGrid from '@/components/ProductGrid';
import StudioSection from '@/components/StudioSection';
import PerspectivesSection from '@/components/PerspectivesSection';
import { dressProducts } from '@/data/products';
import { getProductsFromStorage } from '@/utils/storageHelpers';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';

// SEO Metadata for Home Page
export const metadata = {
  title: 'Murgan Store - Premium Women\'s Fashion & Dresses',
  description: 'Discover amazing women\'s dresses and apparel. Shop premium quality products with unbeatable prices and fast, free shipping on orders over ₹50.',
  keywords: 'women dresses, fashion, dress store, online shopping',
  openGraph: {
    title: 'Murgan Store - Premium Women\'s Fashion & Dresses',
    description: 'Shop premium quality women\'s dresses with unbeatable prices',
    type: 'website',
    url: 'https://yourshop.com',
    image: 'https://yourshop.com/og-image.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murgan Store - Premium Women\'s Fashion & Dresses',
    description: 'Shop premium quality women\'s dresses with unbeatable prices',
  },
};

export default function Home() {
  // SSR: Fetch products server-side
  const storedProducts = getProductsFromStorage(dressProducts);
  const featuredProducts = storedProducts.slice(0, 6);
  const loading = false;

  return (
    <>
      {/* Hero Carousel */}
      {/* <FeaturedCarousel /> */}
      <Hero />

      {/* Collections Grid */}
      <CollectionsGrid />

      {/* Featured Products Section */}
      {/* <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-2">Featured Products</h2>
            <p className="text-gray-600 text-xs md:text-sm font-light tracking-wide">DISCOVER OUR CAREFULLY CURATED SELECTION</p>
          </div>
          <ProductGrid products={featuredProducts} loading={loading} />
          <div className="text-center mt-10 md:mt-16">
            <a href="/products" className="btn-secondary-pedestal">
              View All Products
            </a>
          </div>
        </div>
      </section> */}
      <FeaturedProducts/>

      {/* Studio/Configuration Section */}
      <StudioSection />

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light">Why Choose MURGAN</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-6">
            <div className="space-y-3">
              <div className="text-2xl font-light text-black">✓</div>
              <h3 className="text-base md:text-lg font-light">Premium Quality</h3>
              <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">Crafted with the finest materials and meticulous attention to detail</p>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-light text-black">✓</div>
              <h3 className="text-base md:text-lg font-light">Fast Shipping</h3>
              <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">Delivered to your door within 3-7 business days</p>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-light text-black">✓</div>
              <h3 className="text-base md:text-lg font-light">Easy Returns</h3>
              <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">30-day return policy for your peace of mind</p>
            </div>
            <div className="space-y-3">
              <div className="text-2xl font-light text-black">✓</div>
              <h3 className="text-base md:text-lg font-light">Expert Support</h3>
              <p className="text-gray-600 text-xs md:text-sm font-light leading-relaxed tracking-wide">Dedicated team ready to assist you anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perspectives/Stories Section */}
      <PerspectivesSection />
    </>
  );
}
