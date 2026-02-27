"use client";

import { useEffect, useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import CapsuleHero from "@/components/CapsuleHero";
import { useQuery } from "@tanstack/react-query";
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
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [sort, setSort] = useState("createdAt,desc"); // price|name|createdAt
  const [categoryId, setCategoryId] = useState("");
  const [q, setQ] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);

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

  const productsQuery = useQuery({
    queryKey: [
      useSearchEndpoint ? "productsSearch" : "products",
      { page, size, sort, categoryId, q: debouncedQ, minPrice, maxPrice, inStock },
    ],
    queryFn: ({ signal }) => {
      if (useSearchEndpoint) {
        return publicApi.searchProducts(
          {
            categoryId: categoryId ? Number(categoryId) : undefined,
            q: debouncedQ || undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            inStock: inStock ? true : undefined,
            page,
            size,
            sort,
          },
          signal
        );
      }
      return publicApi.getProducts({ page, size, sort }, signal);
    },
    placeholderData: (prev) => prev,
  });

  const pageData = useMemo(() => {
    const raw = productsQuery.data?.data ?? productsQuery.data;
    return normalizePage(raw);
  }, [productsQuery.data]);

  const products = pageData.items;

  return (
    <>
      {/* ================= HERO ================= */}
      <CapsuleHero />

      <div className="container-custom py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Search</label>
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(0);
                }}
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
              />
            </div>

            <div className="min-w-[220px]">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setPage(0);
                }}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[220px]">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Sort</label>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(0);
                }}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value="createdAt,desc">Newest</option>
                <option value="createdAt,asc">Oldest</option>
                <option value="price,asc">Price: Low → High</option>
                <option value="price,desc">Price: High → Low</option>
                <option value="name,asc">Name: A → Z</option>
                <option value="name,desc">Name: Z → A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Min price</label>
              <input
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPage(0);
                }}
                inputMode="decimal"
                placeholder="0"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Max price</label>
              <input
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPage(0);
                }}
                inputMode="decimal"
                placeholder="9999"
                className="w-full px-3 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2 py-3">
              <input
                id="inStock"
                type="checkbox"
                checked={inStock}
                onChange={(e) => {
                  setInStock(e.target.checked);
                  setPage(0);
                }}
              />
              <label htmlFor="inStock" className="text-sm text-gray-700">
                In stock only
              </label>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <select
                value={size}
                onChange={(e) => {
                  setSize(Number(e.target.value));
                  setPage(0);
                }}
                className="px-3 py-3 border border-gray-300 rounded-lg bg-white"
              >
                <option value={12}>12 / page</option>
                <option value={24}>24 / page</option>
                <option value={48}>48 / page</option>
              </select>
              <button
                onClick={() => {
                  setCategoryId("");
                  setQ("");
                  setMinPrice("");
                  setMaxPrice("");
                  setInStock(false);
                  setSort("createdAt,desc");
                  setPage(0);
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        {productsQuery.isError && (
          <div className="mt-6 p-4 border border-red-200 bg-red-50 text-red-700 rounded">
            Failed to load products. {productsQuery.error?.message ? `(${productsQuery.error.message})` : ""}
          </div>
        )}

        <div className="mt-8">
          <ProductGrid products={products} loading={productsQuery.isLoading || productsQuery.isFetching} />
        </div>

        {/* Pagination */}
        {pageData.totalPages > 1 && (
          <div className="flex items-center justify-between mt-10">
            <button
              disabled={page <= 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <div className="text-sm text-gray-600">
              Page <span className="font-semibold">{page + 1}</span> of{" "}
              <span className="font-semibold">{pageData.totalPages}</span>
            </div>
            <button
              disabled={page + 1 >= pageData.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}