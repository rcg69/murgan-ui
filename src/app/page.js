import PerspectivesSection from '@/components/PerspectivesSection';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';

// SEO Metadata
export const metadata = {
  title: "Murgan Store - Premium Women's Fashion & Dresses",
  description:
    "Discover amazing women's dresses and apparel. Shop premium quality products with unbeatable prices and fast, free shipping on orders over ₹50.",
  keywords: "women dresses, fashion, dress store, online shopping",
};

async function getFeaturedProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      {
        cache: "no-store", // always fetch fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <>
      <Hero />

      <FeaturedProducts products={products} />

      <PerspectivesSection />
    </>
  );
}