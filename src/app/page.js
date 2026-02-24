import React from 'react';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CollectionsGrid from '@/components/CollectionsGrid';
import ProductGrid from '@/components/ProductGrid';
import StudioSection from '@/components/StudioSection';
import PerspectivesSection from '@/components/PerspectivesSection';
import WhyChooseMurgan from '@/components/WhyChooseMurgan';
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
    <div className="w-full overflow-hidden">
      {/* Hero Carousel */}
      {/* <FeaturedCarousel /> */}
      <section className="w-full">
        <Hero />
      </section>

      {/* Collections Grid */}
   {/*    <CollectionsGrid /> */}

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
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <FeaturedProducts/>
      </section>

      {/* Studio/Configuration Section */}
    {/*   <StudioSection /> */}

      {/* Benefits Section */}
      {/* <WhyChooseMurgan /> */}

      {/* Perspectives/Stories Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <PerspectivesSection />
      </section>
    </div>
  );
}
