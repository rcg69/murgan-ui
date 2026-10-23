"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/apiClient";
import { normalizePage } from "@/lib/pagination";
import "../styles/Perspectives.css";
import Heading from "./Heading";

function getProductImage(product) {
  const images = Array.isArray(product.imageUrls)
    ? product.imageUrls
    : typeof product.imageUrls === "string"
      ? product.imageUrls.split(",").map((image) => image.trim())
      : [];

  return images.find(Boolean) || product.imageUrl || product.image || "/saree2.png";
}

const fallbackProducts = [
  { id: "silk-saree", name: "The Classic Silk Saree", image: "/saree.png" },
  { id: "festive-grace", name: "Festive Grace", image: "/bhagi.jpg" },
  { id: "modern-tradition", name: "Modern Tradition", image: "/k1.png" },
  { id: "wedding-edit", name: "Wedding Edit", image: "/rash.jpg" },
  { id: "timeless-drape", name: "The Timeless Drape", image: "/saree2.png" },
];

export default function PerspectivesSection() {
  const productsQuery = useQuery({
    queryKey: ["perspectivesProducts"],
    queryFn: ({ signal }) => publicApi.getProducts({ page: 0, size: 10 }, signal),
  });

  const products = useMemo(() => {
    const raw = productsQuery.data?.data ?? productsQuery.data;
    return normalizePage(raw).items.slice(0, 10);
  }, [productsQuery.data]);

  const featuredProducts = products.length
    ? products
    : fallbackProducts.map((product) => ({ ...product, href: "/products" }));

  return (
    <section className="perspectives-section">
      <Heading title="Popular Products" subtitle={null} />

      {productsQuery.isError && (
        <p className="px-6 text-center text-sm text-red-600" role="alert">
          Unable to load popular products. Showing featured products instead.
        </p>
      )}

      <div className="perspectives-viewport">
        <div className="perspectives-track">
          {[...featuredProducts, ...featuredProducts].map((product, index) => (
            <Link
              className="perspective-card"
              href={product.href || (product.id ? `/products/${product.id}` : "/products")}
              key={`${product.id}-${index}`}
              aria-label={`View ${product.name}`}
            >
              <Image
                src={getProductImage(product)}
                alt={product.name || "Product"}
                fill
                sizes="(max-width: 600px) 80vw, 380px"
                unoptimized
              />
              <span>{product.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
