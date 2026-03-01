import { notFound } from "next/navigation";
import { publicApi } from "@/lib/apiClient";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;   // ✅ FIX

  const numericId = Number(id);

  if (!Number.isFinite(numericId)) {
    return notFound();
  }

  try {
    const product = await publicApi.getProduct(numericId);

    return (
      <div>
        <h1>{product.name}</h1>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}