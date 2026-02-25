"use client";
import React from 'react';

import PerspectivesSection from '@/components/PerspectivesSection';
import { dressProducts } from '@/data/products';
import { getProductsFromStorage } from '@/utils/storageHelpers';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';

// SEO Metadata (keep as-is)
// export const metadata = {
//   title: "Murgan Store - Premium Women's Fashion & Dresses",
//   description:
//     "Discover amazing women's dresses and apparel. Shop premium quality products with unbeatable prices and fast, free shipping on orders over ₹50.",
// };

export default function Home() {
  const storedProducts = getProductsFromStorage(dressProducts);

  return (
    <>
      {/* HERO – now works */}
      {/* <Hero
        videoSrc="/hero.mp4"
        text="Elegant design crafted for modern living"
        overlayOpacity={0.2}
      /> */}
      <Hero
        videoSrc="/prodHero.mp4"
        text="Elegant design crafted for modern living"
        overlayOpacity={0.2}
        viewportHeight={100} // 👈 new prop to control height
      />
  
      {/* Everything else unchanged */}
      <FeaturedProducts />
      <PerspectivesSection />
    </>
  );
}