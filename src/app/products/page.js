"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sliders } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { ProductsMinimalistHero } from "@/components/ui/products-minimalist-hero";
import FilterModal from "@/components/FilterModal";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/apiClient";
import { normalizePage } from "@/lib/pagination";

function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export default function ProductsPage() {
  const [size]                      = useState(12);
  const [sort, setSort]             = useState("createdAt,desc");
  const [categoryId, setCategoryId] = useState("");
  const [q, setQ]                   = useState("");
  const [minPrice, setMinPrice]     = useState("");
  const [maxPrice, setMaxPrice]     = useState("");
  const [inStock, setInStock]       = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [urlCategoryResolved, setUrlCategoryResolved] = useState(false);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const categoryParam = new URLSearchParams(window.location.search).get("categoryId");
    if (/^\d+$/.test(categoryParam ?? "")) {
      setCategoryId(categoryParam);
    }
    setUrlCategoryResolved(true);
  }, []);

  const debouncedQ = useDebouncedValue(q, 300);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => publicApi.getCategories(signal),
  });

  const categories = useMemo(() => {
    const raw = categoriesQuery.data?.data ?? categoriesQuery.data;
    return Array.isArray(raw) ? raw : [];
  }, [categoriesQuery.data]);

  const useSearchEndpoint =
    Boolean(categoryId) ||
    Boolean(debouncedQ) ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    Boolean(inStock);

  const productsQuery = useInfiniteQuery({
    queryKey: [
      useSearchEndpoint ? "productsSearch" : "products",
      { size, sort, categoryId, q: debouncedQ, minPrice, maxPrice, inStock },
    ],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }) => {
      if (useSearchEndpoint) {
        return publicApi.searchProducts(
          {
            categoryId: categoryId ? Number(categoryId) : undefined,
            q: debouncedQ || undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            inStock: inStock ? true : undefined,
            page: pageParam,
            size,
            sort,
          },
          signal
        );
      }
      return publicApi.getProducts({ page: pageParam, size, sort }, signal);
    },
    getNextPageParam: (lastPage) => {
      const raw = lastPage?.data ?? lastPage;
      const pageData = normalizePage(raw);
      return pageData.page + 1 < pageData.totalPages
        ? pageData.page + 1
        : undefined;
    },
    enabled: urlCategoryResolved,
  });

  const productsError = productsQuery.error;

  useEffect(() => {
    if (productsError) {
      console.error("Failed to load products:", productsError);
    }
  }, [productsError]);

  const products = useMemo(
    () =>
      (productsQuery.data?.pages ?? []).flatMap((response) => {
        const raw = response?.data ?? response;
        const items = normalizePage(raw).items;
        return Array.isArray(items) ? items : items ? [items] : [];
      }),
    [productsQuery.data]
  );

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = productsQuery;

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const activeFilterCount = [categoryId, minPrice, maxPrice, inStock].filter(Boolean).length;

  return (
    <>
      {/* ── HERO ── */}
      <ProductsMinimalistHero
        logoText="mnmlst."
        mainText="Explore our handpicked collection of exquisite sarees — from timeless silks to vibrant banarasi weaves. Each piece is crafted to celebrate the elegance and grace of every woman."
        imageSrc="./productssaree.png"
        imageAlt="Minimalist fashion collection showcase"
        overlayText={{ part1: "Quality", part2: "Curated." }}
        locationText="Worldwide Shipping Available"
      />

      {/* ── Heading ── */}
      <div className="flex flex-col items-start px-4 sm:px-6 md:px-0 mt-6 mb-3">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          All Products
        </h2>
        <div className="mt-2 w-12 h-[2px] bg-[#d4a574]" />
      </div>

      {/* ── Search + Filter row ── */}
      <motion.div
        className="flex flex-row items-center gap-3 mb-8 px-4 sm:px-6 md:px-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Search — takes most of the row */}
        <div className="flex-1 min-w-0">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#d4a574] transition-all text-sm"
          />
        </div>

        {/* Filter button — compact pill */}
        <div className="flex-shrink-0">
          <motion.button
            onClick={() => setIsFilterOpen(true)}
            className="relative flex items-center gap-1.5 px-4 py-3 bg-black text-white rounded-full font-medium text-sm transition-all hover:shadow-lg whitespace-nowrap"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Sliders size={16} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {activeFilterCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* ── Error ── */}
      {productsQuery.isError && (
        <div className="mx-4 sm:mx-6 md:mx-0 mt-2 p-4 border border-red-200 bg-red-50 text-red-700 rounded">
          Unable to load products. Please try again later.
        </div>
      )}

      {/* ── Product Grid ── */}
      <div className="mt-4">
        <ProductGrid
          products={products}
          loading={!urlCategoryResolved || productsQuery.isLoading}
        />
      </div>

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="flex justify-center py-8 text-sm text-gray-500"
          role="status"
          aria-live="polite"
        >
          {isFetchingNextPage ? "Loading more products..." : ""}
        </div>
      )}

      {/* ── Filter Modal ── */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        sort={sort}
        onSortChange={setSort}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        inStock={inStock}
        onInStockChange={setInStock}
        categories={categories}
        onClearFilters={() => {
          setCategoryId("");
          setMinPrice("");
          setMaxPrice("");
          setInStock(false);
          setSort("createdAt,desc");
        }}
      />
    </>
  );
}