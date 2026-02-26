import ProductView from "@/components/ProductView";
import { dressProducts } from "@/data/products";


export default async function ProductDetailPage({ params }) {
  // Unwrap params if it's a Promise (Next.js 16+)
  const resolvedParams = typeof params.then === 'function' ? await params : params;
  const product = dressProducts.find(
    (p) => p.slug === resolvedParams.slug
  );
  return <ProductView product={product} />;
}


// Return all product slugs for static export
export async function generateStaticParams() {
  return dressProducts.map((product) => ({ slug: product.slug }));
}
