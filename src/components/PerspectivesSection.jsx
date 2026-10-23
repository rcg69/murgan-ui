"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/apiClient";
import "../styles/Perspectives.css";
import Heading from "./Heading";

const categoryImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoPd7hJXNlgBn0D4G0z5zWTlMX9ut2LfZM4JU42sE_F7a1Q2KPIRzSY2Q&s=10",
  "https://static.toiimg.com/thumb/115075604/115075604.jpg?height=746&width=420&resizemode=76&imgsize=68958",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjT4DLn3RCC_d-y2IGWZuraQynC1O6-6BaQvX04JwitpjtDZXpe5IwqGxt&s=10",
  "https://nadiyapaar.com/cdn/shop/files/MalavikaMohanan-1.jpg?v=1761133106&width=2774",
  "https://www.elahe.in/cdn/shop/files/15_bc0859a8-bde1-442d-bd37-6802dafa069b_2048x.png?v=1767361368",
  "https://images.news18.com/webstories/uploads/2025/04/Scent-of-Nostalgia-2025-04-6fb3bbda0937e62cd7c9fa067ae9191c.png",
];

export default function PerspectivesSection() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => publicApi.getCategories(signal),
  });

  const categories = useMemo(() => {
    const raw = categoriesQuery.data?.data ?? categoriesQuery.data;
    return Array.isArray(raw) ? raw : [];
  }, [categoriesQuery.data]);
  const items = categories.map((category, index) => ({
    category,
    image: categoryImages[index % categoryImages.length],
  }));

  return (
    <section className="perspectives-section">
      <Heading title="Popular Products" subtitle={null} />

      {categoriesQuery.isError ? (
        <p className="px-6 text-center text-sm text-red-600" role="alert">
          Unable to load product categories.
        </p>
      ) : (
        <div className="perspectives-viewport">
          <div className="perspectives-track">
            {[...items, ...items].map(({ category, image }, index) => (
              <Link
                className="perspective-card"
                href={`/products?categoryId=${encodeURIComponent(category.id)}`}
                key={`${category.id}-${index}`}
                aria-label={`Browse ${category.name} products`}
              >
                <Image
                  src={image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 600px) 80vw, 380px"
                  unoptimized
                />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
