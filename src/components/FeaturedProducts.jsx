"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/apiClient";
import "../styles/FeaturedProducts.css";

const categoryImages = [
  "/bhagi.jpg",
  "/k2.png",
  "https://imgs.search.brave.com/pRhyLTzhwiRNyWxCtkWh_KBSehHL3e-yZw1BVCzRbmU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5kaWFoZXJhbGQu/Y29tL0ltYWdlU3Rv/cmUvaW1hZ2VzL21v/dmllcy9tb3ZpZXMt/YWN0cmVzcy9LYWph/bC1BZ2dhcndhbC1p/bi1OZW5lLVJhanUt/TmVuZS1NYW50cmkt/TGF0ZXN0LVN0aWxs/czcuanBn",
  "https://imgs.search.brave.com/XIrghyN_2fqin5jHUtFoKaOwSNWoK_8SRoawGN8d0cw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuaGVyemluZGFn/aS5pbmZvL2ltYWdl/LzIwMjQvQXVnL1No/cmFkZGhhLUthcG9v/cnMtUmVkLUJhbmFy/YXNpLVNhcmVlLnBu/Zw",
  "https://imgs.search.brave.com/e765dEfx-DzLhnWmVHn5c0rsj7F57THMJEzOjlpB-Ic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/Z3VsdGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI2LzA2/LzEwMDA0ODE0NDEt/NzY4eDEwMjQuanBn",
  "https://imgs.search.brave.com/mr2JOuOL-jOIEo5XV3Wo8p3PJrKWWJt1OeKPF05V_hs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZmlsbWliZWF0/LmNvbS9waC1iaWcv/MjAyNi8wNC9hY3Ry/ZXNzLXNhbWFudGhh/LXJlY2VudC1zdHVu/bmluZy1iZWF1dGlm/dWwtc2FyZWUtcGhv/dG9zLXdpdGgtbG90/dXMxNzc2NTgwODQw/XzYuanBn",
];

export default function FeaturedProducts() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => publicApi.getCategories(signal),
  });

  const categories = useMemo(() => {
    const raw = categoriesQuery.data?.data ?? categoriesQuery.data;
    return Array.isArray(raw) ? raw.slice(0, 6) : [];
  }, [categoriesQuery.data]);

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>Featured Collection</h2>
      </div>

      {categoriesQuery.isError ? (
        <p className="text-center text-sm text-red-600" role="alert">
          Unable to load product categories.
        </p>
      ) : (
        <div className="featured-grid">
          {categories.map((category, index) => (
            <Link
              className={`featured-item ${index < 2 ? "large" : ""}`}
              href={`/products?categoryId=${encodeURIComponent(category.id)}`}
              key={category.id}
              aria-label={`Browse ${category.name} products`}
            >
              <Image
                src={categoryImages[index % categoryImages.length]}
                alt={category.name}
                fill
                sizes="(max-width: 900px) 50vw, 25vw"
                unoptimized
              />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
