import ProductView from "@/components/ProductView";
import { dressProducts } from "@/data/products";

export default function ProductDetailPage({ params }) {
  // Find product by slug from params
  const product = dressProducts.find(
    (p) => p.slug === params.slug
  );
  return <ProductView product={product} />;
}

export async function generateStaticParams() {
  return dressProducts.map((product) => ({ slug: product.slug }));
}
