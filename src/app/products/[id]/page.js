import ProductDetailsContent from "@/components/ProductDetailsContent";
import { publicApi } from "@/lib/apiClient";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = typeof params?.then === "function" ? await params : params;
  const id = Number(resolvedParams?.id);

  if (!Number.isFinite(id)) return notFound();

  try {
    const res = await publicApi.getProduct(id);
    const product = res?.data ?? res;
    if (!product) return notFound();
    return <ProductDetailsContent product={product} />;
  } catch {
    return notFound();
  }
}

