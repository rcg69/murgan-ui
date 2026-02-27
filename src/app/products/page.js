"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterModal from "@/components/FilterModal";
import CapsuleHero from "@/components/CapsuleHero";
import FilterButton from "@/components/FilterButton";

import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import { dressProducts } from "@/data/products";

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      {/* ================= HERO ================= */}
      <CapsuleHero />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

  {/* LEFT - HEADING */}
  <div className="w-full sm:w-auto">
    <Heading title="Products" subtitle={null} />
  </div>

  {/* RIGHT - SEARCH + FILTER */}
  <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:items-center sm:justify-end pr-5">

    <SearchBar
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="w-full sm:w-56"
    />

    <FilterButton
      onClick={() => setIsFilterOpen(true)}
      className="w-full sm:w-auto bg-black text-white rounded-md px-4 py-2 pr-6"
    />
    
  </div>

</div>

      {/* ============== PRODUCTS GRID ============== */}
      <ProductGrid products={dressProducts} />

      {/* ============== FILTER MODAL ============== */}
      {isFilterOpen && (
        <FilterModal onClose={() => setIsFilterOpen(false)} />
      )}
    </>
  );
}