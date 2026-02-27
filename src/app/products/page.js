"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterModal from "@/components/FilterModal";
import CapsuleHero from "@/components/CapsuleHero";
import FilterButton from "@/components/FilterButton";
import ProductsHeaderSection from "@/components/ProductsHeaderSection";

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
      <ProductsHeaderSection
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setIsFilterOpen={setIsFilterOpen}
      />
      {/* ============== PRODUCTS GRID ============== */}
      <div className="w-full">
        <ProductGrid products={dressProducts} />
      </div>
      {/* ============== FILTER MODAL ============== */}
      {isFilterOpen && (
        <FilterModal onClose={() => setIsFilterOpen(false)} />
      )}
    </>
  );
}