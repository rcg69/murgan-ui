"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterModal from "@/components/FilterModal";
import Hero from "@/components/Hero";
import CollectionHeader from "@/components/CollectionHeader";
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

      {/* ============ COLLECTION HEADER ============ */}
<<<<<<< Updated upstream
      <section className="bg-white border-b">
        <div className="container-custom py-10">

          <div className="grid grid-cols-3 items-center">

            {/* Left spacer (keeps center truly centered) */}
            <div></div>

            {/* Center: Title */}
{/*             <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Top Products
              </h1>
              <p className="mt-2 text-gray-500 text-sm md:text-base">
                Handpicked styles loved by our customers
              </p>
            </div> */}

            {/* Right: Filter Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="filter-btn"
              >
                <span className="filter-icon">⚲</span>
                Filters
              </button>
            </div>

          </div>

        </div>
      </section>
=======
      <CollectionHeader onFilterOpen={() => setIsFilterOpen(true)} />
>>>>>>> Stashed changes

      {/* ============== PRODUCTS GRID ============== */}
      <section className="bg-gray-50 py-14">
        <div className="container-custom">
          <ProductGrid products={dressProducts} />
        </div>
      </section>

      {/* ============== FILTER MODAL ============== */}
      {isFilterOpen && (
        <FilterModal onClose={() => setIsFilterOpen(false)} />
      )}
    </>
  );
}