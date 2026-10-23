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

export default function PerspectivesSection() {
  const productsQuery = useQuery({
    queryKey: ["perspectivesProducts"],
    queryFn: ({ signal }) => publicApi.getProducts({ page: 0, size: 10 }, signal),
  });

  const products = useMemo(() => {
    const raw = productsQuery.data?.data ?? productsQuery.data;
    return normalizePage(raw).items.slice(0, 10);
  }, [productsQuery.data]);

  return (
    <section className="perspectives-section">
      <Heading title="Popular Products" subtitle={null} />

      {productsQuery.isError ? (
        <p className="px-6 text-center text-sm text-red-600" role="alert">
          Unable to load popular products.
        </p>
      ) : productsQuery.isLoading ? (
        <p className="px-6 text-center text-sm text-gray-500" role="status">
          Loading popular products...
        </p>
      ) : (
        <div className="perspectives-viewport">
          <div className="perspectives-track">
            {[...products, ...products].map((product, index) => (
              <Link
                className="perspective-card"
                href={`/products/${product.id}`}
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
      )}
    </section>
  );
}
