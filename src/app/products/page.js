"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterModal from "@/components/FilterModal";
import Hero from "@/components/Hero";
import FilterButton from "@/components/FilterButton";

import Heading from "@/components/Heading";
import { dressProducts } from "@/data/products";

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      {/* ================= HERO ================= */}
      <Hero
        videoSrc="/prodHero.mp4"
        overlayOpacity={0.2}
        viewportHeight={50}
      />
     <Heading title="Products" subtitle={null} />
     

      {/* ============== PRODUCTS GRID ============== */}

          <ProductGrid products={dressProducts} />


      {/* ============== FILTER MODAL ============== */}
      {isFilterOpen && (
        <FilterModal onClose={() => setIsFilterOpen(false)} />
      )}
    </>
  );
}